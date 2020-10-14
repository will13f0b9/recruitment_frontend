<template>
  <v-row align="center" justify="center">
    <v-dialog v-model="mainControll.showLoginDialog" max-width="900">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="cyan dark-"
          class="elevation-2"
          dark
          :centered="centered"
          :vertical="false"
          :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
          :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
          :icons-and-text="true"
        >
          <v-tabs-slider
            style="height: 5px;!important"
            class="orange"
          ></v-tabs-slider>

          <v-tab v-for="i in tabs" :key="`tab_${i.id}`">
            {{ i.title }}
            <v-icon v-if="i.icon">{{ i.icon }}</v-icon>
          </v-tab>

          <v-tab-item v-for="i in tabs" :key="`content_${i.id}`" class="pa-5">
            <h1 class="grey--text">
              {{ i.title }}
              {{
                i.id == "register" && registerForm.companyForm
                  ? "de Empresa"
                  : i.id == "login" && loginForm.companyForm
                  ? "de Empresa"
                  : "de Pessoa"
              }}
            </h1>
            <v-card flat tile v-if="i.id === 'login'">
              <v-switch
                v-model="loginForm.companyForm"
                color="yellow darken-4"
                class="font-weight-bold"
                label="Para Empresa ?"
              ></v-switch>
              <v-card-text>
                <v-form
                  ref="formLoginUser"
                  v-if="!loginForm.companyForm"
                  v-model="loginForm.valid"
                >
                  <v-text-field
                    v-model="loginForm.email"
                    label="E-mail"
                    :rules="emailRules"
                    clearable
                    required
                  ></v-text-field>

                  <v-text-field
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-2"
                    label="Password"
                    clearable
                    value=""
                    v-model="loginForm.password"
                    class="input-group--focused"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>

                  <div
                    class="cyan--text"
                    style="
                      cursor: pointer;
                      cursor: pointer;
                      font-weight: bold;
                      text-decoration: underline;
                    "
                    @click="openResetPassword('email')"
                  >
                    Recuperar senha
                  </div>

                  <v-btn
                    color="error"
                    outlined
                    small
                    class="mt-4 mr-4"
                    @click="
                      mainControll.showLoginDialog = !mainControll.showLoginDialog
                    "
                  >
                    Cancelar
                  </v-btn>

                  <v-btn
                    color="teal"
                    solid
                    dark
                    small
                    class="mt-4"
                    @click="logIn"
                  >
                    Logar
                  </v-btn>
                </v-form>
                <v-form
                  ref="formLoginCompany"
                  v-if="loginForm.companyForm"
                  v-model="loginForm.valid"
                >
                  <v-text-field
                    v-model="loginForm.cnpj"
                    :rules="cnpjRules"
                    label="CNPJ"
                    clearable
                    required
                    v-mask="'##.###.###/####-##'"
                  ></v-text-field>

                  <v-text-field
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-2"
                    label="Password"
                    clearable
                    value=""
                    v-model="loginForm.password"
                    class="input-group--focused"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>

                  <div
                    class="cyan--text"
                    style="
                      cursor: pointer;
                      cursor: pointer;
                      font-weight: bold;
                      text-decoration: underline;
                    "
                    @click="openResetPassword('cnpj')"
                  >
                    Recuperar senha
                  </div>

                  <v-btn
                    color="error"
                    outlined
                    small
                    class="mt-4 mr-4"
                    @click="
                      mainControll.showLoginDialog = !mainControll.showLoginDialog
                    "
                  >
                    Cancelar
                  </v-btn>

                  <v-btn
                    color="teal"
                    solid
                    dark
                    small
                    class="mt-4"
                    @click="logIn"
                  >
                    Logar
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
            <v-card flat tile v-else-if="i.id === 'register'">
              <v-switch
                v-model="registerForm.companyForm"
                color="yellow darken-4"
                class="font-weight-bold"
                label="Para Empresa ?"
              ></v-switch>
              <v-card-text>
                <v-form
                  ref="formRegisterUser"
                  v-if="!registerForm.companyForm"
                  v-model="valid"
                >
                  <v-text-field
                    v-model="registerForm.userName"
                    :rules="nameRules"
                    label="Nome"
                    clearable
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="registerForm.cpf"
                    label="CPF"
                    clearable
                    :rules="cpfRules"
                    required
                    v-mask="'###.###.###-##'"
                  ></v-text-field>

                  <v-text-field
                    v-model="registerForm.email"
                    :rules="emailRules"
                    label="E-mail"
                    clearable
                  ></v-text-field>

                  <v-select
                    v-model="registerForm.gender"
                    :items="genderOptions"
                    item-text="name"
                    item-value="_id"
                    :menu-props="{ bottom: true, offsetY: true }"
                    label="Sexo"
                  ></v-select>

                  <v-text-field
                    v-model="registerForm.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-2"
                    label="Cadastrar senha"
                    clearable
                    value=""
                    class="input-group--focused"
                    required
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>

                  <v-btn
                    color="error"
                    outlined
                    small
                    class="mt-4 mr-4"
                    @click="
                      mainControll.showLoginDialog = !mainControll.showLoginDialog
                    "
                  >
                    Cancelar
                  </v-btn>

                  <v-btn
                    color="teal"
                    @click="createResource"
                    solid
                    small
                    dark
                    class="mt-4"
                  >
                    Cadastrar
                  </v-btn>
                </v-form>
                <v-form ref="formRegisterCompany" v-else v-model="valid">
                  <v-text-field
                    v-if="registerForm.companyForm"
                    v-model="registerForm.companyName"
                    :rules="nameRules"
                    label="Nome da empresa"
                    clearable
                    required
                  ></v-text-field>

                  <v-text-field
                    v-if="registerForm.companyForm"
                    v-model="registerForm.cnpj"
                    label="CNPJ"
                    :rules="cnpjRules"
                    clearable
                    required
                    v-mask="'##.###.###/####-##'"
                  ></v-text-field>

                  <v-text-field
                    v-if="registerForm.companyForm"
                    v-model="registerForm.location"
                    label="Endereço"
                    :rules="locationRules"
                    clearable
                    required
                  ></v-text-field>

                  <v-select
                    v-if="registerForm.companyForm"
                    v-model="registerForm.companyPlan"
                    class="mt-4 custom-v-select"
                    :items="mainControll.plans"
                    item-value="_id"
                    :rules="planRules"
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

                  <v-textarea
                    v-if="registerForm.companyForm"
                    label="Descrição da empresa"
                    rows="1"
                    clearable
                    :rules="descriptionRules"
                    :auto-grow="true"
                    counter="50"
                    v-model="registerForm.companyDescription"
                  ></v-textarea>

                  <v-text-field
                    v-model="registerForm.email"
                    :rules="emailRules"
                    label="E-mail"
                    clearable
                  ></v-text-field>

                  <v-text-field
                    v-model="registerForm.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-2"
                    label="Password"
                    clearable
                    value=""
                    class="input-group--focused"
                    required
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>

                  <v-btn
                    color="error"
                    outlined
                    small
                    class="mt-4 mr-4"
                    @click="
                      mainControll.showLoginDialog = !mainControll.showLoginDialog
                    "
                  >
                    Cancelar
                  </v-btn>

                  <v-btn
                    color="teal"
                    @click="createResource"
                    solid
                    small
                    dark
                    class="mt-4"
                  >
                    Cadastrar
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
    <v-dialog v-model="resetPasswordModal" persistent max-width="600">
      <v-card>
        <v-card-title class="headline grey--text"
          >Recuperar senha
          {{
            this.type == "cnpj"
              ? "da conta da sua empresa"
              : "da sua conta de usuário"
          }}</v-card-title
        >
        <v-card-text>
          <v-form ref="formResetPass">
            <v-text-field
              v-model="emailToReset"
              label="E-mail"
              :rules="emailRules"
              clearable
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            small
            text
            @click="resetPasswordModal = false"
            >Fechar</v-btn
          >
          <v-btn color="teal darken-1" small @click="resetPassword" dark
            >Resetar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { Users } from "@/services/users.js";
