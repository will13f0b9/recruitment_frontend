<template>
  <article v-show="show" style="margin: 0 24px 16px;">
    <v-stepper v-model="e1" non-linear style="box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2)">
      <v-btn
        @click="$router.push('/jobs/' + $router.currentRoute.params.id)"
        class="blue--text"
        text
        fab
        small
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-col cols="12" sm="12" md="12">
        <div v-if="!dataOfDone && (!questions || questions.length == 0)" class="base neutral">Exame sem questões!</div>
        <div class="base approved" v-else-if="dataOfDone">
          <small>Situação do exame:</small><br/>
          FINALIZADO
          <div>
            <small v-if="verifyFeedback()"
              >Em breve recebera o resultado da empresa</small
            >
          </div>
        </div>
        <div class="base neutral" v-else><small>Situação do exame:</small><br/>PENDENTE</div>
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
            <div v-if="dataDone.doneAt">
              <v-chip
                close-icon="mdi-close-outline"
                color="yellow"
                filter
                link
                label
                pill
                @click="openDetails()"
              >
                <v-icon>mdi-alert-octagon-outline</v-icon> Ver detalhes</v-chip
              >
            </div>
          </div>
        </v-col>
      </v-row>
      <v-stepper-header v-if="!dataOfDone" style="box-shadow: unset; border-bottom: 1px solid #ddd; border-top: 1px solid #ddd;">
        <article v-for="(question, index) in questions" :key="question._id">
          
          <v-stepper-step
            :color="question.questionId.aswer ? 'cyan' : 'grey'"
            editable
            :complete="question.questionId.aswer ? true : false"
            :step="index + 1"
          >
            {{ question.questionId.title }}
          </v-stepper-step>
        </article>
      </v-stepper-header>

      <v-stepper-items v-if="!dataOfDone">
        <v-stepper-content
          v-for="(question, index) in questions"
          :step="index + 1"
          :key="index + 1"
          style="overflow: scroll"
        >
          <strong class="cyan--text">{{index + 1}} ) </strong>
          <strong style="font-size: 1.2em">{{
            question.questionId.description
          }}</strong>

          <v-card
            class="mb-12"
            color="grey lighten-3"
            style="overflow: scroll"
          >
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
                  question.questionId.aswer == alternative.id ? `selected` : ''
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
            :disabled="(index + 1) == 1"
            outlined
            small
            class="mr-2"
            @click="e1 = index > 1 ? index - 1 : index"
          >
            Voltar</v-btn
          >
          <v-btn
            color="primary"
            small
            :disabled="(index + 1) == questions.length"
            @click="e1 = (index + 2)"
          >
            Próxima</v-btn
          >
        </v-stepper-content>
        <div style="margin: 0 16px 16px;">
          <v-btn
            style="color: white;"
            block
            x-large
            color="teal"
            :disabled="
              (questions.length == 0 ? true : false) ||
              dataOfDone ||
              questions.some((question) => !question.questionId.aswer)
            "
            :outlined="!(totalHits == questions.length)"
            @click="dialogDoneExam = true"
          >
            Finalizar Exame
          </v-btn>
        </div>
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
            style="color: white;"
            color="teal darken-1"
            small
            :disabled="dataOfDone"
            @click="doneExam()"
            >Finalizar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="examDetailsDialog" persistent>
      <v-card>
        <v-card-title class="headline grey--text"
          >Detalhes do seu exame!</v-card-title>
        <v-card-text>
          <v-row
            v-for="exam in examDetails.filter(d => d.quantity)"
            :key="exam._id"
            style="box-shadow: 5px 4px 7px 1px #0000001a"
            class="card-detail-exam"
            :style="`border-left: 10px solid #${((Math.random() * 0xffffff) << 0).toString(16)};`"
          >
            <v-col
              cols="12"
              sm="12"
              style="background-color: #f7f7f7; margin-top: 15px"
            >
              <h3>
                <strong>{{ exam.skill }}</strong>
              </h3>
            </v-col>
            <v-col>
              <div class="pt-0 ml-2 text-center font-weight-bold">
                <strong>Quantidade de questões</strong>
              </div>
              <div class="ml-2 text-center pr-2">
                <strong>{{ exam.quantity ? exam.quantity : "-" }}</strong>
              </div>
            </v-col>
            <v-col>
              <div class="ml-2 text-center font-weight-bold">
                <strong>Acertos</strong>
              </div>
              <div class="ml-2 text-center pr-2">
                <strong>{{ exam.success ? exam.success : "-" }}</strong>
              </div>
            </v-col>
            <v-col>
              <div class="ml-2 text-center font-weight-bold">
                <strong>Erros</strong>
              </div>
              <div class="ml-2 text-center pr-2">
                <strong>{{ exam.error ? exam.error : "-" }}</strong>
              </div>
            </v-col>

            <v-col>
              <div class="ml-2 text-center font-weight-bold">
                <strong>Porcentagem de acertos</strong>
              </div>
              <div class="ml-2 text-center pr-2">
                <strong>{{ exam.hitPercent ? exam.hitPercent : "-" }}</strong>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            small
            text
            @click="examDetailsDialog = false"
            >Fechar</v-btn
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
    examDetails: [],
    examDetailsDialog: false,
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
        console.log("Success", success)
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
                  setTimeout(()=>{
                    this.e1 = 1;
                  }, 100)
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
        console.log("err",  err)
        if (err.response.status == 404) {
          exam
            .examOfUser(jobId, candidateId)
            .then((resp) => {
              console.log("resp", resp)
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
    async openDetails() {
      const exams = new Exams();
      const jobId = this.$router.currentRoute.params.id;
      const candidateId = this.$router.currentRoute.params.userId;

      this.mainControll.globalLoading = true;
      await exams
        .detailsOfExamUser(jobId, candidateId)
        .then((resp) => {
          this.mainControll.globalLoading = false;

          if (resp.status == 200) {
            this.examDetails = resp.data.examConfig;
            this.examDetailsDialog = true;
          } else {
            this.examDetails = [];
          }
        })
        .catch((err) => {
          this.mainControll.globalLoading = false;
          console.error(err);
          this.examDetails = [];
          if (err.response.data["message"]) {
            this.showInvalidSnackBar(err.response.data["message"]);
          } else {
            this.showInvalidSnackBar(
              "Não foi possível buscar detalhes do exame! Nossa equipe entrará em contato"
            );
          }
        });
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

.card-detail-exam + .card-detail-exam {
  margin: 16px 0;
}
</style>