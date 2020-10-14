<template>
  <v-app class="about">
    <v-container>
      <v-row no-gutters v-if="dashInfo && dashInfo.hasOwnProperty('jobs')">
        <v-col cols="12" sm="12" md="12">
          <v-card elevation="4" class="mx-auto mx-auto mt-2" outlined>
            <div class="ml-4 mt-2 mb-2 font-weight-italic h1">
              Vagas da empresa <strong>{{ mainControll.company.name }} </strong>
            </div>
            <v-list-item v-for="job in dashInfo.jobs" :key="job._id" three-line>
              <v-list-item-content style="padding: 0">
                <v-divider />
                <v-container
                  :style="`background-color: ${job.done ? '#ffe7e7' : ''} `"
                >
                  <v-row no-gutters>
                    <v-col cols="12" sm="12" md="4">
                      <div
                        class="mb-0 font-weight-medium"
                        style="color: #025891"
                      >
                        {{ job.title }}
                      </div>
                      <span v-for="skill in job.requiredSkills" :key="`${skill}_${job._id}`">
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
                    <v-col cols="12" md="2" sm="12">
                      <v-btn
                        v-if="job.done"
                        class="ma-1 font-wight-black font-weight-black"
                        outlined
                        block
                        small
                        color="indigo"
                        label
                        >ENCERRADO!</v-btn
                      >
                    </v-col>

                    <v-col cols="12" sm="12" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle
                          >Total de candidatos</v-list-item-subtitle
                        >
                        <span v-if="job.cadidateUsers" class="">{{
                          job.cadidateUsers
                        }}</span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black"
                          >Concluido Exames</v-list-item-subtitle
                        >
                        <span class="">{{ job.candidateDoneExam }}</span>
                      </div>
                    </v-col>
                    <!-- <v-col cols="12" sm="12" md="2">
                      <div class="mb-0 mt-2 font-weight-medium text-center">
                        <v-list-item-subtitle class="font-weight-black"
                          >Visualizações</v-list-item-subtitle
                        >
                        <span class="">{{ job.usersWhoViewed }}</span>
                      </div>
                    </v-col> -->
                  </v-row>
                  <v-card-actions class="mt-5 mb-0 pb-0">
                    <v-btn
                      small
                      dark
                      block
                      color="cyan darken-4"
                      @click="$router.push('/jobs/' + job._id)"
                      >Visualizar</v-btn
                    >
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
    mainControll: Object,
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