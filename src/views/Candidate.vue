<template>
  <v-app class="about">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12">
          <v-card elevation="4" class="mx-auto mx-auto mt-2" outlined>
            <v-row justify="space-around">
              <v-col>
                <div class="ml-4 mt-2 mb-2 font-weight-bold h1">Candidaturas Recentes</div>
              </v-col>
              <v-col class="text-center h1">
                <div class="ml-4 mt-2 mb-2 font-weight-bold h1">Vagas candidatadas:</div>
                <h2>{{dashInfo.totalJobsSubscribe}}</h2>
              </v-col>
            </v-row>

            <v-list-item v-for="job in dashInfo.jobs" :key="job.id" three-line>
              <v-list-item-content style="padding: 0;">
                <v-divider />
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="12" sm="12" md="6">
                      <div class="mb-0 font-weight-black" style="color: #025891;">{{job.title}}</div>
                      <span v-for="skill in job.requiredSkills" :key="skill">
                        <v-chip
                          style="height: 15px; font-size: 10px"
                          class="ma-1 font-wight-black font-weight-black"
                          small
                          outlined
                          :color="`#${((Math.random() * 0xffffff) <<0).toString(16)}`"
                          label
                        >{{skill}}</v-chip>
                      </span>
                    </v-col>

                    <v-col cols="6" sm="6" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black">Inscrição</v-list-item-subtitle>
                        <span
                          v-if="job.exam && job.exam.startedAt"
                          class="caption"
                        >{{new Date(job.exam.startedAt).toLocaleDateString()}}</span>
                        <span v-else class="caption">-</span>
                      </div>
                    </v-col>
                    <v-col cols="6" sm="6" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black">Conclusão</v-list-item-subtitle>
                        <span
                          v-if="job.exam && job.exam.doneAt"
                          class="caption"
                        >{{new Date(job.exam.doneAt).toLocaleDateString()}}</span>
                        <span v-else class="caption">-</span>
                      </div>
                    </v-col>
                    <v-col cols="6" sm="12" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black">Acertos</v-list-item-subtitle>
                        <span class="mt-2">{{job.exam ? job.exam.hitPercent : ""}}</span>
                      </div>
                    </v-col>
                  </v-row>
                  <v-card-actions class="mt-5 mb-0 pb-0">
                    <v-btn
                      small
                      dark
                      color="cyan darken-4"
                      @click="$router.push('/jobs/'+job._id)"
                    >Visualizar</v-btn>
                    <v-btn
                      color="green"
                      solid
                      small
                      @click="$router.push('/jobs/'+job._id+'?candidate=true')"
                      v-if="!job.exam || !job.exam.doneAt"
                      class="white--text"
                    >Concluir</v-btn>
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
</style>