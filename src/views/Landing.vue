<template>
  <div v-ripple class="main text-center elevation-2 pa-12 headline">
    <img style="width: 80%" alt="Vue logo" src="../assets/vaga-certa-logo.b1818157.png" />
    <v-content>
      <v-row>
        <v-col v-for="route in routes" :key="route">
          <v-btn @click="$router.push(route.path)" class="ma-2" outlined color="teal" dark>{{route.name}}</v-btn>
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
import { routes } from "@/router/index.js";
export default {
  data: () => ({
    routes: routes
  }),
  mounted() {
    console.log(routes)
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