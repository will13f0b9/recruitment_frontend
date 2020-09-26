<template>
  <v-row align="center" justify="center">
    <v-dialog v-model="mainControll.showLoginDialog" max-width="900">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="indigo accent-5"
          class="elevation-2"
          dark
          :centered="centered"
          :vertical="true"
          :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
          :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
          :icons-and-text="true"
        >
          <v-tabs-slider class="yellow"></v-tabs-slider>

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
                  : ""
              }}
            </h1>
            <v-card flat tile v-if="i.id === 'login'">
              <v-card-text>
                <v-form ref="formLogin" v-model="loginForm.valid">
                  <v-switch
                    v-model="loginForm.companyForm"
                    color="yellow darken-4"
                    class="font-weight-bold"
                    label="Para Empresa ?"
                  ></v-switch>

                  <v-text-field
                    v-if="!loginForm.companyForm"
                    v-model="loginForm.email"
                    :rules="emailRules"
                    label="E-mail"
                    clearable
                    required
                  ></v-text-field>
                  <v-text-field
                    v-else-if="loginForm.companyForm"
                    v-model="loginForm.cnpj"
                    :rules="cnpjRules"
                    label="Cnpj"
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
                    hint="No mínimo 8 caracteres"
                    value=""
                    v-model="loginForm.password"
                    class="input-group--focused"
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
                    color="success"
                    solid
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
              <v-card-text>
                <v-form ref="formRegister" v-model="valid">
                  <v-switch
                    v-model="registerForm.companyForm"
                    color="yellow darken-4"
                    class="text-weight-bold"
                    label="Para Empresa ?"
                  ></v-switch>

                  <v-text-field
                    v-if="registerForm.companyForm"
                    v-model="registerForm.companyName"
                    :rules="cnpjRules"
                    label="Nome da empresa"
                    clearable
                    required
                  ></v-text-field>

                  <v-text-field
                    v-if="registerForm.companyForm"
                    v-model="registerForm.cnpj"
                    label="CNPJ"
                    clearable
                    required
                  ></v-text-field>

                  <v-text-field
                    v-if="registerForm.companyForm"
                    v-model="registerForm.companyDescription"
                    label="Descrição"
                    clearable
                    required
                  ></v-text-field>

                  <v-text-field
                    v-if="!registerForm.companyForm"
                    v-model="registerForm.userName"
                    label="Nome"
                    clearable
                    required
                  ></v-text-field>

                  <v-text-field
                    v-if="!registerForm.companyForm"
                    v-model="registerForm.cpf"
                    label="CPF"
                    clearable
                    required
                  ></v-text-field>

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
                    hint="No mínimo 8 caracteres"
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

                  <v-btn color="success" solid small class="mt-4">
                    Cadastrar
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Disagree</v-btn
          >
          <v-btn color="green darken-1" text @click="dialog = false"
            >Agree</v-btn
          >
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { Users } from "@/services/users.js";
export default {
  props: {
    mainControll: Object,
  },
  data: () => ({
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
    registerForm: {
      companyForm: false,
      valid: true,
      name: "",
      gender: "",
      dateOfBirth: "",
      cpf: "",
      email: "farmacia@farmcia.com.br",
      cnpj: "",
      password: "2020",
      companyName: "",
      companyDescription: "",
    },
    loginForm: {
      companyForm: false,
      valid: true,
      email: "farmacia@farmcia.com.br",
      cnpj: "",
      password: "2020",
    },
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
      (v) => !!v || "Nome é obrigatório",
      //   (v) => (v && v.length <= 10) || "N",
    ],
    passwordRules: [
      (value) => !!value || "Password é Obrigatório",
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
      this.mainControll.registerTab ? (this.tab = 1) : (this.tab = 0);
      if (this["$refs"]) {
        if (this.$refs.formLogin) {
          this.$refs.formLogin[0].reset();
          this.$refs.formLogin[0].resetValidation();
        }
        if (this.$refs.formRegister) {
          this.$refs.formLogin[0].reset();
          this.$refs.formLogin[0].resetValidation();
        }
      }
    },
  },
  methods: {
    async logIn() {
      const user = new Users();
      let data = { password: this.loginForm.password };
      if (this.loginForm.companyForm) {
        data["cnpj"] = this.loginForm.cnpj;
      } else {
        data["email"] = this.loginForm.email;
      }
      this.mainControll.globalLoading = true;
      await user
        .authenticate(data)
        .then((success) => {
          this.mainControll.userData = success.data.userInfo;
          this.mainControll.dashInfo = success.data.dashInfo;
          this.mainControll.globalLoading = false;

          this.$router.push(
            "/" + this.mainControll.userData.profiles.indexOf("CANDIDATE") != -1
              ? "candidate"
              : "recruiter"
          );
          this.mainControll.showLoginDialog = false;
        })
        .catch((err) => {
          alert(`Ops!! Algo deu errado: ${err.response.data.message}`);
          this.mainControll.userData = {};
          this.mainControll.dashInfo = {};
          this.mainControll.globalLoading = false;
        });
    }
  },
};
</script>

<style>
</style>