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
      <v-list two-line>
        <v-list-item-group v-model="selected" multiple active-class="orange--text">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.title">
              <template v-slot:default="{ active}">
                <v-list-item-content>
                  <v-row no-gutters justify="space-between">
                    <v-col md="4">
                      <v-list-item-title
                        style="color: #025891"
                        class="font-weight-black"
                        v-text="item.title"
                      ></v-list-item-title>
                    </v-col>
                    <v-col md="2" offset-md="4">
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
                    <v-col sm="6"  md="2" class="pt-0">
                        <v-icon small>timer</v-icon>
                        <small>{{item.lastUpdateDate ? new Date(item.lastUpdateDate).toLocaleString() : '-'}}</small>
                    </v-col>
                    <v-col sm="6" md="2" class="pt-0">
                        <v-icon small>location</v-icon>
                        <small>{{item.lastUpdateDate ? new Date(item.lastUpdateDate).toLocaleString() : '-'}}</small>
                    </v-col>
                    
                  </v-row>

                  <div class="ellipse" v-text="item.description"></div>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                  <v-icon v-if="!active" color="grey lighten-1">star_border</v-icon>

                  <v-icon v-else color="yellow">star</v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>
            <!-- difficulty[JUNIOR] -->
            <!-- "requiredSkills": [ "JAVA", "ORACLE" ], -->
            <!-- cadidateUsers: [] -->
            <!-- "city": "RJ", "state": "RJ" -->
            <!-- "lastUpdateDate": "2020-09-12T16:02:39.813Z" -->
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
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
  components: {
    Menu: Menu,
  },
  data: () => ({
    selected: [2],
    items: [],
  }),
  async mounted() {
    const jobsApi = new Jobs();
    await jobsApi
      .getAll()
      .then((success) => {
        this.items = success.data.items;
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>