<template>
  <div style="height: 100px">
    <v-app-bar
      app
      clipped-left
      color="amber"
      style="background: linear-gradient(to right,#16a0bf,#025891);"
    >
      <span class="title ml-1 mr-5">
        <v-avatar width="40">
          <img class="avatar" src="@/assets/logo.png" alt="Icon Vaga Certa" />
        </v-avatar>
        Vaga&nbsp;
        <span class="font-weight-light">Certa</span>
      </span>
      <v-app-bar-nav-icon @click="drawer = !drawer" :color="'white'"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <div class="avatarPanel">
        <v-avatar height="70" width="70">
          <img class="avatar" src="@/assets/avatar-demo.a70aed79.png" alt="John" />
        </v-avatar>
        <h4 style="font-weight: 500;">{{name}}</h4>
        <h5 style="color: grey">{{description}}</h5>
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
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4"></v-divider>
          <v-list-item v-else-if="!item.disable" :key="i" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="$router.push(item.path)" class="grey--text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <div class="breadCrumb">
      <span>
        HOME
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: String,
    name: String,
    description: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "home", text: "Home",  path: "#"},
      { icon: "apartment", text: "Empresas", disable: true,  path: "#"},
      { icon: "school", text: "Jobs", path: "#" },
      { icon: "logout", text: "Sair", path: "/"},
      
    ],
  }),
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
.breadCrumb{
    position: relative;
    height: 150px;
    width: 100%;
    background: linear-gradient(to right,#16a0bf,#025891);
    z-index: 0;
    padding-top: 20px;
    padding-left: 40px;
    font-size: 1.5em;
    color: white;
    z-index: 0;
}
.breadCrumb span{
  position: relative;
}
.breadCrumb span::after{
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
</style>