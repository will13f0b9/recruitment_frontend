<template>
  <v-app v-if="loggedRouter()" class="about">
    <Menu :userData="userData" :dashInfo="dashInfo"></Menu>
    <router-view :userData="userData" v-bind:dashInfo="dashInfo"></router-view>
  </v-app>
  <v-app v-else class="about">
    <router-view></router-view>
  </v-app>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { routes } from "@/router/index.js";

export default {
  name: "App",

  components: { Menu: Menu },

  data: () => ({
    userData: {},
    dashInfo: {},
    candidate: {
      userData: {
        name: "André Golnçalvez",
        description: "Desenvolvedor React Native",
        avatar: "avatar-demo.a70aed79.png",
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
        avatar: "avatar-recruiter-demo.330ee974.png",
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
  },
  mounted() {
    console.log("CREATED");
    this.userData = this.candidate.userData;
    this.dashInfo = this.candidate.dashInfo;
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
</style>