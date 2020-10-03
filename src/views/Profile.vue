<template>
  <v-app class="about">
    <v-container style="z-index: 2">
      <v-card
        class="mx-auto"
        v-if="userData && userData.hasOwnProperty('profiles')"
      >
        <v-form ref="userForm" v-model="userForm">
          <v-card-text>
            <div>Alteração de dados do perfil</div>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.name"
                  clearable
                  label="Nome"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.email"
                  clearable
                  label="email"
                  :disabled="true"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.cpf"
                  clearable
                  label="CPF"
                  :rules="cpfRules"
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
                  :rules="descRules"
                  :counter="50"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-divider />
            <v-row v-if="userData.profiles.indexOf('CANDIDATE') != -1">
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
        </v-form>
      </v-card>

      <v-card class="mx-auto" v-else>
        <v-card-text>
          <div>Alteração de dados da empresa</div>
          <v-form ref="companyForm" v-model="companyForm">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="companyData.name"
                  clearable
                  label="Nome da Empresa"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="companyData.email"
                  clearable
                  label="Email da empresa"
                  :rules="emailRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="companyData.cnpj"
                  clearable
                  label="CNPJ"
                  :disabled="true"
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
                  :counter="50"
                  :rules="descriptionRules"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                 <v-select
                    v-model="companyData.plan"
                    class="mt-4 custom-v-select"
                    :items="mainControll.plans"
                    item-value="_id"
                    item-text="name"
                    no-data-text="Sem dados de empresa"
                    label="Plano"
                    hint="Todos planos tem 7 dias gratis para teste!"
                    persistent-hint
                  >
                    <template slot="selection" slot-scope="data">
                      <strong class="ml-2">{{ data.item.name }}</strong>
                    </template>
                    <template slot="item" slot-scope="data">
                      <div>
                        <div class="text--grey font-weight-bold">
                          <v-icon color="teal darken-2" class="mr-4">
                            mdi-handshake
                          </v-icon>
                          <strong>{{ data.item.name }}</strong>
                        </div>
                        <small style="color: grey">{{
                          data.item.description
                        }}</small>
                      </div>
                    </template>
                  </v-select>
              </v-col>
            </v-row>
          </v-form>
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
      { _id: "Undefined", name: "Indefinido" },
    ],
    menu: false,
    companyForm: false,
    userForm: false,
    cpfRules: [
      (cpf) => {
        let sum, rest;

        if (!cpf || cpf.trim().length === 0) {
          return true;
        }

        if (cpf === "00000000000") {
          return "CPF Inválido";
        }
        cpf = cpf.replace(".", "").replace(".", "").replace("-", "");

        sum = 0;
        for (let i = 1; i <= 9; i++) {
          sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) {
          rest = 0;
        }
        if (rest !== parseInt(cpf.substring(9, 10))) {
          return "CPF Inválido";
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
          sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) {
          rest = 0;
        }
        if (rest !== parseInt(cpf.substring(10, 11))) {
          return "CPF Inválido";
        }
        return true;
      },
    ],
    descriptionRules: [
      (value) => !!value || "Descrição da empresa é um campo obrigatório",
      (v) => v.length <= 50 || "Campo descrição no máximo 50 caracteres",

      //   (v) => v.length >= 8 || "Min de 8 caracteres",
      //   () => "The email and password you entered don't match",
    ],
    cnpjRules: [
      (v) => {
        if (!v) return "CNPJ é Obrigatório";
        let cnpj = v.replace(/[^\d]+/g, "");

        if (cnpj == "") return "CNPJ Inválido";

        if (cnpj.length != 14) return "CNPJ Inválido";

        // Elimina CNPJs invalidos conhecidos
        if (
          cnpj == "00000000000000" ||
          cnpj == "11111111111111" ||
          cnpj == "22222222222222" ||
          cnpj == "33333333333333" ||
          cnpj == "44444444444444" ||
          cnpj == "55555555555555" ||
          cnpj == "66666666666666" ||
          cnpj == "77777777777777" ||
          cnpj == "88888888888888" ||
          cnpj == "99999999999999"
        )
          return "CNPJ Inválido";

        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) return "CNPJ Inválido";

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1)) return "CNPJ Inválido";

        return true;
      },
    ],
    nameRules: [
      (v) => !!v || "Campo Nome é obrigatório",
      //   (v) => (v && v.length <= 10) || "N",
    ],
    planRules: [
      (v) => !!v || "Plano é obrigatório",
      //   (v) => (v && v.length <= 10) || "N",
    ],
    passwordRules: [
      (value) => !!value || "Password é obrigatório",
      //   (v) => v.length >= 8 || "Min de 8 caracteres",
      //   () => "The email and password you entered don't match",
    ],
    descriptionRules: [
      (value) => !!value || "Descrição da empresa é um campo obrigatório",
      (v) => (v && v.length <= 50) || "Campo descrição no máximo 50 caracteres",
      //   (v) => v.length >= 8 || "Min de 8 caracteres",
      //   () => "The email and password you entered don't match",
    ],
    locationRules: [
      (value) => !!value || "Localização da empresa é um campo obrigatório",
      //   (v) => v.length >= 8 || "Min de 8 caracteres",
      //   () => "The email and password you entered don't match",
    ],
    emailRules: [
      (v) => !!v || "E-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
    ],
    formValid: false,
    descRules: [
      (v) => (v && v.length <= 50) || "Campo descrição no máximo 50 caracteres",
    ],
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
      if (this.$refs.userForm.validate()) {
        const userApi = new Users();
        if (this.file) {
          await userApi
            .sendCurriculum(this.userData.userId, this.file)
            .then((success) => {
              this.showSuccessSnackBar("Curriculo atualizado com sucesso");
            })
            .catch((err) => {
              this.showInvalidSnackBar("Não foi possível enviar curriculo");
              console.error(err);
            });
        }
        this.mainControll.globalLoading = true;
        delete this.user.curriculum;
        await userApi
          .editUSer(this.userData.userId, this.user)
          .then((success) => {
            this.showSuccessSnackBar("Dados alterados com sucesso");
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
            this.showInvalidSnackBar("Ocorreu algum erro ao alterar os dados");
          });
      }
    },
    async saveCompanyChanges() {
      console.log("SALVANDO ALTERAÇÕES DA EMPRESA");
      if (this.$refs.companyForm.validate()) {
        const service = new Companies();
        this.mainControll.globalLoading = true;

        await service
          .edit(this.company.companyId, this.companyData)
          .then((success) => {
            this.showSuccessSnackBar("Dados alterados com sucesso");
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
            this.showInvalidSnackBar("Ocorreu algum erro ao alterar os dados");
          });
      }
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