<template>
  <v-app class="about">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12">
          <v-card elevation="4" class="mx-auto mx-auto mt-2" style="box-shadow: unset !important">
            <v-row justify="space-around" style="box-shadow: 0 0 4px rgba(0,0,0,0.2); margin: 0">
              <v-col>
                <div class="ml-4 mt-2 mb-2 font-weight-bold h1">
                  Candidaturas Recentes
                </div>
              </v-col>
              <v-col class="text-center h1">
                <div class="ml-4 mt-2 mb-2 font-weight-bold h1">
                  Vagas candidatadas:
                </div>
                <h2>{{ dashInfo.totalJobsSubscribe }}</h2>
              </v-col>
            </v-row>

            <v-list-item v-for="job in dashInfo.jobs" :key="job.id" three-line class="card-job">
              <v-list-item-content style="padding: 0">
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="12" sm="12" md="12">
                      <div class="base approved" v-if="job.approved">
                        <small>Situação na vaga:</small><br />
                        APROVADO
                        <div>
                          <small
                            >Em breve a empresa entrará em contato via
                            e-mail!</small
                          >
                        </div>
                      </div>
                      <div class="base repproved" v-else-if="job.repproved">
                        <small>Situação na vaga:</small><br />
                        REPROVADO
                      </div>
                      <div class="base neutral" v-else><small>Situação na vaga:</small><br />PENDENTE</div>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <div
                        class="mb-0 font-weight-black"
                        style="color: #025891"
                      >
                        {{ job.title }}
                      </div>
                      <span v-for="skill in job.requiredSkills" :key="skill">
                        <v-chip
                          style="height: 15px; font-size: 10px"
                          class="ma-1 font-wight-black font-weight-black"
                          small
                          outlined
                          :color="`#${(
                            (Math.random() * 0xffffff) <<
                            0
                          ).toString(16)}`"
                          label
                          >{{ skill }}</v-chip
                        >
                      </span>
                    </v-col>

                    <v-col cols="6" sm="6" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black"
                          >Inscrição</v-list-item-subtitle
                        >
                        <span
                          v-if="job.exam && job.exam.startedAt"
                          class="caption"
                          >{{
                            new Date(job.exam.startedAt).toLocaleDateString()
                          }}</span
                        >
                        <span v-else class="caption">-</span>
                      </div>
                    </v-col>
                    <v-col cols="6" sm="6" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black"
                          >Conclusão</v-list-item-subtitle
                        >
                        <span
                          v-if="job.exam && job.exam.doneAt"
                          class="caption"
                          >{{
                            new Date(job.exam.doneAt).toLocaleDateString()
                          }}</span
                        >
                        <span v-else class="caption">-</span>
                      </div>
                    </v-col>
                    <v-col cols="6" sm="12" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black"
                          >Acertos</v-list-item-subtitle
                        >
                        <span class="mt-2">{{
                          job.exam ? job.exam.hitPercent : ""
                        }}</span>
                      </div>
                    </v-col>
                  </v-row>
                  <v-card-actions class="mt-5 mb-0 pb-0">
                    <v-row>
                      <v-col>
                        <v-btn
                          small
                          dark
                          block
                          outlined
                          color="cyan darken-3"
                          @click="$router.push('/jobs/' + job._id)"
                          >Visualizar</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-container>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import Menu from "@/components/Menu.vue";
export default {
  props: {
    userData: Object,
    dashInfo: Object,
  },
  components: {
    Menu: Menu,
  },
  data: () => ({}),
};
</script>
<style scoped>
.wrapper {
  z-index: 1;
}
.base {
  text-align: center;
  width: 100%;
  font-weight: bold;
  padding: 2px;
  border-radius: 4px;
  margin-bottom: 8px;
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

.card-job {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}

.card-job {
  margin: 16px 0;
}
</style>