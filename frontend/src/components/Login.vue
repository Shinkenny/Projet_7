<template>
  <div class="col-md-12">
<div class="card card-container">
  <img
        id="profile-img"
        src="../assets/icon.png"
        alt="groupomania logo"
        class="profile-img-card"
      />
<form id="login-form" @submit="loginForm">

<div class="form-group">
    <label for="email">Email</label>
    <input type="text" 
    id="email" 
    class="form-control"  
    placeholder="ex : KennyMcCormick@exemple.com" 
    pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}" 
    v-model="email">
    <small id="email" class="form-text text-muted"></small>
</div>

<div class="form-group">
    <label for="password">Mot de passe</label>
    <input type="password" 
    id="password" class="form-control"  
    placeholder="ex : Test1!" 
    title="Doit contenir 6 caractères minimum, une majuscule, une minuscule et un chiffre" 
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}" 
    v-model="password">
    <small id="smallpass" class="text-danger"></small>
</div>

<button type="submit" class="col-md-12 btn-lg btn-dark mt-3 mb-3">Se connecter</button>
        <p>Pas encore inscrit ? <a href="/signUp">Inscrivez-vous</a></p>
</form>
</div>
</div>
</template>

<script>
	import ApiConfig from '../api/api-config';
  import Vue from 'vue';
	export default {
    name: "login",
    data() {
      return {
        errors: [],
        email: null,
        password: null,
        data:JSON.parse(localStorage.getItem('user')),
        user: "",
      }
    },
    
    methods: {
    loginForm(e) {
      this.errors = [];
      if (!this.email ) {
        this.errors.push('Email requis !');
      }
      if (!this.password) {
        this.errors.push('Mot de passe requis');
      }
      if (!this.errors.length) {
        ApiConfig.login(this.email, this.password)
        .then((result) => {
            localStorage.setItem("userId", result.data.userId)
            localStorage.setItem("token", result.data.token)
        Vue.notify({
            group: 'foo',
            title: 'Connexion réussie !',
            text: 'Vous êtes à présent connecté !',
            type: 'success'
          })
        let userId = localStorage.getItem("userId");
        ApiConfig.getOneUser(userId)
        .then(response => {
          this.user = response.data
          this.email = localStorage.setItem('email', this.user.email)
          this.nom = localStorage.setItem('nom', this.user.nom)
          this.prenom = localStorage.setItem('prenom', this.user.prenom)
          this.isAdmin = localStorage.setItem('isAdmin', this.user.isAdmin)
          this.$router.push('/wall');
        })
        .catch(error => console.log(error))
         })
        }
        e.preventDefault();
      },
    }
  }
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
a {
  color: blue;
}
.card-container.card {
  max-width: 400px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
button {
    margin: 0 auto;
}
</style>