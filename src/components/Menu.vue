<template>
  <div style="height: 100px">
    <v-app-bar
      app
      clipped-left
      color="amber"
      style="background: linear-gradient(to right, #16a0bf, #025891)"
    >
      <v-row class="mt-2">
        <v-col cols="4" sm="4" md="4" class="mt-2">
          <span
            style="cursor: pointer"
            class="title ml-1 mr-5"
            @click="!userData.hasOwnProperty('companyId') ? userData.profiles.indexOf('CANDIDATE') != -1 ? $router.push('/candidate') : $router.push('/recruiter') : $router.push('/company')"
          >
            <v-avatar>
              <img
                class="avatar"
                src="@/assets/VagaCertaIconInvertido.png"
                alt="Icon Vaga Certa"
                style
              />
            </v-avatar>
            <span v-if="drawer" class="mt-2 tracking-in-expand">
              Vaga&nbsp;
              <span class="font-weight-light">Certa</span>
            </span>
          </span>
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            :color="'white'"
          ></v-app-bar-nav-icon>
        </v-col>
        <v-col
          offset-md="2"
          v-if="userData && userData.hasOwnProperty('companies')"
          cols="6"
          sm="6"
          md="6"
        >
          <v-select
            class="mt-4 custom-v-select"
            :items="userData.companies"
            item-value="_id"
            item-text="name"
            no-data-text="Sem dados de empresa"
            return-object
            label="Empresas"
            dark
            @change="changeCompanyInfo"
          >
            <template slot="selection" slot-scope="data">
              <v-icon x-small color="white darken-2"> mdi-domain </v-icon>
              <strong class="ml-2">{{ data.item.name }}</strong>
            </template>
            <template slot="item" slot-scope="data">
              <v-icon> mdi-domain </v-icon>
              <strong class="ml-2">{{ data.item.name }}</strong>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-if="userData && userData.hasOwnProperty('userId')"
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <div class="avatarPanel">
        <v-avatar height="70" width="70">
          <img class="avatar" :src="getImgAvatar()" alt="John" />
        </v-avatar>
        <h4 style="font-weight: 500">{{ userData.name }}</h4>
        <h5
          style="
            color: grey;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          {{ userData.description }}
        </h5>
      </div>
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>
          <v-list-item
            style="cursor: pointer;!important"
            v-else-if="!item.disable"
            :key="i"
            link
            @click="moveToRoute(item, profile)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                class="grey--text"
                >{{ item.text }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-else-if="company && company.hasOwnProperty('companyId')"
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <div class="avatarPanel">
        <v-avatar height="70" width="70">
          <img class="avatar" :src="getImgAvatar()" alt="John" />
        </v-avatar>
        <h4 style="font-weight: 500">{{ company.name }}</h4>
        <h5 style="color: grey">{{ company.description }}</h5>
      </div>
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in companyItems">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>
          <v-list-item
            style="cursor: pointer;!important"
            v-else-if="!item.disable"
            :key="i"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content  @click="moveToRoute(item, profile)">
              <v-list-item-title
                class="grey--text"
                >{{ item.text }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <div class="breadCrumb">
      <article
        :style="!drawer ? '' : 'margin-left: -11%;'"
        v-if="
          userData &&
          userData.profiles &&
          userData.profiles.indexOf('RECRUITER') != -1 &&
          company &&
          !company['companyId']
        "
      >
        <v-row align="center" justify="center">
          <v-icon large class="white--text jello-vertical">touch_app</v-icon>
        </v-row>
        <v-row align="center" justify="center">
          <div class="white--text mt-2">Selecione a empresa no menu acima!</div>
        </v-row>
      </article>
      <span style="font-size: 1.4em" class="font-weight-bold"
        >{{ this.$router.currentRoute.name }}
      </span>
    </div>
  </div>
</template>

<script>
import { Jobs } from "@/services/jobs.js";
export default {
  props: {
    source: String,
    userData: Object,
    profile: String,
    company: Object,
    mainControll: Object,
  },
  data: () => ({
    drawer: null,
    items: [
      { _id: "home", icon: "home", text: "Home", path: "/" },
      {
        _id: "companies",
        icon: "apartment",
        text: "Empresas",
        disable: true,
        path: "#",
      },
      { _id: "jobs", icon: "school", text: "Vagas", path: "/jobs" },
      { _id: "profile", icon: "person", text: "Perfil", path: "/profile" },
      { _id: "out", icon: "logout", text: "Sair", path: "/" },
    ],
    companyItems: [
      {
        _id: "recruiters",
        icon: "mdi-account-tie",
        text: "Seus Recrutadores",
        path: "/company",
      },
      { _id: "jobs", icon: "school", text: "Suas Vagas", path: "/jobs" },
      {
        _id: "profile",
        icon: "business",
        text: "Sua Empresa",
        path: "/profile",
      },
      { _id: "out", icon: "logout", text: "Sair", path: "/" },
    ],
  }),
  methods: {
    getImgAvatar() {
      if (this.userData && this.userData.hasOwnProperty("userId")) {
        if (
          this.userData.gender &&
          this.userData.gender.toLowerCase().indexOf("female") != -1
        ) {
          return require("@/assets/avatar-recruiter-demo.330ee974.png");
        } else {
          return require("@/assets/avatar-demo.a70aed79.png");
        }
      } else {
        return require("@/assets/institucional_icon.png");
      }
    },
    moveToRoute(item, profile) {
      var path = item._id == "home" ? item.path + profile : item.path;
      if (this.$router.currentRoute && this.$router.currentRoute.path != path) {
        this.$router.push(path);
      }
    },
    changeCompanyInfo(company) {
      const jbservice = new Jobs();
      this.mainControll.globalLoading = true;
      jbservice
        .getDashFromCompanyJobs(company._id)
        .then((success) => {
          this.mainControll.globalLoading = false;
          this.mainControll.dashInfo = success.data.dashInfo;
          this.mainControll.company["companyId"] = company._id;
          this.mainControll.company["name"] = company.name;
        })
        .catch((err) => {
          this.mainControll.globalLoading = false;
          this.mainControll.dashInfo = {};
          this.mainControll.company = {};
        });
    },
  },
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
.avatarPanel {
  position: relative;
  padding: 30px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}
.avatarPanel::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  background: url("../assets/background-profile.e5552d55.jpg");
  z-index: -1;
}
.avatar {
  height: 64px;
  width: 64px;
  background-size: cover;
  border-radius: 50%;
}
.breadCrumb {
  position: relative;
  height: 150px;
  width: 100%;
  background: linear-gradient(to right, #16a0bf, #025891);
  z-index: 0;
  padding-top: 20px;
  padding-left: 40px;
  font-size: 1.5em;
  color: white;
  z-index: 0;
}
.breadCrumb span {
  position: relative;
}
.breadCrumb span::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 30%;
  height: 2px;
  width: 70%;
  background: wheat;
  z-index: 0;
  font-size: 1.5em;
  color: white;
}
.custom-v-select .v-list-item {
  display: block !important;
}

.text-focus-in {
  -webkit-animation: text-focus-in 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: text-focus-in 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

.tracking-in-expand {
  -webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)
    both;
  animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2020-9-27 16:28:53
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation tracking-in-expand
 * ----------------------------------------
 */
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2020-9-27 16:26:17
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-focus-in
 * ----------------------------------------
 */
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

.jello-vertical {
  -webkit-animation: jello-vertical 0.9s infinite;
  animation: jello-vertical 0.9s infinite;
}

/* ----------------------------------------------
 * Generated by Animista on 2020-9-27 16:44:7
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation jello-vertical
 * ----------------------------------------
 */
@-webkit-keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
    transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
    transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>