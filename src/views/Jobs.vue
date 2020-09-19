<template>
  <v-container>
    <v-card class="mx-auto" elevation="4">
      <v-toolbar color="amber darken-4" dark>
        <v-toolbar-title>Vagas</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-toolbar>
      <v-progress-linear color="teal" indeterminate :active="activeLoading" height="5"></v-progress-linear>
      <v-list two-line>
        <v-list-item-group v-model="selected">
          <template v-for="(item) in items" >
            <v-divider :key="item._id" />
            <v-list-item :key="item.title" :class="item.cadidateUsers && item.cadidateUsers.indexOf(userData.userId) != -1 ? 'green lighten-5' : ''">
              <template v-slot:default="{}">
                <v-list-item-content>
                  <v-row no-gutters justify="space-between">
                    <v-col md="4">
                      <v-list-item-title
                        style="color: #025891"
                        class="font-weight-black"
                        v-text="item.title"
                      ></v-list-item-title>
                    </v-col>
                    <v-col md="2" sm="6" v-if="item.cadidateUsers && item.cadidateUsers.indexOf(userData.userId) != -1">
                      <v-chip
                        class="ma-1 font-wight-black font-weight-black"
                        outlined
                        color="indigo"
                        label
                      >CANDIDATADO!</v-chip>
                    </v-col>
                    <v-col cols="12" md="2" sm="6" offset-md="4">
                      <!-- <span v-for="skill in item.requiredSkills" :key="skill">{{skill}}</span> -->
                      <v-chip
                        v-for="skill in item.requiredSkills"
                        :key="skill"
                        style="height: 15px; font-size: 10px;"
                        class="ma-1 font-wight-black font-weight-black"
                        small
                        outlined
                        :color="`#${((Math.random() * 0xffffff) <<0).toString(16)}`"
                        label
                      >{{skill}}</v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="6" md="1" class="pt-0">
                      <v-list-item-subtitle
                        class="font-weight-bold success--text"
                        v-text="item.salary ? `R$ ${item.salary.toLocaleString('pt-BR')}` : '-'"
                      ></v-list-item-subtitle>
                    </v-col>
                    <v-col sm="6" md="2" class="pt-0">
                      <v-icon small>timer</v-icon>
                      <small
                        class="ml-2"
                      >{{item.lastUpdateDate ? new Date(item.lastUpdateDate).toLocaleString() : '-'}}</small>
                    </v-col>
                    <v-col sm="6" md="2" class="pt-0">
                      <v-icon small>place</v-icon>
                      <small class="mr-2">{{item.state ? item.state : '-'}}</small>
                      <v-divider vertical />
                      <small class="ml-2">{{item.city ? item.city : '-'}}</small>
                    </v-col>
                  </v-row>

                  <div class="ellipse" v-text="item.description"></div>
                  <v-row no-gutters :align="'center'" :justify="'end'" class="mt-2">
                    <v-col cols="24" :align="'end'">
                      <v-btn
                        class="ma-2 white--text"
                        x-small
                        @click="$router.push('/jobs/'+item._id)"
                        outlined
                        color="teal"
                      >Visualizar</v-btn>
                      <v-btn
                        class="ma-2 white--text"
                        :disabled="item.cadidateUsers && item.cadidateUsers.indexOf(userData.userId) != -1"
                        x-small
                        solid
                        color="teal"
                        @click="$router.push('/jobs/'+item._id + '?candidate=true')"
                      >Candidatar</v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>
<script>
import Menu from "@/components/Menu.vue";
import { Jobs } from "@/services/jobs.js";
export default {
  props:{
    userData: Object
  },
  components: {
    Menu: Menu,
  },
  data: () => ({
    selected: [2],
    items: [],
    activeLoading: false,
  }),
  async mounted() {
    const jobsApi = new Jobs();
    this.activeLoading = true;
    await jobsApi
      .getAll()
      .then((success) => {
        this.items = success.data.items;
        console.log(success);
        this.activeLoading = false;
      })
      .catch((err) => {
        this.activeLoading = false;
        console.log(err);
      });
  },
  methods: {
    openModalJob(jobId) {},
  },
};
</script>
<style scoped>
.wrapper {
  z-index: 1;
}
.ellipse {
  display: block;
  display: -webkit-box;
  /* max-width: 250px; */
  font-size: 20dp;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>