<template>
  <v-container>
    <span v-show="!mainControll">{{ mainControll }}</span>
    <v-card
      class="mx-auto"
      elevation="4"
      style="box-shadow: unset !important"
      v-if="
        (userData &&
          userData['profiles'] &&
          userData['profiles'].indexOf('RECRUITER') != -1 &&
          company &&
          company['companyId']) ||
        (userData &&
          userData['profiles'] &&
          userData.profiles.indexOf('CANDIDATE') != -1) ||
        (company && company['companyId'])
      "
    >
      <v-btn
        v-if="company && company.companyId"
        block
        dark
        color="cyan"
        x-large
        @click="
          $router.push(
            `/jobs/create/company/${company.companyId}/recruiter/${
              userData && userData.userId ? userData.userId : company.companyId
            }`
          )
        "
      >
        <v-icon color="white" class="mr-2" style="cursor: pointer"
          >mdi-plus-circle</v-icon
        >
        CADASTRAR NOVA VAGA
      </v-btn>
      <v-toolbar color="amber darken-4" dark>
        <v-toolbar-title
          >Vagas
          <strong>{{ company ? company["name"] : "" }}</strong></v-toolbar-title
        >

        <v-spacer></v-spacer>
         
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar Vagas"
          single-line
          @keyup="filterJob"
          clearable
          hide-details
        ></v-text-field>
      </v-toolbar>
      <v-progress-linear
        color="teal"
        indeterminate
        :active="activeLoading"
        height="5"
      ></v-progress-linear>
      <v-list two-line>
       
        <v-list-item-group v-model="selected">
           <v-row>
             <v-col align="end">
                  <span style=" display: block; padding: 0 16px 4px 16px; border-bottom: 1px solid #eee">{{items.length}} vagas cadastradas</span>
              </v-col>
            </v-row>
          <template v-for="item in items">
            <v-list-item
              :key="item.title"
              :class="
                item.done
                  ? 'doneJob'
                  : item.cadidateUsers &&
                    item.cadidateUsers.indexOf(userData.userId) != -1
                  ? 'green lighten-5'
                  : ''
              "
              class="card-job"
            >
              <template v-slot:default="{}">
                <v-list-item-content @click="$router.push('/jobs/' + item._id)">
                  <v-row no-gutters justify="space-between">
                    <v-col md="4">
                      <v-list-item-title
                        style="color: #025891"
                        class="font-weight-black"
                        v-text="item.title"
                      ></v-list-item-title>
                    </v-col>
                    <v-col cols="12" md="4" sm="12" offset-md="4">
                      <!-- <span v-for="skill in item.requiredSkills" :key="skill">{{skill}}</span> -->
                      <v-chip
                        v-for="skill in item.requiredSkills"
                        :key="skill"
                        style="height: 15px; font-size: 10px"
                        class="ma-1 font-wight-black font-weight-black"
                        small
                        outlined
                        :color="`#${((Math.random() * 0xffffff) << 0).toString(
                          16
                        )}`"
                        label
                        >{{ skill }}</v-chip
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      md="2"
                      sm="4"
                      v-if="
                        item.cadidateUsers &&
                        item.cadidateUsers.indexOf(userData.userId) != -1
                      "
                    >
                      <v-chip
                        class="ma-1 font-wight-black font-weight-black"
                        outlined
                        small
                        color="indigo"
                        label
                        >CANDIDATADO!</v-chip
                      >
                    </v-col>
                    <v-col md="2" sm="4" v-if="item.done">
                      <v-chip
                        class="ma-1 font-wight-black font-weight-black"
                        outlined
                        small
                        color="indigo"
                        label
                        >ENCERRADO!</v-chip
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="6" md="1" class="pt-0">
                      <v-list-item-subtitle
                        class="font-weight-bold success--text"
                        v-text="
                          item.salary
                            ? `R$ ${item.salary.toLocaleString('pt-BR')}`
                            : '-'
                        "
                      ></v-list-item-subtitle>
                    </v-col>
                    <v-col sm="6" md="2" class="pt-0">
                      <v-icon small>timer</v-icon>
                      <small class="ml-2">{{
                        item.lastUpdateDate
                          ? new Date(item.lastUpdateDate).toLocaleString()
                          : "-"
                      }}</small>
                    </v-col>
                    <v-col sm="6" md="2" class="pt-0">
                      <v-icon small>place</v-icon>
                      <small class="mr-2">{{
                        item.state ? item.state : "-"
                      }}</small>
                      <v-divider vertical />
                      <small class="ml-2">{{
                        item.city ? item.city : "-"
                      }}</small>
                    </v-col>
                  </v-row>

                  <div class="ellipse" v-text="item.description"></div>
                  
                  <div v-if="item.benefits && item.benefits.length > 0" style="margin-top: 24px;">
                    <v-row no-gutters>
                      <v-col cols="12" >
                        <span style="font-weight: bold; color: #234">Benefícios:</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-chip
                        v-for="benefits in item.benefits"
                        :key="benefits"
                        class="ma-1 font-wight-black font-weight-black white--text"
                        small
                        :color="`#${((Math.random() * 0xffffff) << 0).toString(16)}`"
                        label
                        >{{ benefits }}</v-chip
                      >
                    </v-row>
                  </div>
                   
                   <v-row style="margin-top: 12px; font-weight: bold; color: #234" >
                      <v-col cols="12" >
                        <span v-if="item.examConfig.length > 0">Possui exames obrigatórios ao se candidatar</span>
                        <span v-else>Não possui exames</span>
                      </v-col>
                    </v-row>
                  
                  <v-row
                    no-gutters
                    :align="'center'"
                    :justify="'end'"
                    class="mt-2"
                  >
                    <v-col cols="24" :align="'end'">
                      <v-btn
                        class="ma-2 white--text"
                        x-small
                        @click="$router.push('/jobs/' + item._id)"
                        outlined
                        color="teal"
                        >Visualizar</v-btn
                      >
                      <v-btn
                        class="ma-2 white--text"
                        :disabled="
                          (item.cadidateUsers &&
                            item.cadidateUsers.indexOf(userData.userId) !=
                              -1) ||
                          !userData.curriculum
                        "
                        x-small
                        solid
                        v-if="company && !company.hasOwnProperty('companyId')"
                        color="teal"
                        @click="
                          $router.push('/jobs/' + item._id + '?candidate=true')
                        "
                        >Candidatar</v-btn
                      >
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
  props: {
    userData: Object,
    company: Object,
    mainControll: Object,
  },
  components: {
    Menu: Menu,
  },
  data: () => ({
    selected: [2],
    items: [],
    activeLoading: false,
    search: "",
    allJobs: [],
    companyId: undefined,
  }),
  async mounted() {
    const jobsApi = new Jobs();
    this.activeLoading = true;
    let companyId;
    if (this.company && this.company.hasOwnProperty("companyId")) {
      companyId = this.company.companyId;
    }
    await jobsApi
      .getAll(companyId)
      .then((success) => {
        this.companyId = companyId;
        this.items = success.data.items;
        console.log('success items', success);
        this.activeLoading = false;
      })
      .catch((err) => {
        this.companyId = undefined;
        this.activeLoading = false;
        console.log(err);
      });
  },
  watch: {
    mainControll: {
      handler: async function (after, before) {
        // Return the object that changed
        if (after && after.company) {
          if (after.company.companyId != this.companyId) {
            const jobsApi = new Jobs();
            await jobsApi
              .getAll(after.company.companyId)
              .then((success) => {
                this.companyId = after.company.companyId;
                this.items = success.data.items;
                console.log(success);
                this.activeLoading = false;
              })
              .catch((err) => {
                this.companyId = undefined;
                this.activeLoading = false;
                console.log(err);
              });
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    openModalJob(jobId) {},
    filterJob() {
      if (!this.search && this.search == "") {
        this.items = [...this.allJobs];
      } else {
        let search = this.search.toString().toLowerCase();
        if (this.allJobs.length == 0) {
          this.allJobs = [...this.items];
        }
        console.log(this.allJobs.length);
        this.items = [
          ...this.applyAndGetOnlyFilteredData(this.allJobs, search),
        ];
      }
    },
    applyAndGetOnlyFilteredData(items, search, filter) {
      if (!search) {
        return items;
      }

      function new_filter(val, search) {
        return (
          val !== null &&
          ["undefined", "boolean"].indexOf(typeof val) === -1 &&
          val
            .toString()
            .toLowerCase()
            .replace(/[^0-9a-zA-Z]+/g, "")
            .indexOf(search) !== -1
        );
      }

      let needleAry = search
        .toString()
        .toLowerCase()
        .split(" ")
        .filter((x) => x);

      return items.filter((row) =>
        needleAry.every((needle) =>
          Object.keys(row).some((key) => new_filter(row[key], needle))
        )
      );
    },
  },
};
</script>
<style scoped>
.wrapper {
  z-index: 1;
}
.doneJob {
  background-color: #ff000014;
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

.card-job {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}
.card-job + .card-job {
  margin: 16px 0;
}
</style>