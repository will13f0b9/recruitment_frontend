<template>
  <div id="home">
    <div class="contact-header">
      <div style=" display: flex; align-items: center;">
      </div>
    </div>
    <header style="display: flex;flex: 1;justify-content: space-between;padding: 0 10px;">
      <div style="display: flex; flex: 1; align-items: center; ">
      <img style="width: 50px;" alt="Vue logo" src="../assets/VagaCertaIcon.png" />  
      <span class="mt-2 tracking-in-expand">
              Vaga&nbsp;
              <span class="font-weight-light">Certa</span>
      </span>
      </div>
      <ul style="">
        <li><a href="#home">Home</a></li>
        <li><a href="#candidates">Para Candidatos</a></li>
        <li><a href="#companies">Para Empresas</a></li>
        <li><a href="#contacts">Contato</a></li>
      </ul>
    </header>
    <div class="wallpaper">
      <div class="signInSignUpBox">
        <v-btn block @click="openLoginDialog">Login</v-btn>
        <v-btn block @click="openRegisterDialog">Cadastro</v-btn>
      </div>
      <h1 class="wallpaper-title">Ache a Vaga Certa!</h1>
      <h2 class="wallpaper-description">A Vaga Certa é uma plataforma de recrutamento que facilita a demonstração de conhecimento através de exames tecnológicos, possibilitando os candidatos a mostrarem o máximo de seus potenciais e as empresas a escolherem os melhores do mercado. </h2>
      <div class="button-bar-know-more-contact">
        <a href="#contacts"><button class="contact">Entre em Contato</button></a>
      </div>
    </div>
    <div class="box-plans-for-candidates" id="candidates">
      <span class="box-plans-for-candidates-title">Para Candidatos</span>
      <div class="card-advantages-wrapper">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <h1 class="card-advantages-wrapper-title">Plano Ilimitado</h1>
          <span class="card-advantages-wrapper-description"></span>

          <div class="card-advantages-separator"></div>

          <div class="price-box">
            <span class="free-price"></span>
          </div>

          <div class="card-advantages-separator"></div>

          <ul>
            <li class="card-advantages-item">
              <v-icon>mdi-check</v-icon>
              100% Gratuito
            </li>
            <li class="card-advantages-item">
              <v-icon>mdi-check</v-icon>
              Plataforma Moderna
            </li>
            <li class="card-advantages-item">
              <v-icon>mdi-check</v-icon>
              Pesquise e se cadastre em diversas vagas
              </li>
            <li class="card-advantages-item">
              <v-icon>mdi-check</v-icon>
              Acompanhe as fases de seu processo seletivo
            </li>
            <li class="card-advantages-item">
              <v-icon>mdi-check</v-icon>
              Mostre todo seu potencial através de exames tecnológicos
            </li>
          </ul>
        </div>

        <button @click="openLoginDialog" >Começar Agora</button>
      </div>
    </div>

    <div class="box-plans-for-companies" id="companies">
      <span class="box-plans-for-companies-title">Para Empresas</span>
       <div class="card-advantages-wrapper" v-for="plan in mainControll.plans" :key="plan.id">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <h1 class="card-advantages-wrapper-title">{{plan.name}}</h1>
          <span class="card-advantages-wrapper-description">{{plan.description}}</span>

          <div class="card-advantages-separator"></div>

          <div class="price-box">
            <span class="price">{{plan.price}}</span>
          </div>

          <div class="card-advantages-separator"></div>

          <ul>
            <li class="card-advantages-item" v-for="benefit in plan.benefits" :key="benefit">
              <v-icon>mdi-check</v-icon>
              {{benefit}}
            </li>
          </ul>

        </div>
        <button @click="openRegisterDialog">Assinar Plano</button>
        <span v-if="plan.benefits.some(benefits => benefits.includes('*'))" style="font-size: 12px">* Disponível somente durante o primeiro mês</span>
      </div>
    </div>

    <div class="contact-section-wrapper" id="contacts">
      <h1 class="contact-section-wrapper-title">Entre em contato</h1>
      <span class="contact-section-wrapper-subtitle">Escreva para nós, vamos trocar algumas idéias!</span>

      <div class="contact-section-items">
        <div class="contact-section-item-wrapper">
          <v-icon>mdi-phone</v-icon>
          <span class="contact-section-item-name">Telefone</span>
          <span class="contact-section-item-value">11 0800 6859 4752</span>
        </div>
        <div class="contact-section-item-wrapper">
          <v-icon>mdi-email</v-icon>
          <span class="contact-section-item-name">E-mail</span>
          <span class="contact-section-item-value">contato@vagacerta.com.br</span>
        </div>
        <div class="contact-section-item-wrapper">
          <v-icon>mdi-map-marker</v-icon>
          <span class="contact-section-item-name">Localização</span>
          <span class="contact-section-item-value">Av. Lins de Vasconcelos, 684, Cambucí, São Paulo - SP</span>
        </div>
      </div>

      <div class="contact-section-form-wrapper">
        <input placeholder="Seu nome">
        <input placeholder="Seu e-mail">
        <textarea placeholder="Sua mensagem"></textarea>
        <button @click="successSnackBar('Mensagem enviada com sucesso')">Enviar Mensagem</button>
      </div>
    </div>
     <footer>
      <div style="display: flex; flex-direction: column; alignItems: center; justify-content: stretch">
        <h1 class="footer-title">Vaga Certa</h1>

        <div class="footer-icons">
          <v-icon>mdi-facebook</v-icon>
          <v-icon>mdi-twitter</v-icon>
          <v-icon>mdi-google-plus</v-icon>
          <v-icon>mdi-instagram</v-icon>
        </div>

        <div class="footer-separator"></div>

        <span class="footer-copyright">Vaga Certa © 2020 - Todos os Direitos Reservados.</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { routes } from "@/router/index.js";