import { Companies } from "@/services/companies.js";
import RemoveSpecialCharacters from "@/util/remove-special-characters.js";

export default {
  props: {
    mainControll: Object,
  },
  data: () => ({
    type: "",
    emailToReset: "",
    resetPasswordModal: false,
    tab: null,
    centered: false,
    prevIcon: false,
    nextIcon: false,
    companyForm: false,
    tabs: [
      { title: "Login", id: "login", icon: "mdi-login-variant" },
      { title: "Cadastro", id: "register", icon: "mdi-account-plus" },
    ],
    showPassword: false,
    valid: true,
    genderOptions: [
      { _id: "Male", name: "Masculino" },
      { _id: "Female", name: "Feminino" },
      { _id: "Undefined", name: "Indefinido" },
    ],
    registerForm: {
      companyForm: false,
      valid: true,
      userName: "",
      gender: "",
      dateOfBirth: "",
      cpf: "",
      email: "",
      cnpj: "",
      password: "",
      companyName: "",
      companyDescription: "",
      userDescription: "",
      companyPlan: "",
      location: "",
    },
    loginForm: {
      companyForm: false,
      valid: true,
      email: "",
      cnpj: "",
      password: "",
    },
    descRules: [
      (v) => (v && v.length <= 50) || "Campo descrição no máximo 50 caracteres",
    ],
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
      (v) =>
        (!!v && v.length <= 50) || "Campo descrição no máximo 50 caracteres",

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
  }),
  watch: {
    "mainControll.showLoginDialog"(after, before) {
      if (after) {
        this.mainControll.registerTab ? (this.tab = 1) : (this.tab = 0);
      }
      if (this["$refs"]) {
        if (this.$refs.formLoginUser) {
          if (this.$refs.formLoginUser[0]) {
            this.$refs.formLoginUser[0].reset();
            this.$refs.formLoginUser[0].resetValidation();
          }
        }

        if (this.$refs.formLoginCompany) {
          if (this.$refs.formLoginCompany[0]) {
            this.$refs.formLoginCompany[0].reset();
            this.$refs.formLoginCompany[0].resetValidation();
          }
        }

        if (this.$refs.formRegisterUser) {
          if (this.$refs.formRegisterUser[0]) {
            this.$refs.formRegisterUser[0].reset();
            this.$refs.formRegisterUser[0].resetValidation();
          }
        }

        if (this.$refs.formRegisterCompany) {
          if (this.$refs.formRegisterCompany[0]) {
            this.$refs.formRegisterCompany[0].reset();
            this.$refs.formRegisterCompany[0].resetValidation();
          }
        }
      }
    },
  },
  methods: {
    async logIn() {
      const user = new Users();
      let data = { password: this.loginForm.password };
      if (this.loginForm.companyForm) {
        data["cnpj"] = RemoveSpecialCharacters(this.loginForm.cnpj);
      } else {
        data["email"] = this.loginForm.email;
      }

      const form = this.loginForm.companyForm
        ? this.$refs.formLoginCompany
        : this.$refs.formLoginUser;

      if (form[0].validate()) {
        this.mainControll.globalLoading = true;
        await user
          .authenticate(data)
          .then((success) => {
            this.mainControll.globalLoading = false;

            this.$session.start();
            debugger;
            if (!success.data.hasOwnProperty("companyId")) {
              this.mainControll.userData = success.data.userInfo;
              this.mainControll.dashInfo = success.data.dashInfo;
              this.$session.set("userData", success.data.userInfo);
              this.$session.set("dashInfo", success.data.dashInfo);
              const path =
                this.mainControll.userData.profiles.indexOf("CANDIDATE") != -1
                  ? "candidate"
                  : "recruiter";
              this.$router.push("/" + path);
            } else {
              this.mainControll.company = success.data;
              this.$session.set("company", success.data);
              this.$router.push("company");
            }

            this.mainControll.showLoginDialog = false;
          })
          .catch((err) => {
            try {
              this.showInvalidSnackBar(err.response.data.message);
            } catch (err) {
              console.error(err);
              this.showInvalidSnackBar(`Aconteceu algum erro inesperado`);
            }
            this.mainControll.userData = {};
            this.mainControll.dashInfo = {};
            this.mainControll.company = {};
            this.mainControll.globalLoading = false;
          });
      }
    },
    async createResource() {
      this.mainControll.globalLoading = true;

      const service = this.registerForm.companyForm
        ? new Companies()
        : new Users();
      const data = {};

      let canCreate = false;

      if (this.registerForm.companyForm) {
        if (this.registerForm.cnpj) {
          await service.findByCnpj(this.registerForm.cnpj).then((success) => {
            if (
              success.status == 200 &&
              success.data.items &&
              success.data.items.length == 0
            ) {
              canCreate = true;
            } else {
              this.showInvalidSnackBar("CNPJ informado já está cadastrado!");
            }
          });
        }

        data["cnpj"] = RemoveSpecialCharacters(this.registerForm.cnpj);
        data["name"] = this.registerForm.companyName;
        data["description"] = this.registerForm.companyDescription;
        data["email"] = this.registerForm.email;
        data["password"] = this.registerForm.password;
        data["plan"] = this.registerForm.companyPlan;
        data["location"] = this.registerForm.location;
      } else {
        if (this.registerForm.email) {
          await service
            .findUserByEmail(this.registerForm.email)
            .then((success) => {
              if (
                success.status == 200 &&
                success.data.items &&
                success.data.items.length == 0
              ) {
                canCreate = true;
              } else {
                this.showInvalidSnackBar("Email informado já está cadastrado!");
              }
            });
        }

        data["cpf"] = RemoveSpecialCharacters(this.registerForm.cpf);
        data["name"] = this.registerForm.userName;
        data["description"] = this.registerForm.userDescription;
        data["email"] = this.registerForm.email;
        data["password"] = this.registerForm.password;
        data["gender"] = this.registerForm.gender
          ? this.registerForm.gender
          : "Undefined";
        data["profiles"] = ["CANDIDATE"];
        data["dateOfBirth"] = this.registerForm.dateOfBirth;
      }

      const form = this.registerForm.companyForm
        ? this.$refs.formRegisterCompany
        : this.$refs.formRegisterUser;

      if (form[0].validate() && canCreate) {
        this.mainControll.globalLoading = true;
        await service
          .create(data)
          .then(async (success) => {
            const user = new Users();
            const authData = { password: this.registerForm.password };
            if (this.registerForm.companyForm) {
              authData["cnpj"] = RemoveSpecialCharacters(
                this.registerForm.cnpj
              );
            } else {
              authData["email"] = this.registerForm.email;
            }
            await user
              .authenticate(authData)
              .then((success) => {
                this.mainControll.globalLoading = false;

                this.$session.start();

                if (!success.data.hasOwnProperty("companyId")) {
                  this.mainControll.userData = success.data.userInfo;
                  this.mainControll.dashInfo = success.data.dashInfo;

                  this.$session.set("userData", success.data.userInfo);
                  this.$session.set("dashInfo", success.data.dashInfo);

                  const path =
                    this.mainControll.userData.profiles.indexOf("CANDIDATE") !=
                    -1
                      ? "candidate"
                      : "recruiter";
                  this.$router.push("/" + path);
                } else {
                  this.mainControll.company = success.data;
                  this.$session.set("company", success.data);
                  this.$router.push("/company");
                }

                this.mainControll.showLoginDialog = false;
              })
              .catch((err) => {
                try {
                  this.showInvalidSnackBar(err.response.data.message);
                } catch (err) {
                  console.error(err);
                  this.showInvalidSnackBar(`Aconteceu algum erro inesperado`);
                }
                this.mainControll.userData = {};
                this.mainControll.dashInfo = {};
                this.mainControll.company = {};
                this.mainControll.globalLoading = false;
              });
          })
          .catch((err) => {
            try {
              this.showInvalidSnackBar(err.response.data.message);
            } catch (err) {
              console.error(err);
              this.showInvalidSnackBar(`Aconteceu algum erro inesperado`);
            }
            this.mainControll.userData = {};
            this.mainControll.dashInfo = {};
            this.mainControll.company = {};
            this.mainControll.globalLoading = false;
          });
      } else {
        this.mainControll.globalLoading = false;
      }
    },
    openResetPassword(type) {
      this.type = type;
      this.emailToReset = "";
      this.resetPasswordModal = true;
    },
    showInvalidSnackBar(message) {
      this.mainControll.alert.color = "red";
      this.mainControll.alert.text = message;
      this.mainControll.alert.show = true;
    },
    showValidSnackBar(message) {
      this.mainControll.alert.color = "green";
      this.mainControll.alert.text = message;
      this.mainControll.alert.show = true;
    },
    resetPassword() {
      const userS = new Users();
      if (this.$refs.formResetPass.validate()) {
        this.mainControll.globalLoading = true;
        userS
          .resetPassowrd(this.emailToReset, this.type == "cnpj")
          .then((resp) => {
            this.mainControll.globalLoading = false;
            this.resetPasswordModal = false;
            if (resp.status == 200) {
              this.showValidSnackBar(resp.data.message);
            } else {
              this.showInvalidSnackBar(resp.data.message);
            }
          })
          .catch((err) => {
            this.mainControll.globalLoading = false;
            if (err.response && err.response.status == 404) {
              this.showInvalidSnackBar(err.response.message);
            } else {
              console.error(err);
              this.showInvalidSnackBar(
                "Não foi possível resetar sua senha! A nossa equipe entrará em contato!"
              );
            }
          });
      }
    },
  },
};
</script>

<style>
</style>