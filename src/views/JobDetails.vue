<template>
  <v-container style="z-index:2">
    <article v-if="activeLoading">
      <h2 class="white--text">Carregando detalhes...</h2>
      <v-progress-linear color="orange" indeterminate :active="activeLoading" height="5"></v-progress-linear>
    </article>
    <article v-else>
      <v-row no-gutters class="header" justify="center">
        <v-col>
          <v-btn @click="$router.push('/jobs/')" class="white--text" text fab small>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h2 class="white--text text-center">{{job.title}}</h2>
        </v-col>
      </v-row>
      <v-divider />
      <article class="jobWrapper">
        <article class="descHeader">
          <v-row>
            <v-col cols="6" sm="6" md="3">
              <div class="text-center grey--text font-weight-bold">Salário:</div>
              <div class="text-center">
                <v-icon small>attach_money</v-icon>
                <span
                  class="font-weight-bold success--text"
                  v-text="job.salary ? `R$ ${job.salary.toLocaleString('pt-BR')}` : '-'"
                ></span>
              </div>
            </v-col>

            <v-col cols="6" sm="6" md="3">
              <div class="text-center grey--text font-weight-bold">Criado em:</div>
              <div class="text-center">
                <v-icon small>timer</v-icon>
                <small
                  class="ml-2"
                >{{job.lastUpdateDate ? new Date(job.lastUpdateDate).toLocaleString() : '-'}}</small>
              </div>
            </v-col>

            <v-col cols="6" sm="6" md="3">
              <div class="text-center grey--text font-weight-bold">Última Atualização em:</div>
              <div class="text-center">
                <v-icon small>timer</v-icon>
                <small
                  class="ml-2"
                >{{job.lastUpdateDate ? new Date(job.lastUpdateDate).toLocaleString() : '-'}}</small>
              </div>
            </v-col>

            <v-col cols="6" sm="6" md="3">
              <div class="text-center grey--text font-weight-bold">Localização:</div>
              <div class="text-center">
                <small>{{job.address ? job.address : '-'}}</small>
                <br />
                <v-icon small>place</v-icon>
                <small class="mr-2">{{job.state ? job.state : '-'}}</small>
                <v-divider vertical />
                <small class="ml-2">{{job.city ? job.city : '-'}}</small>
              </div>
            </v-col>
          </v-row>
        </article>

        <article class="descBody">
          <v-row justify="start">
            <v-col cols="12" sm="12">
              <div class="grey--text text-left font-weight-bold" style="font-size: 1.4em">
                <v-icon class="mr-2">mdi_domain</v-icon>
                {{job.company.name}}
              </div>
              <div class="ml-2 text-justify pr-2">{{job.company.description}}</div>
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-col cols="12" sm="12">
              <div class="ml-2 grey--text font-weight-bold">Descrição da vaga:</div>
              <div class="ml-2 text-justify pr-2">{{job.description}}</div>
            </v-col>
          </v-row>
          <v-divider />
          <v-row justify="start">
            <v-col cols="12" sm="12">
              <div class="ml-2 grey--text font-weight-bold">Informações complementares:</div>
              <div class="ml-2 text-justify pr-2">{{job.anotherInfo ? job.anotherInfo : '-'}}</div>
            </v-col>
          </v-row>
          <v-row justify="start" class="ml-2">
            <v-col cols="12" sm="4">
              <div class="grey--text font-weight-bold">Habilidades necessárias:</div>
              <v-chip
                v-for="skill in job.requiredSkills"
                :key="skill"
                class="ma-1 font-wight-black font-weight-black white--text"
                small
                :color="`#${((Math.random() * 0xffffff) <<0).toString(16)}`"
                label
              >{{skill}}</v-chip>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="grey--text font-weight-bold">Habilidades encantadoras:</div>
              <v-chip
                v-for="desirableSkills in job.desirableSkills"
                :key="desirableSkills"
                class="ma-1 font-wight-black font-weight-black white--text"
                small
                :color="`#${((Math.random() * 0xffffff) <<0).toString(16)}`"
                label
              >{{desirableSkills}}</v-chip>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="grey--text font-weight-bold">
                <v-icon small class="mr-2">fitness_center</v-icon>Nível:
              </div>
              <v-chip
                v-for="difficulty in job.difficulty"
                :key="difficulty"
                class="ma-1 font-wight-black font-weight-black white--text"
                small
                :color="`#${((Math.random() * 0xffffff) <<0).toString(16)}`"
                label
              >{{difficulty}}</v-chip>
            </v-col>
          </v-row>
          <v-row justify="start" class="ml-2">
            <v-col cols="12" sm="4">
              <div class="ml- grey--text font-weight-bold">Candidatos inscritos:</div>
              <span class="ml-2" style="font-size: 1.4em">
                <v-icon small class="mr-4">people</v-icon>
                {{job.cadidateUsers ? job.cadidateUsers.length : 0}}
              </span>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="ml- grey--text font-weight-bold">Contração:</div>
              <span class="ml-2" style="font-size: 1.4em">
                <v-icon small class="mr-2">receipt_long</v-icon>
                {{job.hiring ? job.hiring : '-'}}
              </span>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="ml-2 grey--text font-weight-bold">Beneficios:</div>
              <article v-if="job.benefits && job.benefits.length > 0">
                <v-chip
                  v-for="benefits in job.benefits"
                  :key="benefits"
                  class="ma-1 font-wight-black font-weight-black white--text"
                  small
                  :color="`#${((Math.random() * 0xffffff) <<0).toString(16)}`"
                  label
                >{{benefits}}</v-chip>
              </article>
              <span v-else>-</span>
            </v-col>
          </v-row>
        </article>
        <v-btn
          x-large
          block
          class="mt-5"
          color="success"
          :disabled="job.cadidateUsers && job.cadidateUsers.indexOf(userData.userId) != -1"
          @click="dialog= !dialog"
        >{{job.cadidateUsers && job.cadidateUsers.indexOf(userData.userId) != -1 ? 'Você já está candidatado a vaga': 'Candidatar-se!'}}</v-btn>
      </article>
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="headline red--text">Atenção</v-card-title>
          <v-card-text>
            Está vaga possui
            <strong>exame automatico</strong>, deseja
            <strong>iniciar</strong> a candidatura agora ?.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" small text @click="dialog = false">Agora não</v-btn>
            <v-btn color="green darken-1" class="white--text" @click="dialog = false">Começar!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </article>
  </v-container>
