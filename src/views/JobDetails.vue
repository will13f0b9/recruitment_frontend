<template>
  <v-container style="z-index: 2">
    <article v-if="activeLoading">
      <h2 class="white--text">Carregando detalhes...</h2>
      <v-progress-linear
        color="orange"
        indeterminate
        :active="activeLoading"
        height="5"
      ></v-progress-linear>
    </article>
    <article v-else style="box-shadow: 0 0 6px rgba(0,0,0,0.4)">
      <v-row no-gutters class="header" justify="center">
        <v-col>
          <v-btn
            @click="$router.push('/jobs/')"
            class="white--text"
            text
            fab
            small
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h2 class="white--text text-center">{{ job.title }}</h2>
          <article class="mr-4 mb-2">
            <v-btn
              v-if="company && company.hasOwnProperty('companyId')"
              @click="
                $router.push('/jobs/edit/' + $router.currentRoute.params.id)
              "
              class="black--text mr-4"
              color="white"
              block
              small
            >
              <v-icon class="mr-2">mdi-clipboard-edit-outline</v-icon> Editar
              vaga
            </v-btn>
          </article>
        </v-col>
      </v-row>
      <v-divider />
      <article class="jobWrapper">
        <article class="descHeader">
          <v-row>
            <v-col cols="6" sm="6" md="3">
              <div class="text-center grey--text font-weight-bold">
                Salário:
              </div>
              <div class="text-center">
                <v-icon small>attach_money</v-icon>
                <span
                  class="font-weight-bold success--text"
                  v-text="
                    job.salary
                      ? `R$ ${job.salary.toLocaleString('pt-BR')}`
                      : '-'
                  "
                ></span>
              </div>
            </v-col>
            <v-col cols="6" sm="6" md="3">
              <div class="text-center grey--text font-weight-bold">
                Criado em:
              </div>
              <div class="text-center">
                <v-icon small>timer</v-icon>
                <small class="ml-2">{{
                  job.lastUpdateDate
                    ? new Date(job.lastUpdateDate).toLocaleString()
                    : "-"
                }}</small>
              </div>
            </v-col>

            <v-col cols="6" sm="6" md="3">
              <div class="text-center grey--text font-weight-bold">
                Última Atualização em:
              </div>
              <div class="text-center">
                <v-icon small>timer</v-icon>
                <small class="ml-2">{{
                  job.lastUpdateDate
                    ? new Date(job.lastUpdateDate).toLocaleString()
                    : "-"
                }}</small>
              </div>
            </v-col>

            <v-col cols="6" sm="6" md="3">
              <div class="text-center grey--text font-weight-bold">
                Localização:
              </div>
              <div class="text-center">
                <small>{{ job.address ? job.address : "-" }}</small>
                <br />
                <v-icon small>place</v-icon>
                <small class="mr-2">{{ job.state ? job.state : "-" }}</small>
                <v-divider vertical />
                <small class="ml-2">{{ job.city ? job.city : "-" }}</small>
              </div>
            </v-col>
          </v-row>
        </article>

        <article class="descBody">
          <v-row justify="start">
            <v-col cols="12" sm="12">
              <div
                class="grey--text text-left font-weight-bold"
                style="font-size: 1.4em"
              >
                <v-icon class="mr-2">mdi_domain</v-icon>
                {{ job.company ? job.company.name : "-" }}
              </div>
              <div class="ml-2 text-justify pr-2">
                {{ job.company ? job.company.description : "-" }}
              </div>
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-col cols="12" sm="12">
              <div class="ml-2 grey--text font-weight-bold">
                Descrição da vaga:
              </div>
              <div class="ml-2 text-justify pr-2">{{ job.description }}</div>
            </v-col>
          </v-row>
          <v-divider />
          <v-row justify="start">
            <v-col cols="12" sm="12">
              <div class="ml-2 grey--text font-weight-bold">
                Informações complementares:
              </div>
              <div class="ml-2 text-justify pr-2">
                {{ job.anotherInfo ? job.anotherInfo : "-" }}
              </div>
            </v-col>
          </v-row>
          <v-row justify="start" class="ml-2">
            <v-col cols="12" sm="4">
              <div class="grey--text font-weight-bold">
                Habilidades necessárias:
              </div>
              <v-chip
                v-for="skill in job.requiredSkills"
                :key="skill"
                class="ma-1 font-wight-black font-weight-black white--text"
                small
                :color="`#${((Math.random() * 0xffffff) << 0).toString(16)}`"
                label
                >{{ skill }}</v-chip
              >
            </v-col>
            <v-col cols="12" sm="4">
              <div class="grey--text font-weight-bold">
                Habilidades encantadoras:
              </div>
              <v-chip
                v-for="desirableSkills in job.desirableSkills"
                :key="desirableSkills"
                class="ma-1 font-wight-black font-weight-black white--text"
                small
                :color="`#${((Math.random() * 0xffffff) << 0).toString(16)}`"
                label
                >{{ desirableSkills }}</v-chip
              >
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
                :color="`#${((Math.random() * 0xffffff) << 0).toString(16)}`"
                label
                >{{ difficulty }}</v-chip
              >
            </v-col>
          </v-row>
          <v-row justify="start" class="ml-2">
            <v-col cols="12" sm="4">
              <div class="ml- grey--text font-weight-bold">
                Candidatos inscritos:
              </div>
              <span class="ml-2" style="font-size: 1.4em">
                <v-icon small class="mr-4">people</v-icon>
                {{ job.cadidateUsers ? job.cadidateUsers.length : 0 }}
              </span>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="ml- grey--text font-weight-bold">Contração:</div>
              <span class="ml-2" style="font-size: 1.4em">
                <v-icon small class="mr-2">receipt_long</v-icon>
                {{ job.hiring ? job.hiring : "-" }}
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
                  :color="`#${((Math.random() * 0xffffff) << 0).toString(16)}`"
                  label
                  >{{ benefits }}</v-chip
                >
              </article>
              <span v-else>-</span>
            </v-col>
          </v-row>
          <v-row
            style="font-weight: bold; color: #234"
            justify="start"
            class="ml-2"
          >
            <v-col>
              <span v-if="job.examConfig.length > 0"
                >Possui exames obrigatórios ao se candidatar</span
              >
              <span v-else>Nâo possui exames</span>
            </v-col>
          </v-row>
        </article>

        <div class="box-btns">
          <v-btn
            x-large
            block
            class="mt-5"
            color="success"
            v-if="
              company &&
              !company.hasOwnProperty('companyId') &&
              job.cadidateUsers &&
              job.cadidateUsers.indexOf(userData.userId) != -1 &&
              job.examConfig &&
              job.examConfig.length > 0
            "
            @click="pushToExame()"
            >Visualizar Exame</v-btn
          >
          <v-btn
            x-large
            block
            color="success"
            v-if="company && !company.hasOwnProperty('companyId')"
            :disabled="
              (job.cadidateUsers &&
                job.cadidateUsers.indexOf(userData.userId) != -1) ||
              !userData.curriculum ||
              job.done
            "
            @click="candidateUserToJob()"
            >{{
              job.cadidateUsers &&
              job.cadidateUsers.indexOf(userData.userId) != -1
                ? "Você está candidatado a vaga"
                : job.done
                ? "Vaga encerrada!"
                : "Candidatar-se!"
            }}</v-btn
          >
          <v-btn
            v-if="company && company.hasOwnProperty('companyId')"
            class="mt-5"
            color="teal"
            block
            x-large
            raised
            dark
            @click="findCandidates(job._id)"
          >
            <span class="mr-2">Visualizar Candidatos</span>
            <v-icon dark small> mdi-eye-settings </v-icon>
          </v-btn>
          <v-btn
            x-large
            block
            class="white--text"
            :color="job.done ? 'indigo' : 'red'"
            v-if="company && company.hasOwnProperty('companyId')"
            @click="changeJobDone(!job.done)"
            >{{ job.done ? "Reabrir vaga" : "Encerrar vaga" }}</v-btn>
        </div>
      </article>
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="headline red--text">Atenção</v-card-title>
          <v-card-text>
            Está vaga possui
            <strong>exame automatico</strong>, deseja <strong>iniciar</strong> a
            candidatura agora ?.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" small text @click="dialog = false"
              >Agora não</v-btn
            >
            <v-btn
              color="green darken-1"
              class="white--text"
              @click="initExam()"
              >Começar!</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogCandidates" max-width="800">
        <v-card>
          <v-card-title class="headline indigo--text"
            >Candidatos a vaga</v-card-title
          >
          <article
            v-if="
              candidatesDetails &&
              candidatesDetails.details &&
              candidatesDetails.details.length > 0
            "
          >
            <v-card-text>
              <v-row
                v-for="candidate in candidatesDetails.details"
                :key="candidate.candidateId"
                style="
                  border: thin solid grey;
                  margin-bottom: 5px;
                  border-radius: 8px;
                "
              >
                <div
                  class="base approved"
                  v-if="
                    candidatesDetails.approved.indexOf(candidate.candidateId) !=
                    -1
                  "
                >
                  <small>Situação na vaga:</small><br />
                  APROVADO
                </div>

                <div
                  class="base repproved"
                  v-else-if="
                    candidatesDetails.repproved.indexOf(
                      candidate.candidateId
                    ) != -1
                  "
                >
                  <small>Situação na vaga:</small><br />
                  REPROVADO
                </div>
                <div class="base neutral" v-else>
                  <small>Situação na vaga:</small><br />
                  PENDENTE
                </div>
                <v-col>
                  <div class="ml-2 grey--text font-weight-bold">
                    Nome do candidato:
                  </div>
                  <div class="ml-2 text-justify pr-2">
                    {{
                      candidate.candidateName ? candidate.candidateName : "-"
                    }}
                  </div>
                </v-col>
                <v-col v-if="!job.examConfig || job.examConfig.length != 0">
                  <div class="ml-2 grey--text font-weight-bold">
                    Concluiu exame?:
                  </div>

                  <div class="ml-2 text-justify pr-2">
                    <v-chip
                      small
                      :color="candidate.doneAt ? 'green' : 'red'"
                      dark
                      >{{ candidate.doneAt ? "Sim" : "Não" }}</v-chip
                    >
                  </div>
                </v-col>
                <v-col v-if="!job.examConfig || job.examConfig.length != 0">
                  <div class="ml-2 grey--text font-weight-bold">
                    Data de inicio da candidatura:
                  </div>
                  <div class="ml-2 text-justify pr-2">
                    {{
                      candidate.startedAt
                        ? new Date(candidate.startedAt).toLocaleString()
                        : "-"
                    }}
                  </div>
                </v-col>
                <v-col v-if="!job.examConfig || job.examConfig.length != 0">
                  <div class="ml-2 grey--text font-weight-bold">
                    Data de conclusão do exame:
                  </div>
                  <div class="ml-2 text-justify pr-2">
                    {{
                      candidate.doneAt
                        ? new Date(candidate.doneAt).toLocaleString()
                        : "-"
                    }}
                  </div>
                </v-col>
                <v-col style="text-align: center" v-if="!job.examConfig || job.examConfig.length != 0">
                  <div class="ml-2 font-weight-bold">
                    <strong>Acertos</strong>
                  </div>
                  <div class="ml-2 pr-2">
                    <strong>{{
                      candidate.hitPercent ? candidate.hitPercent : "-"
                    }}</strong>
                  </div>
                  <div v-if="candidate.doneAt">
                    <v-chip
                      close-icon="mdi-close-outline"
                      color="yellow"
                      filter
                      link
                      label
                      pill
                      @click="openDetails(candidate)"
                    >
                      <v-icon>mdi-alert-octagon-outline</v-icon> Ver
                      detalhes</v-chip
                    >
                  </div>
                </v-col>
                <v-col
                  v-if="
                    candidatesDetails.approved.indexOf(candidate.candidateId) !=
                    -1
                  "
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <div class="ml-2 font-weight-bold black--text">
                    <strong>Contato:</strong>
                  </div>
                  <div class="ml-2 text-justify pr-2 weight-bold black--text">
                    <strong>{{
                      candidate.candidateEmail ? candidate.candidateEmail : "-"
                    }}</strong>
                  </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-btn
                    small
                    color="teal"
                    dark
                    block
                    outlined
                    @click="visualizeCurriculum(candidate)"
                    >Visualizar curriculum</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    small
                    color="red"
                    block
                    outlined
                    :disabled="
                      candidatesDetails.repproved.indexOf(
                        candidate.candidateId
                      ) != -1
                    "
                    @click="selectToDispenseCandidate(candidate)"
                    >Dispensar</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    small
                    color="green"
                    block
                    :disabled="
                      candidatesDetails.approved.indexOf(
                        candidate.candidateId
                      ) != -1
                    "
                    @click="selectCandidate(candidate)"
                    >Aprovar</v-btn
                  >
                </v-col>
                <v-divider />
              </v-row>
            </v-card-text>
          </article>
          <v-card-text v-else>Sem usúarios candidatados</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" dark @click="dialogCandidates = false"
              >Fechar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogAproveCandidate" max-width="400">
        <v-card>
          <v-card-title class="headline red--text">Atenção</v-card-title>
          <v-card-text>
            <article v-if="!aproveText">
              Deseja
              <strong class="green--text"
                >aprovar o candidato
                <span class="black--text">{{
                  selectedCandidate.candidateName
                }}</span></strong
              >?
            </article>
            <div v-else>
              E-mail de contato do
              <strong class="black--text">{{
                selectedCandidate.candidateName
              }}</strong
              >:
              <h2>
                <strong>{{ selectedCandidate.candidateEmail }}</strong>
              </h2>
              <div>
                <small class="mt-5"
                  >Fique a vontade para entrar em contato! já notificaremos o
                  candidato dos próximos passos!</small
                >
              </div>
            </div>
          </v-card-text>
          <v-card-actions v-if="!aproveText">
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              small
              text
              @click="dialogAproveCandidate = false"
              >Agora não</v-btn
            >
            <v-btn
              color="green darken-1"
              class="white--text"
              @click="approveCandidate()"
              >Sim!</v-btn
            >
          </v-card-actions>
          <v-card-actions v-else>
            <v-btn
              color="red darken-1"
              small
              text
              @click="dialogAproveCandidate = false"
              >Fechar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDispenseCandidate" persistent max-width="400">
        <v-card>
          <v-card-title class="headline red--text">Atenção</v-card-title>
          <v-card-text>
            Deseja
            <strong class="red--text"
              >reprovar o candidato
              <span class="black--text">{{
                selectedCandidate.candidateName
              }}</span></strong
            >?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              small
              text
              @click="dialogDispenseCandidate = false"
              >Agora não</v-btn
            >
            <v-btn
              color="green darken-1"
              class="white--text"
              @click="reproveCandidate()"
              >Sim!</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogCurriculum" persistent>
        <v-card>
          <v-card-title class="headline red--text">Curriculum</v-card-title>
          <v-card-text>
            <iframe
              style="width: 100%"
              height="900px"
              :src="curriculum"
            ></iframe>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              small
              text
              @click="dialogCurriculum = false"
              >Fechar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="examDetailsDialog" persistent>
        <v-card>
          <v-card-title class="headline grey--text"
            >Detalhes do exame de
            <span class="ml-2 black--text"
              ><strong>{{ selectedUser.candidateName }}:</strong></span
            ></v-card-title
          >
          <v-card-text>
            <v-row
              v-for="exam in  examDetails.filter(d => d.quantity)"
              :key="exam._id"
              style="box-shadow: 5px 4px 7px 1px #0000001a; margin-top: 16px;"
              :style="`border-left: 10px solid #${(
                (Math.random() * 0xffffff) <<
                0
              ).toString(16)};`"
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
  </v-container>
</template>
<script>
import { Jobs } from "@/services/jobs.js";
import { Users } from "@/services/users.js";
import { Exams } from "@/services/exams.js";
export default {
  props: {
    userData: Object,
    company: Object,
    mainControll: Object,
    alert: Object,
  },
  components: {},
  data: () => ({
    job: {},
    selectedUser: {},
    examDetailsDialog: false,
    examDetails: [],
    dialog: false,
    activeLoading: true,
    dialogCandidates: false,
    dialogAproveCandidate: false,
    dialogCurriculum: false,
    dialogDispenseCandidate: false,
    candidatesDetails: {},
    selectedCandidate: {},
    curriculum: undefined,
    aproveText: false,
  }),
  async mounted() {
    console.log("ROUTER");
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
        this.job = {};
        this.activeLoading = false;
        console.log(err);
      });
  },
  methods: {
    changeJobDone(action) {
      const job = new Jobs();
      this.mainControll.globalLoading = true;
      job
        .changeJobDone(this.job._id, action)
        .then((resp) => {
          this.mainControll.globalLoading = false;
          this.showSuccessSnackBar(
            action
              ? "Vaga encerrada com sucesso!"
              : "Vaga reaberta para o mercado!"
          );
          this.job.done = action;
        })
        .catch((err) => {
          this.mainControll.globalLoading = false;
          this.showInvalidSnackBar(err.response.data["message"]);
          console.log(err);
        });
    },
    showInvalidSnackBar(message) {
      this.mainControll.alert.color = "red";
      this.mainControll.alert.text = message;
      this.mainControll.alert.show = true;
    },
    showSuccessSnackBar(message) {
      this.mainControll.alert.color = "green";
      this.mainControll.alert.text = message;
      this.mainControll.alert.show = true;
    },
    selectCandidate(candidate) {
      this.aproveText = false;
      this.selectedCandidate = candidate;
      this.dialogAproveCandidate = true;
    },
    approveCandidate() {
      const job = new Jobs();
      this.mainControll.globalLoading = true;

      job
        .approveCandidateToJob(this.job._id, this.selectedCandidate.candidateId)
        .then(async (resp) => {
          await this.findCandidates(this.job._id);
          this.mainControll.globalLoading = false;
          this.showSuccessSnackBar(
            `Candidato ${this.selectedCandidate.candidateName} aprovado!`
          );
          this.aproveText = true;
        })
        .catch((err) => {
          this.mainControll.globalLoading = false;
          console.error(err.response.data.message);
          this.showInvalidSnackBar(err.response.data.message);
        });
    },
    reproveCandidate() {
      const job = new Jobs();
      this.mainControll.globalLoading = true;

      job
        .repproveCandidateToJob(
          this.job._id,
          this.selectedCandidate.candidateId
        )
        .then(async (resp) => {
          await this.findCandidates(this.job._id);
          this.dialogDispenseCandidate = false;
          this.mainControll.globalLoading = false;
          this.showSuccessSnackBar(
            `Candidato ${this.selectedCandidate.candidateName} reprovado!`
          );
          this.aproveText = true;
        })
        .catch((err) => {
          this.dialogDispenseCandidate = false;
          this.mainControll.globalLoading = false;
          console.error(err.response.data.message);
          this.showInvalidSnackBar(err.response.data.message);
        });
    },
    selectToDispenseCandidate(candidate) {
      this.selectedCandidate = candidate;
      this.dialogDispenseCandidate = true;
    },
    visualizeCurriculum(candidate) {
      const service = new Users();
      this.mainControll.globalLoading = true;
      service
        .findUserById(candidate.candidateId)
        .then((resp) => {
          if (resp.data && resp.data.curriculum) {
            this.mainControll.globalLoading = false;
            this.curriculum = `data:application/pdf;base64,${resp.data.curriculum}`;
            this.dialogCurriculum = true;
          } else {
            this.mainControll.globalLoading = false;
            this.showInvalidSnackBar(
              "Candidato não possui curriculum cadastrado"
            );
          }
        })
        .catch((err) => {
          this.mainControll.globalLoading = false;
          console.error(err);
          this.showInvalidSnackBar("Não foi possível visualizar curriculo");
          this.dialogCurriculum = false;
        });
    },
    findCandidates(jobId) {
      const job = new Jobs();
      this.mainControll.globalLoading = true;
      job
        .getCandidatesInJob(jobId)
        .then((resp) => {
          this.candidatesDetails = resp.data;
          this.dialogCandidates = true;
          this.mainControll.globalLoading = false;
        })
        .catch((err) => {
          this.candidatesDetails = {};
          this.mainControll.globalLoading = false;
          console.error(err);
          this.showInvalidSnackBar(
            "Não foi possível visualizar detalhes dos candidatos"
          );
        });
    },
    pushToExame() {
      const id = this.job._id;
      const userId = this.mainControll.userData.userId;

      this.$router.push(`/jobs/${id}/exams/users/${userId}`);
    },
    async initExam() {
      const job = new Jobs();
      this.mainControll.globalLoading = true;

      const id = this.job._id;
      const userId = this.mainControll.userData.userId;

      await job
        .candidateUserToJob(id, userId)
        .then((resp) => {
          this.mainControll.globalLoading = false;
          this.dialog = false;
          if (resp.status == 200) {
            this.pushToExame();
          } else {
            this.showInvalidSnackBar(resp.data["message"]);
          }
          this.dialog = false;
        })
        .catch((err) => {
          this.dialog = false;
          this.mainControll.globalLoading = false;
          console.error(err);
          this.showInvalidSnackBar(err.response.data["message"]);
        });
    },
    async candidateUserToJob() {
      if (this.job.examConfig.length > 0) {
        this.dialog = true;
      } else {
        const job = new Jobs();
        this.mainControll.globalLoading = true;

        const id = this.job._id;
        const userId = this.mainControll.userData.userId;

        await job
          .candidateUserToJob(id, userId)
          .then((resp) => {
            this.mainControll.globalLoading = false;
            if (resp.status == 200) {
              this.job.cadidateUsers.push(userId)
              this.showSuccessSnackBar("Candidatado com sucesso a vaga!");
            } else if (resp.data["message"]) {
              this.showInvalidSnackBar(resp.data["message"]);
            } else {
              this.showInvalidSnackBar(
                "Não foi possível candidatar a vaga. Nossa equipe entrará em contato"
              );
            }
          })
          .catch((err) => {
            this.mainControll.globalLoading = false;
            console.error(err);
            if (err.response.data["message"]) {
              this.showInvalidSnackBar(err.response.data["message"]);
            } else {
              this.showInvalidSnackBar(
                "Não foi possível candidatar a vaga. Nossa equipe entrará em contato"
              );
            }
          });
      }
    },
    async openDetails(candidate) {
      const exams = new Exams();
      const id = this.job._id;
      this.selectedUser = candidate;
      this.mainControll.globalLoading = true;
      await exams
        .detailsOfExamUser(id, candidate.candidateId)
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
  },
  watch: {
    dialog: function (newVal, oldVal) {
      // this.selected = {};
    },
    dialogCandidates: function (newVal, oldVal) {},
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
  padding: 0px 0px 1px 10px;
}
.jobWrapper {
  border-radius: 0px 0px 4px 4px;
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

.box-btns {
  padding: 8px 12px;

}

.box-btns button + button {
  margin: 8px 0;
}
</style>