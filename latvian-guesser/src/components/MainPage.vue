<template>
    <div class="page">
      <Header />
      <main class="main">
        <h1 class="welcome">Laipni lūdzam!</h1>
        <div class="cards">
          <div class="card" v-for="card in cards" :key="card.title">
            <div class="card-icon">
              <div class="info-icon">i</div>
            </div>
            <div class="card-title">
              <h2>{{ card.title }}</h2>
            </div>
            <div class="card-description">
              <p>{{ card.description }}</p>
            </div>
            <div class="card-button">
              <button>Doties</button>
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
          { title: 'Spēles režīms', description: 'Izvēlies spēles režīmu un uzsāc jautru minēšanas izaicinājumu!' },
          { title: 'Spēļu vēsture', description: 'Detalizēta informācija par iepriekš spēlētajām spēlēm – rezultāti, punkti un datumi' },
          { title: 'Profils', description: 'Veido savu spēlētāja identitāti – profils, avatārs un personīgie dati vienuviet' }
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

.card {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 240px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative; 
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
  margin-top: auto; 
  margin-bottom: 5px; 
  width: 100%; 
}

.card-button button {
  background-color: #d3c7c7;
  color: rgb(0, 0, 0);
  border: 1px solid black;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
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