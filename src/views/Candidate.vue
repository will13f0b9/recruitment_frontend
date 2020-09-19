<template>
  <v-app class="about">
    <Menu :name="userData.name" :description="userData.description"></Menu>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="8">
          <v-card elevation="4" class="mx-auto mx-auto mt-2" outlined>
            <div class="ml-4 mt-2 mb-2 font-weight-black">Candidatura Recentes</div>
            <v-list-item v-for="job in dashInfo.jobs" :key="job" three-line>
              <v-list-item-content style="padding: 0;">
                <v-divider />
                <v-container :style="`background-color: ${!job.exam || !job.exam.doneAt ? '#ffe7e7' : ''} `">
                  <v-row no-gutters>
                    <v-col cols="12" sm="12" md="6">
                      <div class="mb-0 font-weight-medium">{{job.title}}</div>
                      <span v-for="skill in job.requiredSkills" :key="skill">
                        <v-chip
                          style="height: 15px; font-size: 10px"
                          class="ma-1 font-wight-black"
                          small
                          :color="`#${((Math.random() * 0xffffff) <<0).toString(16)}`"
                          label
                        >{{skill}}</v-chip>
                      </span>
                    </v-col>
                    
                    <v-col cols="6" sm="12" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle>Inscrição</v-list-item-subtitle>
                        <span v-if="job.exam && job.exam.startedAt" class="caption">{{new Date(job.exam.startedAt).toLocaleDateString()}}</span>
                        <span v-else class="caption"> - </span>
                      </div>
                    </v-col>
                    <v-col cols="6" sm="12" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black">Conclusão</v-list-item-subtitle>
                        <span v-if="job.exam && job.exam.doneAt" class="caption">{{new Date(job.exam.doneAt).toLocaleDateString()}}</span>
                        <span v-else class="caption"> - </span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black">Acertos</v-list-item-subtitle>
                        <span class="mt-2">
                          {{job.exam ? job.exam.hitPercent : ""}}
                        </span>
                        
                      </div>
                    </v-col>
                  </v-row>
                  <v-card-actions class="mt-5 mb-0 pb-0">
                    <v-btn text small color="cyan darken-4">Visualizar</v-btn>
                    <v-btn
                      color="green"
                      solid
                      small
                      v-if="!job.exam || !job.exam.doneAt"
                    >Concluir</v-btn>
                  </v-card-actions>
                </v-container>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-card elevation="4" class="mx-auto mt-2" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-2">Vagas Candidatadas</div>
                <v-list-item-title class="mb-1 text-h4">{{dashInfo.totalJobsSubscribe}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn outlined color="yellow darken-4" text>Visualizar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import Menu from "@/components/Menu.vue";
export default {
  components: {
    Menu: Menu,
  },
  data: () => ({
    userData: {
      name: "André Golnçalvez",
      description: "Desenvolvedor React Native",
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
  }),
};
</script>
<style scoped>
.wrapper {
  z-index: 1;
}
</style>