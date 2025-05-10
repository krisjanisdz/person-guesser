<template>
    <div class="page">
      <Header />
      <main class="main">
        <h2 class="title">Pieslēdzies</h2>
        <form action="" class = "login-form">
            <label for="first">Ievadiet lietotājvārdu vai e-pastu:</label>

            <input type="text" v-model="user_or_email" id="user-input" placeholder="Lietotājvārds vai e-pasts">

            <label for="password">Ievadiet paroli:</label>

            <input type="password" v-model="password" id="password-input" placeholder="Parole">

            <button @click="login" type="submit" id="submit-btn" :disabled="loading">
              {{ loading ? 'Notiek pieslēgšanās...' : 'Pieslēgties' }}
            </button>

            <div v-if="success_message" class="error-message">{{ success_message }}</div>

            <div class="register">
              <p>Nav profils? Piereģistrējies!</p>
              <button @click="navToRegister" type="submit" id="register-btn">
                    Reģistrēties
                </button>
            </div>

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
        user_or_email: '',
        password: '',
        loading: false,
        success_message: ''
      }
    },
    methods:{
      async login(){ 
        if(this.loading) return;
        this.loading = true;

        const res = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_or_email: this.user_or_email, password: this.password }),
          });

        const data = await res.json()
          if (data.token) {
          localStorage.setItem('token', data.token);
          this.success_message = 'Login successful!';
          this.$router.push('/user');
          } else if(data.message === "Invalid credentials"){
            this.success_message = "Nepareizs lietotājvārds un/vai parole";
          }
        
        this.loading = false;
      },
      navToRegister(){
        this.$router.push('/register');
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
  width: 40%;
}

#submit-btn:hover{
  background-color: #4A3439;
}
#register-btn:hover{
  background-color: #d8d8d8;
}
form button {
  border-radius: 5px;
  padding: 4px;
}
.register{
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>  