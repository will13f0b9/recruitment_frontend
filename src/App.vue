<template>
  <v-app>
    <v-snackbar style="top: 10%; left: -4%" :color="`${mainControll.alert.color} darken-4`" v-model="mainControll.alert.show" :top="true" :right="true" multi-line :timeout="10000"> 
        <strong><h3>{{mainControll.alert.text}}</h3></strong>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="mainControll.alert.show = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <Login :mainControll="mainControll"></Login>
    <v-col v-if="mainControll.globalLoading" class="global-loading" cols="12" style="position: fixed; display: flex;">
      <v-row align="center" justify="center">
        <div>
          <h1>Carregando...</h1>
          <br />
          <v-icon class="rotate-90-cw" color="black">mdi-loading</v-icon>
        </div>
      </v-row>
    </v-col>

    <v-main>
      <Logged :mainControll="mainControll" />
    </v-main>
  </v-app>
</template>

<script>
import Login from "@/components/Login.vue";
import Logged from "@/views/Logged.vue";
import { Companies } from "@/services/companies.js";
export default {
  name: "App",

  components: { Logged: Logged, Login: Login },
  data: () => ({
    snackbar: true,
    mainControll: {
      showLoginDialog: false,
      registerTab: false,
      globalLoading: false,
      alert: {
        color: "green",
        show: false,
        text: ``
      },
      dashInfo: {},
      userData: {},
      company: {},
      plans: [],
    },
  }),
  async mounted() {
    const companie = new Companies();
    await companie
      .getPlans()
      .then((resp) => {
        this.mainControll.plans = resp.data.items;
      })
      .catch((err) => {
        this.mainControll.plans = [];
      });
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
.v-stepper__header{
  height: unset!important;
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

html {
  scroll-behavior: smooth;
}

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
</style>