<template>
  <v-app v-if="loggedRouter()" class="about">
    <v-alert
      style="z-index: 999"
      v-if="
        mainControll &&
        !mainControll.company.hasOwnProperty('companyId') &&
        mainControll.userData &&
        mainControll.userData.profiles && mainControll.userData.profiles.indexOf('CANDIDATE') != -1 &&
        (!mainControll.userData.curriculum ||
          mainControll.userData.curriculum.length > 0)
      "
      color="yellow"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-alert"
      class="mb-0 vue-alert"
    >
      Faça
      <strong>upload</strong> do seu <strong>currículo</strong> para se
      candidatar as vagas!
      <strong
        class="cyan--text"
        @click="$router.push('/profile')"
        style="text-decoration: underline; cursor: pointer"
        >Clique aqui!</strong
      >
    </v-alert>
    <!-- <v-alert
      v-if="alert.show"
      :color="alert.collor"
      border="left"
      elevation="1"
      :icon="alert.icon"
      class="mb-0 white--text"
      style="position: fixed; z-index: 99; width: 100%"
    >
      <strong>{{ alert.message }}</strong>
    </v-alert> -->
    <Menu
      :userData="mainControll.userData"
      :dashInfo="mainControll.dashInfo"
      :mainControll="mainControll"
      :profile="
        mainControll.userData && mainControll.userData.profiles
          ? mainControll.userData.profiles.indexOf('CANDIDATE') != -1
            ? 'candidate'
            : 'recruiter'
          : '#'
      "
      :company="mainControll.company"
      >></Menu
    >
      <router-view
        :userData="mainControll.userData"
        :dashInfo="mainControll.dashInfo"
        :company="mainControll.company"
        :mainControll="mainControll"
      ></router-view>
  </v-app>
  <v-app v-else class="about">
      <router-view :mainControll="mainControll"></router-view>
  </v-app>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { routes } from "@/router/index.js";
import { Users } from "@/services/users.js";

export default {
  name: "App",
  props: {
    mainControll: Object,
  },
  components: { Menu: Menu },

  data: () => ({
    userData: {},
    dashInfo: {},
    candidate: {
      userData: {
        userId: "5f53ca26d97fc623870f0be9",
        name: "André Golnçalvez",
        email: "farmacia@farmcia.com.br",
        profiles: ["CANDIDATE"],
        cpf: "00019100000",
        gender: "Female",
        dateOfBirth: "1997-01-01T02:00:00.000Z",
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYXJtYWNpYUBmYXJtY2lhLmNvbS5iciIsImlzcyI6Im1lYXQtYXBpIiwiaWF0IjoxNjAwNTMwMDA2fQ.rSkmtsd4OJWyoFebFX4p2IR5n1D9_31Wt0g3Ag6C2wY",
        description: "Desenvolvedor React Native",
      },
      dashInfo: {
        totalJobsSubscribe: 2,
        jobs: [
          {
            _id: "5f63ba35b4ac36adb92c7e17",
            requiredSkills: ["JAVA", "ORACLE"],
            title: "JUNIOR BACK END DEVELOPER",
            salary: 3000,
          },
          {
            _id: "5f5cf11f7178ab30ca810929",
            requiredSkills: ["JAVA", "ORACLE"],
            title: "BACK END DEVELOPER",
            salary: 15000,
            exam: {
              hitPercent: "66.67%",
              doneAt: "2020-09-14T11:57:26.517Z",
              startedAt: "2020-09-12T18:59:30.507Z",
            },
          },
        ],
      },
    },
    recruiter: {
      userData: {
        userId: "5f53ca26d97fc623870f0be9",
        name: "Juliana Medeiros",
        description: "Analista de R&S Sênior",
      },
      dashInfo: {
        totalJobsSubscribe: 2,
        jobs: [
          {
            _id: "5f63ba35b4ac36adb92c7e17",
            requiredSkills: ["JAVA", "ORACLE"],
            title: "JUNIOR BACK END DEVELOPER",
            salary: 3000,
          },
          {
            _id: "5f5cf11f7178ab30ca810929",
            requiredSkills: ["JAVA", "ORACLE"],
            title: "BACK END DEVELOPER",
            salary: 15000,
            exam: {
              hitPercent: "66.67%",
              doneAt: "2020-09-14T11:57:26.517Z",
              startedAt: "2020-09-12T18:59:30.507Z",
            },
          },
        ],
      },
    },
  }),
  methods: {
    loggedRouter() {
      const route = routes.filter((r) => {
        // console.log(r);
        // console.log(this.$router.currentRoute)
        return r.name == this.$router.currentRoute.name && r.logged;
      });
      console.log(route);
      const loggedArea = route && route.length > 0;
      console.log("LOGGED AREA", loggedArea);
      return loggedArea;
    },
    canMoveToLandingPage() {
      return (
        !this.mainControll ||
        ((!this.mainControll.company ||
          !this.mainControll.company.hasOwnProperty("companyId")) &&
          (!this.mainControll.userData ||
            !this.mainControll.userData.hasOwnProperty("userId")))
      );
    },
  },
  async mounted() {
    console.log("CREATED");
    if (this.canMoveToLandingPage()) {
      if (this.$router.currentRoute.path != "/") {
        this.$router.push("/");
        this.mainControll.showLoginDialog = true;
        this.mainControll.registerTab = false;
        this.mainControll.dashInfo = Object.assign({}, {});
        this.mainControll.userData = Object.assign({}, {});
        this.mainControll.company = Object.assign({}, {});
      }
    }
  },
  async updated() {
    console.log("UPDATED");
    if (this.canMoveToLandingPage()) {
      if (this.$router.currentRoute.path != "/") {
        this.$router.push("/");
        this.mainControll.showLoginDialog = true;
        this.mainControll.registerTab = false;
      }
    }
    if (this.$router.currentRoute.path == "/") {
      this.mainControll.dashInfo = Object.assign({}, {});
      this.mainControll.userData = Object.assign({}, {});
      this.mainControll.company = Object.assign({}, {});
    }
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}
/* .v-main__wrap::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  bottom: 0;
  right: 0;
  background: url("./assets/main_background.png");
} */

body,
input,
button {
  /*font-family: 'Roboto Slab', serif;*/
  font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
  font-weight: 500;
}

button {
  cursor: pointer;
}

*::-webkit-scrollbar {
  background-color: #fff;
  width: 12px;
}

*::-webkit-scrollbar-track {
  background-color: #fff;
}

*::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 3px solid #fff;
}

*-webkit-scrollbar-button {
  display: none;
}

.global-loading {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #e5fffbd9;
  width: 100%;
  height: 100vh;
  z-index: 999;
}
.global-loading i {
  font-size: 6em !important;
}
.rotate-90-cw {
  -webkit-animation: rotate-90-cw 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    infinite;
  animation: rotate-90-cw 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

.vue-alert {
  background: #ffff2c !important;
  position: fixed !important;
  top: 70px;
  z-index: 1;
  right: 52px;
}

.v-application .vue-alert i.yellow--text {
  color: white !important;
}
@-webkit-keyframes rotate-90-cw {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-90-cw {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .vue-alert {
    right: 52px;
    left: 12px;
    right: 12px;
  }
}
</style>