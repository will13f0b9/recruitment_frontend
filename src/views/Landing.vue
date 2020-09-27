<template>
  <div v-ripple class="main text-center elevation-2 pa-12 headline" style="background-color: #38c39d4a;">
    <img style="width: 80%; heigth: 100vh;" alt="Vue logo" src="@/assets/VagaCertaFull.png" />
    <v-content>
      <v-row>
        <!-- <v-col cols="12" v-for="route in routes" :key="route">
          <v-btn block v-if="!route.hidden" @click="$router.push(route.path)" class="ma-2" outlined color="teal" dark>{{route.name}}</v-btn>
        </v-col> -->
        <v-col cols="12">
          <v-btn block @click="openLoginDialog" class="ma-2" color="teal" dark>Logar</v-btn>
          <v-btn block @click="openRegisterDialog" class="ma-2" color="teal" dark>Registrar</v-btn>
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
import { routes } from "@/router/index.js";
export default {
  props: {
    mainControll: Object
  },
  data: () => ({
    routes: routes
  }),
  mounted(){
    this.mainControll.userData = {}
    this.mainControll.dashInfo = {}
    this.mainControll.registerTab = false;
    this.mainControll.showLoginDialog = false;
  },
  methods:{
    openLoginDialog(){
      this.mainControll.registerTab = false;
      this.mainControll.showLoginDialog = true;
    },
    openRegisterDialog(){
      this.mainControll.registerTab = true;
      this.mainControll.showLoginDialog = true;
    }
  }
};
</script>
<style scoped>
.main {
  height: 100vh;
}
div {
  color: green;
}
</style>