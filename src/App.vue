<template>
  <v-app>
    <Login :mainControll="mainControll"></Login>
    <v-col v-if="mainControll.globalLoading" class="global-loading" cols="12">
      <v-row align="center" justify="center" style="height: 80vh">
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
import {Companies} from "@/services/companies.js"
export default {
  name: "App",

  components: { Logged: Logged, Login: Login },
  data: () => ({
    mainControll: {
      showLoginDialog: false,
      registerTab: false,
      globalLoading: false,
      dashInfo: {},
      userData: {},
      company: {},
      plans: []
    },
  }),
  async mounted(){
    const companie = new Companies();
    await companie.getPlans().then(resp =>{
      this.mainControll.plans = resp.data.items;
    })
    .catch(err =>{
      this.mainControll.plans = []
    })
  }
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