</template>
<script>
import { Jobs } from "@/services/jobs.js";
export default {
  props: {
    userData: Object,
  },
  components: {},
  data: () => ({
    job: {},
    dialog: false,
    activeLoading: true,
  }),
  async mounted() {
    console.log("ROUTER");
    if (
      this.$router.currentRoute.query &&
      this.$router.currentRoute.query.candidate
    ) {
      this.dialog = this.$router.currentRoute.query.candidate;
    }
    let id = this.$router.currentRoute.params.id;
    const jobsApi = new Jobs();
    this.activeLoading = true;
    await jobsApi
      .getById(id)
      .then((success) => {
        this.job = success.data;
        this.activeLoading = false;
      })
      .catch((err) => {
        this.activeLoading = false;
        console.log(err);
      });
  },
  watch: {
    dialog: function (newVal, oldVal) {
      // this.selected = {};
    },
  },
};
</script>
<style scoped>
.descHeader {
  background-color: #fbfbed6b;
  font-size: 1.2em;
  /* box-shadow: 5px 10px 4px -2px #cacaca; */
}
.descBody {
  background-color: white;
  border-radius: 0px 0px 5px 5px;
  /* box-shadow: 5px 10px 4px -2px #cacaca; */
}
.header {
  background: linear-gradient(to right, #16a0bf, #025891);
  border: thin solid white;
  border-radius: 4px 4px 0px 0px;
  border-bottom: none;
  padding: 0px 0px 1px 10px;
}
.jobWrapper {
  border: 1px solid lightslategray;
  border-top: none;
  border-radius: 0px 0px 4px 4px;
}
</style>