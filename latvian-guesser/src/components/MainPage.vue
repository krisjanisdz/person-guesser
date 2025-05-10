<template>
  <div class="page">
    <Header />
    <main class="main">
      <h1 class="welcome">Vai spēsi uzminēt latvieti?</h1>

      <div class="cards-row">
        <!-- Left column (main card) -->
        <div class="left-col">
          <div v-if="cards[0]" :key="cards[0].title" :class="`${cards[0].cardClass}`">
            <div class="card-icon">
              <div class="info-icon">i</div>
            </div>
            <div class="card-title">
              <h2>{{ cards[0].title }}</h2>
            </div>
            <div v-for="(descr, i) in cards[0].description" :key="i" class="card-description">
              <p>{{ descr }}</p>
            </div>
            <div class="card-button">
              <button @click="navToLogin">Ieiet</button>
            </div>
          </div>
        </div>

        <!-- Right column (two stacked cards) -->
        <div class="right-col">
          <div v-if="cards[1]" :key="cards[1].title" :class="`${cards[1].cardClass}`">
            <div class="card-icon">
              <div class="info-icon">i</div>
            </div>
            <div class="card-title">
              <h2>{{ cards[1].title }}</h2>
            </div>
            <div class="card-description">
              <p>{{ cards[1].description }}</p>
            </div>
            <div class="card-button">
              <button @click="navToRegister">Izveidot</button>
            </div>
          </div>

          <div v-if="cards[2]" :key="cards[2].title" :class="`${cards[2].cardClass}`">
            <div class="card-icon">
              <div class="info-icon">i</div>
            </div>
            <div class="card-title">
              <h2>{{ cards[2].title }}</h2>
            </div>
            <div class="card-description">
              <p>{{ cards[2].description }}</p>
            </div>
            <div class="card-button">
              <button @click="navToGuest">Minēt</button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
  
  <script>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  
  export default {
    name: 'MainPage',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        cards: [
          { cardClass: 'card play', title: 'Uzmini latvieti!', description: ['Izvēlies spēles režīmu un uzsāc jautru minēšanas izaicinājumu!', 'Plašs slavenību klāsts ar vairākiem spēles režīmiem!', 'Varbūt tā ir Šomase? Ja nu tomēr Reiniks? Mini un uzzini!'] },
          { cardClass: 'card create_profile', title: 'Neesi vēl izveidojis profilu?', description: 'Reģistrējies, lai izvēlētos spēļu režīmus, saglabātu savas iepriekšējās spēles un sekotu līdzi progresam!' },
          { cardClass: 'card play_as_guest', title: 'Spēlē kā viesis', description: 'Spēlē “Uzmini latvieti” bez profila ar nejauši iedalītu spēles režīmu.' }
        ]
      };
    },
    methods:{
      navToRegister(){
        this.$router.push('/register');
      },
      navToGuest(){
        this.$router.push('/guest');
      },
      navToLogin(){
        this.$router.push('/login');
      },
      navToGame(){
        this.$router.push('/game');
      },
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
    flex: 1;
    background-color: #fff4f4;
  }
  
  .welcome {
    text-align: center;
    padding: 30px;
    font-size: 48px;
    font-weight: bold;
  }
  
  .cards-row {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 2rem;
    padding: 0 2rem 2rem;
    flex-wrap: wrap;
  }
  
  .left-col,
  .right-col {
    width: 100%;
    max-width: 420px;
  }
  
  .left-col {
    flex: 2;
    display: flex;
    justify-content: center;
  }
  
  .right-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: space-between;
  }
  
  .card {
    padding: 1rem;
    border-radius: 20px;
    background-color: #C5ABB1;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  .card-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .card-description {
    font-size: 16px;
    gap: 10px;
    margin-top: 8px;
    margin-bottom: 0.5rem;
    display: flex;
  }
  
  .card-icon {
    margin-bottom: 0.5rem;
  }
  
  .info-icon {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border: 3px solid black;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
  }
  
  .card-button {
    display: flex;
    margin-top: auto;
    justify-content: flex-end;
    width: 100%;
  }
  
  .card-button button {
    background-color: #2c2c2c;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    width: 60%;
  }
  
  .card-button button:hover {
    background-color: #961C2F;
  }
  
  button {
    margin-top: 1rem;
    background-color: #d3c7c7;
    color: black;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    width: 70px;
  }
  
  button:hover {
    background-color: #a33a3a;
  }
  </style>
  