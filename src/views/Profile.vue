<template>
  <v-app class="about">
    <v-container style="z-index: 2">
      <v-card
        class="mx-auto"
        v-if="
          userData &&
          userData.hasOwnProperty('userId') &&
          company &&
          !company.hasOwnProperty('companyId')
        "
      >
        <v-card-text>
          <div>Alteração de dados do perfil</div>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.name"
                clearable
                label="Nome"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.email"
                clearable
                label="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="user.cpf"
                clearable
                label="cpf"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="user.gender"
                :items="genderOptions"
                item-text="name"
                item-value="_id"
                :menu-props="{ bottom: true, offsetY: true }"
                label="Sexo"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-textarea
                label="Descrição do perfil"
                rows="1"
                clearable
                :auto-grow="true"
                :value="user.description"
                v-model="user.description"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-divider />
          <v-row>
            <v-col cols="12" sm="12d" md="6">
              <v-file-input
                counter-size-string
                clearable
                multiple
                @change="uploadFile"
                accept="application/pdf"
                label="Clique para fazer Upload Curriculo"
              ></v-file-input>
              <v-btn
                v-if="userData.curriculum"
                :loading="loadingButton"
                block
                class="white--text"
                color="indigo accent-4"
                @click="loadCurriculum"
                >Visualizar curriculum salvo</v-btn
              >
            </v-col>
            <v-col cols="12" sm="12" md="12" v-if="pathFile">
              <iframe
                style="width: 100%"
                height="500px"
                :src="pathFile"
              ></iframe>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            class="white--text"
            color="green accent-4"
            @click="saveChanges()"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>

      <v-card class="mx-auto" v-else>
        <v-card-text>
          <div>Alteração de dados da empresa</div>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="companyData.name"
                clearable
                label="Nome da Empresa"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="companyData.email"
                clearable
                label="Email da empresa"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="companyData.cnpj"
                clearable
                label="CNPJ"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-textarea
                label="Descrição da empresa"
                rows="1"
                clearable
                :auto-grow="true"
                :value="companyData.description"
                v-model="companyData.description"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="companyData.plan"
                :items="mainControll.plans"
                item-text="name"
                item-value="_id"
                :menu-props="{ bottom: true, offsetY: true }"
                label="Plano"
                hint="Todos planos tem 7 dias gratis para teste!"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            class="white--text"
            color="green accent-4"
            @click="saveCompanyChanges()"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
import Menu from "@/components/Menu.vue";
import { Users } from "@/services/users.js";
import { Companies } from "@/services/companies.js";
export default {
  props: {
    userData: Object,
    dashInfo: Object,
    alert: Object,
    mainControll: Object,
    company: Object,
  },
  components: {
    Menu: Menu,
  },
  data: () => ({
    user: {},
    companyData: {},
    pathFile: undefined,
    file: undefined,
    loadingButton: false,
    genderOptions: [
      { _id: "Male", name: "Masculino" },
      { _id: "Female", name: "Feminino" },
    ],
    menu: false,
  }),
  methods: {
    uploadFile($event) {
      if ($event && $event.length > 0) {
        this.file = $event[0];
        this.pathFile = URL.createObjectURL($event[0]);
      }
    },
    async loadCurriculum() {
      const userApi = new Users();
      this.loadingButton = true;
      await userApi
        .findUserById(this.userData.userId)
        .then((success) => {
          this.loadingButton = false;
          this.pathFile = `data:application/pdf;base64,${success.data.curriculum}`;
        })
        .catch((err) => {
          this.alert.collor = "red darken-4";
          this.alert.icon = "alert-circle";
          this.alert.message = "Ocorreu algum erro ao buscar curriculum";
          this.loadingButton = false;
        });
    },
    async saveChanges() {
      console.log("SALVANDO DADOS USUARIO");
      const userApi = new Users();
      if (this.file) {
        await userApi
          .sendCurriculum(this.userData.userId, this.file)
          .then((success) => {
            debugger;
          })
          .catch((err) => {
            debugger;
          });
      }
      this.mainControll.globalLoading = true;
      delete this.user.curriculum;
      await userApi
        .editUSer(this.userData.userId, this.user)
        .then((success) => {
          this.alert.show = true;
          this.alert.collor = "green";
          this.alert.icon = "check";
          this.alert.message = "Alterações realizadas com sucesso";
          console.log(success);
          this.userData.name = success.data.name;
          this.userData.gender = success.data.gender;
          this.userData.email = success.data.email;
          this.userData.cpf = success.data.cpf;
          debugger;
          this.userData.description = success.data.description;
          this.userData.curriculum = success.data.curriculum ? true : false;
          this.user = Object.assign({}, this.userData);
          this.mainControll.globalLoading = false;
        })
        .catch((err) => {
          this.mainControll.globalLoading = false;
          this.alert.show = true;
          this.alert.collor = "red darken-4";
          this.alert.icon = "alert-circle";
          this.alert.message = "Ocorreu algum erro ao alterar os dados";
        });
    },
    async saveCompanyChanges() {
      console.log("SALVANDO ALTERAÇÕES DA EMPRESA");
      const service = new Companies();
      this.mainControll.globalLoading = true;

      await service
        .edit(this.company.companyId, this.companyData)
        .then((success) => {
          this.alert.show = true;
          this.alert.collor = "green";
          this.alert.icon = "check";
          this.alert.message = "Alterações realizadas com sucesso";
          console.log(success);
          this.company.name = success.data.name;
          this.company.email = success.data.email;
          this.company.cnpj = success.data.cnpj;
          this.company.plan = success.data.plan;
          this.company.description = success.data.description;
          this.companyData = Object.assign({}, this.company);
          this.mainControll.globalLoading = false;
        })
        .catch((err) => {
          this.mainControll.globalLoading = false;
          this.alert.show = true;
          this.alert.collor = "red darken-4";
          this.alert.icon = "alert-circle";
          this.alert.message = "Ocorreu algum erro ao alterar os dados";
        });
    },
  },
  created() {
    this.user = Object.assign({}, this.userData);
    this.companyData = Object.assign({}, this.company);
  },
};
</script>
<style scoped>
.wrapper {
  z-index: 1;
}
</style>