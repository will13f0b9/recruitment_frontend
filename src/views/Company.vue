<template>
  <v-app class="about">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="12">
          <v-card elevation="4" class="mx-auto mx-auto mt-2" outlined>
            <v-card-title>
              Administrar recrutadores
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar na tabela"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :loading="loadingTableData"
              :loading-text="'Carregando Recrutadores da ' + company.name"
              :items="desserts"
              :search="search"
              sort-by="totalJobsActived"
              :sort-desc="true"
              class="elevation-1"
              :footer-props="{
                showFirstLastPage: true,
                itemsPerPageText: 'Total de páginas',
              }"
            >
              <template v-slot:item.totalJobsActived="{ item }">
                <v-chip small :color="getColor(item.totalJobsActived)" dark>{{
                  item.totalJobsActived
                }}</v-chip>
              </template>
              <template v-slot:item.totalJobsPublished="{ item }">
                <v-chip small :color="getColor(item.totalJobsPublished)" dark>{{
                  item.totalJobsPublished
                }}</v-chip>
              </template>
              <template v-slot:item.blocked="{ item }">
                <v-chip small :color="item.blocked ? 'red' : 'green'" dark>{{
                  item.blocked ? "Sim" : "Não"
                }}</v-chip>
              </template>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="teal"
                        dark
                        block
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                        >Cadastrar Novo recrutador</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                clearable
                                v-model="editedItem.name"
                                label="Nome do recrutador"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                clearable
                                :disabled="editedIndex >= 0"
                                v-model="editedItem.cpf"
                                label="Cpf do recrutador"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                clearable
                                :disabled="editedIndex >= 0"
                                v-model="editedItem.email"
                                label="Email do recrutador"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                clearable
                                :disabled="editedIndex >= 0"
                                v-model="editedItem.description"
                                label="Descrição do recrutador"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              v-if="editedIndex < 0"
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                clearable
                                v-if="editedIndex < 0"
                                v-model="editedItem.password"
                                :append-icon="
                                  showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                :type="showPassword ? 'text' : 'password'"
                                name="input-10-2"
                                label="Password"
                                value=""
                                class="input-group--focused"
                                required
                                @click:append="showPassword = !showPassword"
                              ></v-text-field>
                            </v-col>
                            <v-col v-if="editedIndex" cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.gender"
                                :items="genderOptions"
                                :disabled="editedIndex >= 0"
                                item-text="name"
                                item-value="_id"
                                :menu-props="{ bottom: true, offsetY: true }"
                                label="Sexo"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-switch
                                v-if="editedIndex >= 0"
                                color="red"
                                v-model="editedItem.blocked"
                                label="Bloqueado"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close"
                          >Cancelar</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="save"
                          >Salvar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
              </template>
              <template v-slot:no-data>
                <h1>Sem recrutadores cadastrado</h1>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { Users } from "@/services/users.js";