export default {
  props: {
    mainControll: Object
  },
  data: () => ({
    routes: routes
  }),
  mounted(){
    this.mainControll.userData = {}
    this.mainControll.dashInfo = {}
    this.mainControll.registerTab = false;
    this.mainControll.showLoginDialog = false;
  },
  methods:{
    successSnackBar(message){
      this.mainControll.alert.text= message;
      this.mainControll.alert.color="green"
      this.mainControll.alert.show = true;
    },
    openLoginDialog(){
      this.mainControll.registerTab = false;
      this.mainControll.showLoginDialog = true;
    },
    openRegisterDialog(){
      this.mainControll.registerTab = true;
      this.mainControll.showLoginDialog = true;
    }
  }
};
</script>
<style scoped>
.main {
  height: 100vh;
}
div {
  /*color: green;*/
}

.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #16a0bf;
  height: 50px;
  color: white;
  padding: 0 30px;
}

.contact-header i {
  color: white;
}
header ul {
  display: flex;
  align-items: center;
  margin: 0;
  min-width: 50%;
}

header ul li {
  cursor: pointer;
  list-style-type: none;
  padding: 0 24px;
}

header ul li a {
  position: relative;
  text-decoration: none;
  color: inherit;
}

header ul li a::after {
  content: '';
  background: #40a9ff;
  position: absolute;
  bottom: -4px;
  left: 0;
  height: 1.5px;
  width: 0%;
  margin-top: 5px;
  transition: 0.3s
}

header ul li a:hover {
  color: #40a9ff;
}
header ul li a:hover::after {
  width: 100%;
}

.wallpaper {
  position: relative;
  min-height: calc(100vh);
  width: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-evenly;
  padding: 100px 16px;
  color: white;
}

