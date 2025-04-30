<template>
    <div class="page">
      <Header />
      <main class="main">
        <h1 class="welcome">Vai spēsi uzminēt latvieti?</h1>
        <div class="cards">

          <!-- Tas cards tiks pārtaisīts, kā atsevišķa komponente, savādāk pārāk daudz kods -->
          <div class="left-col">
            <div v-if="cards[0]" :key="cards[0].title" :class="`${cards[0].cardClass}`">   
              <div class="card-icon">
                <div class="info-icon">i</div>
              </div>
              <div class="card-title">
                <h2>{{ cards[0].title }}</h2>
              </div>
              <div class="card-description">
                <p>{{ cards[0].description }}</p>
              </div>
              <div class="card-button">
                <button>Doties</button>
              </div>
            </div>
          </div>
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
                  <button>Doties</button>
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
                  <button>Doties</button>
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
          { cardClass: 'card play', title: 'Uzmini latvieti!', description: 'Izvēlies spēles režīmu un uzsāc jautru minēšanas izaicinājumu!' },
          { cardClass: 'card create_profile', title: 'Neesi vēl izveidojis profilu?', description: 'Reģistrējies, lai izvēlētos spēļu režīmus, saglabātu savas iepriekšējās spēles un sekotu līdzi progresam!' },
          { cardClass: 'card play_as_guest', title: 'Spēlē kā viesis', description: 'Spēlē “Uzmini latvieti” bez profila ar nejauši iedalītu spēles režīmu.' }
        ]
      };
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
    padding: 50px;
    font-size: 70px;
    font-weight: 600;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4rem;
  padding-bottom: 70px;
}
.card{
  padding: 10px;
}

.right-col{
  display: flex;
  flex-direction: column;
  row-gap: 1ch;
}

.play {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #C5ABB1;
  border-radius: 10px;
  height: 100%;
}

.create_profile,
.play_as_guest {
  background-color: #C5ABB1;
  flex: 1;
  border-radius: 12px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card-icon {
  margin-bottom: 1rem;
  align-items: left;
}

.info-icon {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: 3px solid black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  font-weight: bold;
}

.card-title {
  margin-bottom: 0.5rem;
  font-size: 21px;
  font-weight: 600;
}

.card-description {
  margin-bottom: 1rem;
}

.card-button {
  display: flex;
  margin-top: auto; 
  width: 100%; 
  justify-content: flex-end;
}

.card-button button {
  background-color: #2c2c2c;
  color: rgb(255, 255, 255);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: 50%;
}

.card-button button:hover {
  background-color: #a33a3a;
  color: white;
}


button {
  margin-top: 1rem;
  background-color: #d3c7c7;
  color: rgb(0, 0, 0);
  border: black;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #a33a3a;
}

</style>  