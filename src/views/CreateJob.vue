<template>
  <v-app class="about">
    <v-container style="z-index: 2">
      <v-card class="mx-auto">
        <v-form ref="userForm" v-model="form"> </v-form>
        <v-card-actions>
          <v-card class="mx-auto">
            <v-card-text>
              <v-btn
                @click="$router.push('/jobs/' + $router.currentRoute.params.id)"
                class="blue--text"
                text
                fab
                small
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <div>Cadastrando nova vaga</div>
              <v-form ref="jobForm" v-model="companyForm">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="job.title"
                      clearable
                      label="Título"
                      :rules="requiredField"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="job.address"
                      clearable
                      label="Endereço da vaga"
                      :rules="requiredField"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="job.city"
                      clearable
                      label="Cidade vaga"
                      :rules="requiredField"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="job.state"
                      clearable
                      :rules="requiredField"
                      label="UF da vaga"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="job.salary"
                      clearable
                      type="number"
                      label="Salário"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="job.difficulty"
                      :items="difficulty"
                      item-value="_id"
                      item-text="name"
                      :rules="requiredListField"
                      clearable
                      no-data-text="Sem dados de senioridade"
                      label="Senioridade do candidato"
                      multiple
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index === 0">
                          <span>{{ item.name }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="grey--text caption">
                          (+{{ job.difficulty.length - 1 }} outros)
                        </span>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="job.hiring"
                      class="mt-4 custom-v-select"
                      :items="hiring"
                      item-value="_id"
                      item-text="name"
                      no-data-text="Sem dados de contratação"
                      clearable
                      label="Tipo de contração"
                      persistent-hint
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-combobox
                      v-model="job.desirableSkills"
                      :items="skills"
                      chips
                      label="Habilidades Desejáveis"
                      multiple
                      clearable
                      hint="Digite e aperte enter para cadastrar uma nova opção"
                      persistent-hint
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :key="JSON.stringify(data.item)"
                          :input-value="data.selected"
                          :disabled="data.disabled"
                          class="v-chip--select-multi"
                          @click.stop="data.parent.selectedIndex = data.index"
                          @input="data.parent.selectItem(data.item)"
                        >
                          <v-avatar class="accent white--text mr-2">
                            {{ data.item.substring(0, 1).toUpperCase() }}
                            <!-- {{ data.item.slice(0, 1).toUpperCase() }} -->
                          </v-avatar>
                          {{ data.item }}
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-combobox
                      v-model="job.requiredSkills"
                      :items="skills"
                      chips
                      :rules="requiredListField"
                      label="Habilidades obrigatórias"
                      multiple
                      clearable
                      hint="Digite e aperte enter para cadastrar uma nova opção"
                      persistent-hint
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :key="JSON.stringify(data.item)"
                          :input-value="data.selected"
                          :disabled="data.disabled"
                          class="v-chip--select-multi"
                          @click.stop="data.parent.selectedIndex = data.index"
                          @input="data.parent.selectItem(data.item)"
                        >
                          <v-avatar class="accent white--text mr-2">
                            {{ data.item.substring(0, 1).toUpperCase() }}
                            <!-- {{ data.item.slice(0, 1).toUpperCase() }} -->
                          </v-avatar>
                          {{ data.item }}
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      label="Descrição"
                      rows="1"
                      clearable
                      :auto-grow="true"
                      :value="job.description"
                      v-model="job.description"
                      :counter="2000"
                      :rules="descriptionRules"
                    ></v-textarea>
                  </v-col>
                   <v-col cols="12" sm="12" md="12">
                    <v-combobox
                      v-model="job.benefits"
                      :items="benefits"
                      chips
                      :rules="requiredListField"
                      label="Benefícios"
                      multiple
                      clearable
                      hint="Digite e aperte enter para cadastrar uma nova opção"
                      persistent-hint
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :key="JSON.stringify(data.item)"
                          :input-value="data.selected"
                          :disabled="data.disabled"
                          class="v-chip--select-multi"
                          @click.stop="data.parent.selectedIndex = data.index"
                          @input="data.parent.selectItem(data.item)"
                        >
                          <v-avatar class="accent white--text mr-2">
                            {{ data.item.substring(0, 1).toUpperCase() }}
                            <!-- {{ data.item.slice(0, 1).toUpperCase() }} -->
                          </v-avatar>
                          {{ data.item }}
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      label="Outras informações"
                      rows="1"
                      clearable
                      :auto-grow="true"
                      :value="job.anotherInfo"
                      v-model="job.anotherInfo"
                      :counter="1000"
                      :rules="anotherInfoRules"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-btn
                    block
                    class="white--text"
                    color="cyan accent-"
                    @click="openExamConfig()"
                    >Configurar exame Prático</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="12">
                  <v-btn
                    block
                    class="white--text"
                    color="green accent-4"
                    @click="saveJobChanges()"
                    >Cadastrar Vaga</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" persistent max-width="800">
        <v-card>
          <v-card-title class="headline green--text"
            >Habilidades que serão testadas</v-card-title
          >
          <v-card-text>
            <div v-if="copyExamConfig && copyExamConfig.length > 0">
              Está vaga possuirá
              <strong>exame automatico</strong> das habilidades a baixo:
            </div>
            <div v-if="!copyExamConfig && copyExamConfig.length > 0">
              Sem exame automatico configurado!
            </div>
            <v-btn block dark color="teal" small @click="openSaveModal()">
              <v-icon color="black" class="mr-2" style="cursor: pointer"
                >mdi-plus-circle</v-icon
              >
              ADICIONAR HABILIDADE
            </v-btn>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <strong>Habilidade</strong>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <strong>Quantidade de questões</strong>
              </v-col>
              <v-col cols="12" sm="12" md="2" style="text-align: center">
                <strong>Ações</strong>
              </v-col>
            </v-row>
            <ul
              v-if="copyExamConfig && copyExamConfig.length > 0"
              style="max-height: 500px; overflow: scroll"
            >
              <li
                v-for="(exam, i) in copyExamConfig"
                :key="exam.skill"
                style="list-style-type: none"
              >
                <!-- <v-row>
                  <v-col cols="12" sm="12" md="4">
                      <strong>{{exam.skill}}</strong>
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <v-text-field
                      v-model="exam.quantity"
                      clearable
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row> -->
                <v-row>
                  <v-col cols="12" sm="12" md="6">
                    <strong>{{ exam.skill }}</strong>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" style="text-align: center">
                    {{ exam.quantity }}
                  </v-col>
                  <v-col cols="12" sm="12" md="2" style="text-align: right">
                    <v-row>
                      <v-col style="cursor: pointer">
                        <v-icon
                          color="yellow darken-4"
                          @click="editItem(i)"
                          small
                          >mdi-pencil</v-icon
                        >
                      </v-col>
                      <v-col style="cursor: pointer" @click="removeItem(i)">
                        <v-icon color="red" small>mdi-delete</v-icon>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" small text @click="dialog = false"
              >Cancelar</v-btn
            >
            <v-btn
              color="teal darken-1"
              class="white--text"
              @click="saveExamConfigChanges()"
              >Salvar!</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEdit" persistent max-width="800">
        <v-card>
          <v-card-title class="headline green--text">{{
            action != -1
              ? "Editar questão do exame"
              : "Cadastrar novas questões ao exame"
          }}</v-card-title>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="12" md="4">
                <v-combobox
                  v-model="editedExamConfig.skill"
                  :items="benefitis"
                  :disabled="action != -1"
                  chips
                  label="Habilidades Desejáveis"
                  clearable
                  :rules="requiredField"
                  hint="Digite e aperte enter para cadastrar uma nova opção"
                  persistent-hint
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      :input-value="data.selected"
                      :disabled="data.disabled"
                      class="v-chip--select-multi"
                      @click.stop="data.parent.selectedIndex = data.index"
                      @input="data.parent.selectItem(data.item)"
                    >
                      <v-avatar class="accent white--text mr-2">
                        {{ data.item.substring(0, 1).toUpperCase() }}
                      </v-avatar>
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="editedExamConfig.quantity"
                  clearable
                  label="Quantidade de questões"
                  :rules="questionsRules"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" small text @click="dialogEdit = false"
              >Cancelar</v-btn
            >
            <v-btn
              color="teal darken-1"
              class="white--text"
              @click="saveChange()"
              >Salvar!</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
<script>
import { Jobs } from "@/services/jobs.js";
export default {
  props: {
    userData: Object,
    dashInfo: Object,
    alert: Object,
    mainControll: Object,
    company: Object,
  },
  data: () => ({
    skills: ["SQL", "JAVA", "PYTHON", "LOGIC", "ORACLE", "NODE", "JAVASCRIPT"],
    benefits: ['Vale Refeição',  'Vale Alimentação', 'Estacionamento', 'Horário Flexível', 'PLR', 'Seguro de Vida'],
    user: {},
    companyData: {},
    dialog: false,
    dialogEdit: false,
    action: 0,
    job: {
      examConfig: [],
    },
    copyExamConfig: [],
    editedExamConfig: {},
    hiring: [
      {
        _id: "CLT",
        name: "CLT",
      },
      {
        _id: "PJ",
        name: "PJ",
      },
    ],
    difficulty: [
      { _id: "STAGE", name: "ESTÁGIO" },
      { _id: "JUNIOR", name: "JUNIOR" },
      { _id: "PLENO", name: "PLENO" },
      { _id: "SENIOR", name: "SENIOR" },
      { _id: "SPECIALIST", name: "ESPECIALISTA" },
    ],
    menu: false,
    companyForm: false,
    form: false,
    descriptionRules: [
      (value) => !!value || "Descrição da vaga é um campo obrigatório",
      (v) =>
        (v && v.length <= 2000) || "Campo descrição no máximo 2000 caracteres",

      //   (v) => v.length >= 8 || "Min de 8 caracteres",
      //   () => "The email and password you entered don't match",
    ],
    anotherInfoRules: [
      (v) =>
        !v ||
        (v != undefined && v.length <= 1000) ||
        "Campo descrição no máximo 1000 caracteres",

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
    requiredField: [(v) => !!v || "Campo obrigatório"],
    requiredListField: [(v) => (!!v && v.length > 0) || "Campo obrigatório"],
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
    locationRules: [
      (value) => !!value || "Localização da empresa é um campo obrigatório",
      //   (v) => v.length >= 8 || "Min de 8 caracteres",
      //   () => "The email and password you entered don't match",
    ],
    emailRules: [
      (v) => !!v || "E-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
    ],
    questionsRules: [
      (value) => !!value || "Quantidade de questões é obrigatório",
      (v) => parseInt(v) > 0 || "Deve ter no mínimo 1 questão",
      (v) => parseInt(v) < 6 || "Pode ter no máximo 5 questões",
    ],
    formValid: false,
    descRules: [
      (v) => (v && v.length <= 50) || "Campo descrição no máximo 50 caracteres",
    ],
  }),
  async mounted() {},
  methods: {
    openExamConfig() {
      this.copyExamConfig = [...this.job.examConfig];
      this.dialog = !this.dialog;
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
    async saveJobChanges() {
      if(this.$refs.jobForm.validate()){
        const job = new Jobs();
        this.mainControll.globalLoading = true;
        this.job["company"] = this.$router.currentRoute.params.id;
        this.job['owner'] = this.$router.currentRoute.params.userId
        await job
          .createJob(this.job)
          .then((resp) => {
            this.mainControll.globalLoading = false;
            if (resp.status == 200) {
              this.successSnackBar("Vaga cadastrada com sucesso!");
              this.$router.push("/jobs/" + resp.data._id);
            } else {
              this.showInvalidSnackBar(
                err.data.message ?? "Não foi possível cadastrar vaga!"
              );
            }
          })
          .catch((err) => {
            this.mainControll.globalLoading = false;
            this.showInvalidSnackBar(
              err.data.message ?? "Não foi possível cadastrar vaga!"
            );
          });
      }
    },
    removeItem(i) {
      this.copyExamConfig.splice(i, 1);
    },
    saveChange() {
      if (
        this.editedExamConfig.skill &&
        this.editedExamConfig.quantity &&
        this.editedExamConfig.quantity > 0 &&
        this.editedExamConfig.quantity < 6
      ) {
        const currentSkill = this.editedExamConfig.skill;

        const alreadyData = this.copyExamConfig.filter((f) => {
          return f.skill == currentSkill;
        });

        if (this.action != -1) {
          this.copyExamConfig[this.action] = this.editedExamConfig;
        } else {
          if (alreadyData && alreadyData.length > 0) {
            this.showInvalidSnackBar(
              "Questão já cadastrada para essa habilidade"
            );
          } else {
            this.copyExamConfig.push(this.editedExamConfig);
          }
        }
        this.dialogEdit = false;
      }
    },
    saveExamConfigChanges() {
      this.job.examConfig = [...this.copyExamConfig];
      this.dialog = false;
    },
    editItem(i) {
      this.action = i;
      this.editedExamConfig = Object.assign(
        this.editedExamConfig,
        this.copyExamConfig[i]
      );
      this.dialogEdit = true;
    },
    openSaveModal() {
      this.editedExamConfig = { skill: undefined, quantity: 0 };
      this.action = -1;
      this.dialogEdit = true;
    },
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
  },
};
</script>
<style scoped>
.wrapper {
  z-index: 1;
}
</style>