<template>
    <div class="page">
      <Header />
      <main class="main">
        <h2 class="title">Reģistrējies</h2>
        <form action="" class = "login-form">
            <label for="first">Ievadiet lietotājvārdu: *</label>

            <input type="text" v-model="username" id="username-input" placeholder="Lietotājvārds">

            <label for="first">Ievadiet e-pastu: *</label>

            <input type="text" v-model="email" id="email-input" placeholder="e-pasts">

            <label for="password">Ievadiet paroli: *</label>

            <input type="password" v-model="password" id="password-input" placeholder="Parole">

            <input type="password" v-model="password_again" id="password-input-again" placeholder="Parole atkārtoti">

            <div v-if="error_message" class="error-message">{{ error_message }}</div>

            <button @click="register" type="submit" id="submit-btn" :disabled="loading">
              {{ loading ? 'Notiek reģistrēšanās...' : 'Reģistrēties' }}
            </button>

            <label>{{ register_success ? 'Reģistrēšanās veiksmīga!' : '' }}</label>


        </form>
      </main>
      <Footer />
    </div>
  </template>  
  
  <script>
  import Header from '../Header.vue';
  import Footer from '../Footer.vue';
  
  export default {
    name: 'LoginPage',
    components: {
      Header,
      Footer
    },
    data() {
      return{
        username: '',
        email: '',
        password: '',
        password_again: '',
        loading: false,
        error_message: '',
        register_success: false
      }
    },
    methods: {
      async register(){ 
        if(this.loading) return;
        this.loading = true;
        this.error_message = '';
        this.register_success = false;

        try {
          const res = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
              passwordAgain: this.password_again
            }),
          });

          const data = await res.json();
          console.log(data);

          if (res.ok && data.token) {
            // Save credentials and redirect
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', this.username);
            localStorage.setItem('email', this.email);
            this.$router.push('/user');
          } else {
            this.error_message = data.message || 'Reģistrācija neizdevās.';
          }
        } catch (err) {
          this.error_message = 'Tīkls vai servera kļūda.';
        }

        this.loading = false;
      }
    }
  };
  </script>
  
  <style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #fff4f4;
}
.title{
  font-size: 50px;
  margin: 20px;
  font-weight: bold;
}
.login-form{
  display: flex;
  flex-direction: column;
  background-color: #C5ABB1;
  border-radius: 10px;
  padding: 20px;
  gap: 10px;  
  width: 30%;
  margin-bottom: 20px;
}
.login-form input{
  width: 100%;
}
.error-message{
  color: red;
}

#submit-btn{
  background-color: #2c2c2c;
  color: white;
  margin-bottom: 15px;
}
#register-btn{
  background-color: white;
  color: #2c2c2c;
  width: 100%;
  padding: 10px;
}

#submit-btn:hover{
  background-color: #4A3439;
}
#register-btn:hover{
  background-color: #d8d8d8;
}
form button {
  border-radius: 5px;
  padding: 10px;
}
.register{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#password-input-again{
  margin-bottom: 10px;
}

label { 
 font-weight: bold;
}



</style>  