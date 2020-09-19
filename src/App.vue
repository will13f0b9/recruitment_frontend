<template>
  <v-app>
    <v-main>
      <Logged />
    </v-main>
  </v-app>
</template>

<script>
import Logged from "@/views/Logged.vue";
export default {
  name: "App",

  components: { Logged: Logged },

  data: () => ({}),
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
</style>