.wallpaper::before {
  content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-image: url("../assets/recruitment-wallpaper.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    filter: brightness(0.5);
}

.button-bar-know-more-contact {
  display: grid;
  grid-row: 1 / auto;
  grid-template-columns: max-content max-content;
  column-gap: 16px;
  width: 60%;
  z-index: 0;
}

.button-bar-know-more-contact button {
  height: 46px;
  border-width: 1px;
  border-style: solid;
  border-radius: 40px;
  color: rgb(255, 255, 255);
  padding: 0px 16px;
  align-self: baseline;
  width: auto;
  font-weight: 500;
  margin-top: 16px;
  transition: 0.2s ease 0s;
}
.button-bar-know-more-contact button.know-more {
  border-color: rgb(255, 255, 255);
  background: transparent;
}

.button-bar-know-more-contact button.know-more:hover {
  border-color: rgb(228, 122, 31);
  background: rgb(228, 122, 31);
  color: rgb(255, 255, 255);
}
.button-bar-know-more-contact button.contact {
  border-color: rgb(22, 160, 191);
  background: rgb(22, 160, 191);
}

.button-bar-know-more-contact button.contact:hover {
  border-color: rgb(17, 128, 152);
  background: rgb(17, 128, 152);
  color: rgb(255, 255, 255);
}

.wallpaper .wallpaper-title {
  font-size: 60px;
  font-weight: bold;
  width: 60%;
  color: inherit;
  z-index: 0;
}

.wallpaper .wallpaper-description {
  font-size: 36px;
  font-weight: 100;
  width: 60%;
  color: #eee;
  z-index: 0;
  margin: 20px 0 24px 0;
}

.signInSignUpBox {
  position: absolute;
  top: 20px;
  right: 20px;
  display: grid;
  grid-template-columns: max-content max-content;
  grid-column-gap: 12px;

}

.signInSignUpBox button {
  height: 36px;
  border-width: 1px;
  border-color: #fff;
  border-style: solid;
  border-radius: 40px;
  color: rgb(255, 255, 255);
  padding: 0px 16px;
  align-self: baseline;
  width: auto;
  font-weight: 500;
  margin-top: 16px;
  transition: 0.2s ease 0s;
  background-color: transparent !important;
}

.signInSignUpBox button:hover {
  border-color: rgb(228, 122, 31) !important;
  background-color: rgb(228, 122, 31) !important;
  color: rgb(255, 255, 255);
}

.box-plans-for-candidates {
  display: grid;
  grid-row: 1;
  grid-template-columns: 1fr;
  background: #f5f6fa;
  padding: 16px 16px 64px 16px;
}

.box-plans-for-candidates-title {
  grid-column: 1 / 4;
  justify-self: center;
  font-size: 48px;
  color: #555;
  margin-bottom: 10px;
}

.contact-section-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  color: #ddd;
  padding: 24px;
  text-align: center;
}

.contact-section-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../assets/background-gmaps.jpg') no-repeat center;
  background-size: cover;
  z-index: 0;
  filter: brightness(0.1);
}

.contact-section-wrapper-title {
  font-size: 64px;
  font-weight: 100;
  color: #cdcdcd;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 0;
}

.contact-section-wrapper .contact-section-wrapper-title::after {
  content: '';
  height: 2px;
  width: 70px;
  margin-top: 5px;
  background: #1e94d2;
  opacity: 0.6;
  z-index: 0;
}

.contact-section-wrapper .contact-section-wrapper-subtitle {
  margin-top: 36px;
  font-size: 20px;
  z-index: 0;
}

.contact-section-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  margin-top: 36px;
  flex-wrap: wrap;
}

.contact-section-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;
}

.contact-section-item-wrapper i {
  color: #1e94d2;
  font-size: 24px;
  margin-bottom: 4px;
  z-index: 0;
}
.contact-section-item-name {
  font-size: 18px;
}

.contact-section-item-value {
  font-size: 14px;
  max-width: 210px;
  text-align: center;
}

.contact-section-form-wrapper {
  margin-top: 36px;
  display: grid;
  grid-template-rows: 1fr 1fr 3fr 1fr;
  row-gap: 12px;
  padding: 12px 16px;
  width: 60%;
  z-index: 0;
}
.contact-section-form-wrapper input, textarea {
  background: transparent;
  border: 1px solid rgb(100, 100, 100);;
  padding: 16px;
  color: rgb(102, 99, 96);
  border-radius: 10px;
  width: 100%;
}

.contact-section-form-wrapper button {
  height: 46px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(30, 148, 210);
  background: rgb(30, 148, 210);
  color: rgb(255, 255, 255);
  padding: 0px 16px;
  align-self: center;
  width: auto;
  font-weight: 500;
  margin-top: 16px;
  transition: 0.2s ease 0s;
  justify-self: center;
}

.contact-section-form-wrapper button:hover {
  border-color: rgb(24, 118, 168);
  background: rgb(24, 118, 168);
  color: rgb(255, 255, 255);
}

