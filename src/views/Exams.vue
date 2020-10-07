<template>
  <article v-show="show">
    <v-stepper v-model="e1" non-linear>
      <v-btn @click="$router.push('/jobs/' + $router.currentRoute.params.id)" class="blue--text" text fab small>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-col cols="12" sm="12" md="12">
        <div class="base approved" v-if="dataOfDone">
          Exame Finalizado
          <div>
            <small v-if="verifyFeedback()"
              >Em breve recebera o resultado da empresa</small
            >
          </div>
        </div>
        <div class="base neutral" v-else>PENDENTE</div>
      </v-col>
      <v-row v-if="!dataOfDone" align="center" justify="end" class="mr-2">
        <v-col cols="3" style="text-align: center">
          <div style="color: grey">
            <small><strong>Total de questões</strong></small>
          </div>
          <div>
            <strong
              ><small>{{ questions.length }}</small></strong
            >
          </div>
        </v-col>
        <v-col cols="3" style="text-align: center">
          <div style="color: grey">
            <small><strong>Total de questões respondidas</strong></small>
          </div>
          <div>
            <strong
              ><small>{{ totalHits }}</small></strong
            >
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          cols="12"
          sm="12"
          class="base approved"
          v-if="
            dataDone.approved &&
            dataDone.approved.indexOf(
              this.$router.currentRoute.params.userId
            ) != -1
          "
        >
          Aprovado!!
          <div>
            <small>Em breve a empresa entrará em contato via e-mail!</small>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          class="base repproved"
          v-if="
            dataDone.repproved &&
            dataDone.repproved.indexOf(
              this.$router.currentRoute.params.userId
            ) != -1
          "
        >
          Reprovado!!
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <div style="text-align: center">
            <strong> Total de questões</strong>
          </div>
          <div style="text-align: center">
            {{ dataDone.totalHits + dataDone.totalErrors }}
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <div class="mb-0 mt-2 font-weight-medium text-center">
            <v-list-item-subtitle class="font-weight-black"
              >Inicio</v-list-item-subtitle
            >
            <span v-if="dataDone && dataDone.startedAt" class="caption">{{
              new Date(dataDone.startedAt).toLocaleString()
            }}</span>
            <span v-else class="caption">-</span>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <div class="mb-0 mt-2 font-weight-medium text-center">
            <v-list-item-subtitle class="font-weight-black"
              >Conclusão</v-list-item-subtitle
            >
            <span v-if="dataDone && dataDone.doneAt" class="caption">{{
              new Date(dataDone.doneAt).toLocaleString()
            }}</span>
            <span v-else class="caption">-</span>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <div class="mb-0 mt-2 font-weight-medium text-center">
            <v-list-item-subtitle class="font-weight-black"
              >Acertos</v-list-item-subtitle
            >
            <span class="mt-2">{{ dataDone ? dataDone.hitPercent : "" }}</span>
          </div>
        </v-col>
      </v-row>
      <v-stepper-header  v-if="!dataOfDone">
        <article v-for="(question, index) in questions" :key="question._id">
          <v-stepper-step
            color="cyan"
            editable
            :complete="e1 > index"
            :step="index"
          >
            {{ question.questionId.title }}
          </v-stepper-step>
          <v-divider></v-divider>
        </article>
      </v-stepper-header>

      <v-stepper-items>
          <v-stepper-content  v-for="(question, index) in questions" :step="`${index}`" :key="`${index}-content`" style="overflow:scroll">
            <strong style="font-size: 1.2em">{{
              question.questionId.description
            }}</strong>

            <v-card class="mb-12" color="grey lighten-3" height="200px" style="overflow:scroll">
              <ul class="pa-5 ml-5" style="cursor: pointer">
                <li
                  style="
                    display: flex;
                    flex: 1;
                    align-items: center;
                    text-align: left !important;
                  "
                  class="mt-2"
                  v-for="alternative in question.questionId.alternatives"
                  :key="alternative.id"
                  v-ripple="{ class: 'indigo--text' }"
                  @click="selectQuestion(index, question, alternative.id)"
                  :class="
                    question.questionId.aswer == alternative.id
                      ? `selected`
                      : ''
                  "
                >
                  <v-btn text>
                    <v-btn
                      color="primary"
                      class="mr-2"
                      small
                      elevation="2"
                      icon
                      outlined
                    >
                      {{ alternative.id }}
                    </v-btn>
                    <span style="text-transform:none;!important;">{{
                      alternative.description
                    }}</span>
                  </v-btn>
                </li>
              </ul>
            </v-card>

            <v-btn
              color="primary"
              :disabled="index == 0"
              outlined
              small
              class="mr-2"
              @click="e1 = index > 0 ? index - 1 : index"
            >
              Voltar</v-btn
            >
            <v-btn
              color="primary"
              small
              :disabled="index == questions.length - 1"
              @click="e1 = index + 1"
            >
              Próxima</v-btn
            >
          </v-stepper-content>
          <v-divider></v-divider>
      <v-btn
        block
        x-large
        color="teal"
        :disabled="(questions.length == 0 ? true : false) || dataOfDone || questions.some(question => !questionId.aswer)"
        :outlined="!(totalHits == questions.length)"
        @click="dialogDoneExam = true"
      >
        Finalizar Exame
      </v-btn>
      </v-stepper-items>
    </v-stepper>
    <v-dialog v-model="dialogDoneExam" persistent max-width="600">
      <v-card>
        <v-card-title class="headline green--text"
          >Finalizar exame</v-card-title
        >
        <v-card-text v-if="!dataOfDone">
          <v-row>
            <v-col>
              <div style="text-align: center">
                <strong> Total de questões</strong>
              </div>
              <div style="text-align: center">{{ questions.length }}</div>
            </v-col>
            <v-col>
              <div style="text-align: center">
                <strong> Total de questões respondidas</strong>
              </div>
              <div style="text-align: center">{{ totalHits }}</div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-if="dataOfDone">
          <div style="text-align: center; font-size: 1.2em">
            <strong>Relatório:</strong>
          </div>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <div style="text-align: center">
                <strong> Total de questões</strong>
              </div>
              <div style="text-align: center">
                {{ dataDone.totalHits + dataDone.totalErrors }}
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <div class="mb-0 mt-2 font-weight-medium text-center">
                <v-list-item-subtitle class="font-weight-black"
                  >Inscrição</v-list-item-subtitle
                >
                <span v-if="dataDone && dataDone.startedAt" class="caption">{{
                  new Date(dataDone.startedAt).toLocaleString()
                }}</span>
                <span v-else class="caption">-</span>
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <div class="mb-0 mt-2 font-weight-medium text-center">
                <v-list-item-subtitle class="font-weight-black"
                  >Conclusão</v-list-item-subtitle
                >
                <span v-if="dataDone && dataDone.doneAt" class="caption">{{
                  new Date(dataDone.doneAt).toLocaleString()
                }}</span>
                <span v-else class="caption">-</span>
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <div class="mb-0 mt-2 font-weight-medium text-center">
                <v-list-item-subtitle class="font-weight-black"
                  >Acertos</v-list-item-subtitle
                >
                <span class="mt-2">{{
                  dataDone ? dataDone.hitPercent : ""
                }}</span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" small text @click="dialogDoneExam = false"
            >Fechar</v-btn
          >
          <v-btn
            color="teal darken-1"
            small
            :disabled="dataOfDone"
            @click="doneExam()"
            >Finalizar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </article>