import Menu from "@/components/Menu.vue";
export default {
  props: {
    userData: Object,
    dashInfo: Object,
    company: Object,
    alert: Object,
    mainControll: Object,
  },
  components: {
    Menu: Menu,
  },
  data: () => ({
    dialog: false,
    search: "",
    loadingTableData: true,
    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Cpf", value: "cpf", align: "center" },
      { text: "E-mail", value: "email", align: "center" },
      {
        text: "Quantidade de vagas publicadas",
        value: "totalJobsPublished",
        sortable: true,
        align: "center",
      },
      {
        text: "Quantidade de vagas ativas",
        value: "totalJobsActived",
        align: "center",
      },
      {
        text: "Bloqueado",
        value: "blocked",
        align: "center",
      },
      { text: "Ações", value: "actions", sortable: false, align: "center" },
    ],
    genderOptions: [
      { _id: "Male", name: "Masculino" },
      { _id: "Female", name: "Feminino" },
    ],
    showPassword: false,
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "JOANA",
      cpf: "19100000000",
      gender: "Female",
      description: "JOANA A MELHOR RECRUTORA ",
      email: "farmacia@farmcia.com.br",
      blocked: false,
      password: "2020",
    },
    defaultItem: {
      name: "",
      cpf: "",
      gender: "",
      description: "",
      email: "",
      blocked: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar" : "Editar dados";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
    if (this.company && this.company.hasOwnProperty("companyId")) {
      this.findAllRecruitersByCompany();
    } else {
      this.desserts = [];
    }
  },

  methods: {
    findAllRecruitersByCompany() {
      this.loadingTableData = true;
      this.initialize(this.company.companyId)
        .then((resp) => {
          this.loadingTableData = false;
          this.desserts = resp.data;
        })
        .catch((err) => {
          this.loadingTableData = false;
          this.desserts = [];
          alert("Não foi possível buscar os recrutadores " + err);
        });
    },
    initialize(id) {
      const users = new Users();
      return users.findAllRecruiterByCompanie(id);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    getColor(data) {
      if (data > 10) return "green";
      else if (data > 0) return "orange";
      else return "grey";
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      this.mainControll.globalLoading = true;
      if (this.editedIndex > -1) {
        await this.editDate();
        // Object.assign(, this.editedItem);
      } else {
        await this.createNewRecruiter();
      }
      this.mainControll.globalLoading = false;
      this.close();
    },
    async editDate() {
      const users = new Users();
      const data = this.desserts[this.editedIndex];
      console.log(this.editedIndex);
      debugger;
      if (data) {
        users
          .editUSer(data._id, this.editedItem)
          .then(async (resp) => {
            debugger;
            this.alert.show = true;
            this.alert.collor = "green";
            this.alert.icon = "check";
            this.alert.message = "Editado com sucesso";
            await this.findAllRecruitersByCompany();
          })
          .catch((err) => {
            debugger;
            this.alert.show = true;
            this.alert.collor = "red darken-4";
            this.alert.icon = "alert-circle";
            this.alert.message =
              "Não foi possível. Motivo " + err.response.data["message"]
                ? err.response.data["message"]
                : "desconhecido";
            console.log(err);
          });
      }
    },
    async createNewRecruiter() {
      const users = new Users();
      await users
        .findRecruiterByEmail(this.editedItem.email)
        .then(async (resp) => {
          if (resp.status == 200 && resp.data.items.length > 0) {
            const userData = resp.data.items[0];
            await users
              .addNewCompanyToUser(this.company.companyId, userData._id)
              .then(async (data) => {
                await this.findAllRecruitersByCompany();
              })
              .catch((err) => {
                this.alert.show = true;
                this.alert.collor = "red darken-4";
                this.alert.icon = "alert-circle";
                this.alert.message =
                  "Não foi possível. Motivo " + err.response.data["message"]
                    ? err.response.data["message"]
                    : "desconhecido";
              });
          } else {
            this.editedItem["companies"] = [this.company.companyId];
            this.editedItem["profiles"] = ["RECRUITER"];
            console.log(this.editedItem);
            await users
              .create(this.editedItem)
              .then(async (data) => {
                this.alert.show = true;
                this.alert.collor = "green";
                this.alert.icon = "check";
                this.alert.message = "Cadastrado com sucesso";
                await this.findAllRecruitersByCompany();
              })
              .catch((err) => {
                this.alert.show = true;
                this.alert.collor = "red darken-4";
                this.alert.icon = "alert-circle";
                this.alert.message =
                  "Não foi possível. Motivo " + err.response.data["message"]
                    ? err.response.data["message"]
                    : "desconhecido";
                console.log(err);
              });
          }
        })
        .catch((err) => {
          this.alert.show = true;
          this.alert.collor = "red darken-4";
          this.alert.icon = "alert-circle";
          this.alert.message =
            "Não foi possível. Motivo " + err.response.data["message"]
              ? err.response.data["message"]
              : "desconhecido";
          console.log(err);
        });
    },
    async editRecruiter() {},
  },
};
</script>
<style scoped>
.wrapper {
  z-index: 1;
}
</style>