.card-advantages-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 36px 24px;
  background: white;
  border: 1px solid #f1f1f1;
  transition: 0.2s;

  color: rgba(0,0,0,.65);
}

.card-advantages-wrapper ul {
  padding: 0;
}

.card-advantages-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
}

.card-advantages-wrapper .card-advantages-wrapper-title {
  font-weight: bold;
  font-size: 36px;
  color: #555;
}

.card-advantages-wrapper .card-advantages-wrapper-description {
  width: 70%;
}

.card-advantages-wrapper .price-box {
  display: flex;
  font-weight: bold;
}

.card-advantages-wrapper .price-box .free-price {
  font-size: 48PX;
  align-self: baseline;
}
.card-advantages-wrapper .price-box .free-price:before {
  content: "GRÁTIS";
  font-size: 48px;
  align-self: baseline;
}

.card-advantages-wrapper .price-box .price {
  display: flex;
  font-size: 48px;
}

.card-advantages-wrapper .price-box .price:before {
  content: 'R$';
  margin-top: 6px;
  font-size: 24px;
  align-self: baseline;
}

.card-advantages-wrapper .price-box .price:after {
  content: ',00';
  font-size: 48px;
}

.card-advantages-item {
  display: flex;
  list-style-type: none;
}

.card-advantages-item i {
  margin-right: 10px;
  align-self: center;
}

.card-advantages-separator {
  width: 100px;
  height: 1px;
  background: #cdcdcd;

  margin: 24px;
}

.card-advantages-wrapper button {
  height: 46px;
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(142, 188, 244);
  background: transparent;
  color: rgb(142, 188, 244);
  padding: 0px 16px;
  align-self: center;
  font-weight: 500;
  margin-top: 16px;
  transition: 0.2s ease 0s;
}

.card-advantages-wrapper button:hover {
  border-color: rgb(142, 188, 244);
  background: rgb(142, 188, 244);
  color: rgb(255, 255, 255);
}

.box-plans-for-companies {
  display: grid;
  grid-row: 1;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 16px;
  background: #fafafa;
  padding: 16px 16px 64px 16px;
}

.box-plans-for-companies-title {
  grid-column: 1 / 4;
  justify-self: center;
  font-size: 48px;
  color: #555;
  margin-bottom: 10px;
}

footer {
  background: white;
  padding: 24px;
}

.footer-title {
  font-size: 64px;
  color: #565656;
}

.footer-icons {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
}

.footer-icons i {
  font-size: 32px;
}

.footer-icons i + i {
  margin: 0 8px;
}

.footer-copyright {
  margin-top: 14px;
  font-size: 14px;
  color: #565656;
}

.footer-separator {
  margin: 10px 0;
  height: 1px;
  background: #eee;
  width: 100%;
}

@media (max-width: 768px) {
  header ul {
    display: none;
  }
  .wallpaper .wallpaper-title {
    font-size: 30px;
    text-align: center;
    width: unset;
  }
  .wallpaper .wallpaper-description {
    font-size: 24px;
    text-align: center;
    width: unset;
  }

  .button-bar-know-more-contact {
    width: unset;
  }

  .card-advantages-wrapper {
    padding: 36px 12px;
  }

  .card-advantages-wrapper + .card-advantages-wrapper {
    margin-top: 12px;
  }

  .card-advantages-wrapper .card-advantages-wrapper-description {
    width: unset;
  }

  .box-plans-for-companies {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .box-plans-for-companies-title {
    font-size: 36px;
  }
  .box-plans-for-candidates-title {
    font-size: 36px;
  }

  .contact-section-wrapper-title {
    font-size: 48px;
  }

  .contact-section-items {
    margin-top: 24px;
  }

  .contact-section-item-wrapper {
    flex: 1;
  }

  .contact-section-item-wrapper + .contact-section-item-wrapper {
    margin-top: 24px;
  }

  .contact-section-form-wrapper {
    width: 100%;
    padding: 0;
  }

  .footer-title {
    font-size: 48px;
  }
  .footer-copyright {
    text-align: center;
    font-size: 12px;
  }
}
</style>