</template>
<script>
import { Exams } from "@/services/exams.js";
export default {
  props: {
    mainControll: Object,
  },
  data: () => ({
    questions: [],
    totalErrors: 0,
    totalHits: 0,
    startedAt: undefined,
    doneAt: undefined,
    e1: 0,
    show: true,
    dialogDoneExam: false,
    dataOfDone: false,
    dataDone: {},
  }),
  async mounted() {
    console.log("ROUTER");
    const jobId = this.$router.currentRoute.params.id;
    const candidateId = this.$router.currentRoute.params.userId;
    const exam = new Exams();
    this.mainControll.globalLoading = true;
    console.log(this.$router.currentRoute);
    await exam
      .startExamOfUser(jobId, candidateId)
      .then((success) => {
        if (success.status == 200) {
          this.mainControll.globalLoading = false;
          if (success.data) {
            if (
              success.data.candidateControll &&
              success.data.candidateControll.length > 0
            ) {
              success.data.candidateControll.forEach((c) => {
                if (c.candidateId == candidateId) {
                  this.startedAt = c.startedAt;
                  this.doneAt = c.doneAt;
                  this.questions = c.questions;
                }
              });
            }
          }
        } else {
          this.dataOfDone = false;
          this.dataDone = {};
          this.mainControll.globalLoading = false;
          this.showInvalidSnackBar(err.response.data["message"]);
        }
      })
      .catch((err) => {
        if (err.response.status == 404) {
          this.successSnackBar("Estamos buscando as informações do exame"
          );
          exam
            .examOfUser(jobId, candidateId)
            .then((resp) => {
              this.mainControll.globalLoading = false;
              this.dataOfDone = true;
              this.dataDone = resp.data;
            })
            .catch((err) => {
              console.error(err);
              this.dataOfDone = false;
              this.dataDone = {};
              this.mainControll.globalLoading = false;
              this.showInvalidSnackBar(err.response.data["message"]);
            });
        } else {
          this.questions = [];
          console.log(err);
          this.showInvalidSnackBar(err.response.data["message"]);
          this.mainControll.globalLoading = false;
        }
      });
  },
  methods: {
    successSnackBar(message) {
      this.mainControll.alert.text = message;
      this.mainControll.alert.color = "green";
      this.mainControll.alert.show = true;
    },
    showInvalidSnackBar(message) {
      this.mainControll.alert.color = "red";
      this.mainControll.alert.text = message;
      this.mainControll.alert.show = true;
    },
    selectQuestion(index, question, alternative) {
      question.questionId["aswer"] = alternative;
      this.show = false;
      this.show = true;

      this.totalHits = this.questions.filter((f) =>
        f.questionId.aswer ? true : false
      ).length;
    },
    async doneExam() {
      const jobId = this.$router.currentRoute.params.id;
      const candidateId = this.$router.currentRoute.params.userId;
      const exam = new Exams();

      this.mainControll.globalLoading = true;
      for (let i = 0; i < this.questions.length; i++) {
        const question = this.questions[i];

        await exam
          .aswerQuestion(
            jobId,
            candidateId,
            question.questionId._id,
            question.questionId.aswer
          )
          .then((resp) => {})
          .catch((err) => {
            console.error(err);
            this.showInvalidSnackBar(err.response.data["message"]);
          });
      }

      await exam
        .doneExamOfUser(jobId, candidateId)
        .then((resp) => {
          if (resp.status == 200) {
            this.dataOfDone = true;
            this.dataDone = resp.data;
          } else {
            this.showInvalidSnackBar(response.data["message"]);
          }
        })
        .catch((err) => {
          this.dataOfDone = false;
          this.dataDone = {};
          console.error(err);
          this.showInvalidSnackBar(err.response.data["message"]);
        });

      this.mainControll.globalLoading = false;
    },
    verifyFeedback() {
      return (
        !this.dataDone.approved ||
        !this.dataDone.repproved ||
        (this.dataDone.approved.indexOf(
          this.$router.currentRoute.params.userId
        ) == -1 &&
        this.dataDone.repproved.indexOf(
          this.$router.currentRoute.params.userId
        ) == -1)
      );
    },
  },
};
</script>
<style scoped>
.selected {
  background-color: rgba(108, 208, 255, 0.37);
  border-radius: 5px;
  box-shadow: rgba(128, 128, 128, 0.44) 1px 1px 1px 1px;
  text-align: left !important;
}
.base {
  text-align: center;
  width: 100%;
  font-weight: bold;
  padding: 2px;
}

.approved {
  background-color: #6fb36f85;
  color: #015a01;
}

.repproved {
  color: #5f0000;
  background-color: #ff00004a;
}

.neutral {
  color: #000000;
  background-color: #9c99994a;
}

</style>