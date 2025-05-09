<template>
  <div class="page">
    <Header />
    <main class="main">
      <h1 class="welcome">Uzmini šodienas personību!</h1>

      <div class="guess-box">
        <div class = "guess-box-header">
          <p>Uzraksti jebkuru personību, lai uzsāktu.</p>
          <button class="help-icon" @click="showHelp = true">?</button>
        </div>

        <div v-if="showHelp" class="modal-backdrop">
            <div class="modal">
              <button class="close-button" @click="showHelp = false">X</button>
                <h2><strong>Kā spēlēt?</strong></h2>
                <p class="mt-2">
                  Uzraksti latviešu personības vārdu un spied <strong>“Minēt”</strong>. Spēle salīdzinās tavu minējumu ar šodienas noslēpto personību.
                </p>
                <ul class="help-list mt-4">
                  <li><span class="legend green"></span> - atribūts ir <strong>pareizs</strong></li>
                  <li><span class="legend yellow"></span> - atribūts ir <strong>tuvu</strong> (piemēram, gads ±5)</li>
                  <li><span class="legend red"></span> - atribūts ir <strong>nepareizs</strong></li>
              </ul>
            </div>
        </div>

        <form class="input-group" @submit.prevent="makeGuess">
          <input 
          v-model="guessInput" 
          type="text" 
          placeholder="Raksti personības vārdu ..." 
          />
          <button @click="makeGuess">Minēt</button>
          </form>
      </div>

    <div class="guess-results" v-if="guesses.length > 0">
    <table>
      <thead>
        <tr>
          <th>Personība</th>
          <th>Dzimums</th>
          <th>Profesija</th>
          <th>Reģions</th>
          <th>Dzimšanas gads</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(guess, index) in guesses" :key="index">
          <td><img :src="guess.image" class="avatar" /></td>
          <td :class="['guess-cell', getColor(guess.gender, correct.gender)]">{{ guess.gender }}</td>
          <td :class="['guess-cell', getColor(guess.profession, correct.profession)]">{{ guess.profession }}</td>
          <td :class="['guess-cell', getColor(guess.region, correct.region)]">{{ guess.region }}</td>
          <td :class="['guess-cell', getYearColor(guess.year)]">{{ guess.year }}</td>
        </tr>
      </tbody>
    </table>
  </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'Game',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      guessInput: '',
      guesses: [],
      showHelp: false,
      // TODO: no backend ielādēt šodienas personību 
      correct: {
        gender: 'Vīrietis',
        profession: 'Sportists',
        region: 'Vidzeme',
        year: 1990
      }
    };
  },
  methods: {
    makeGuess() {
      if (!this.guessInput.trim()) return;

      // TODO: aizstāt ar backend pieprasījumu uz personibas datiem
      const fakeGuess = {
        image: 'https://via.placeholder.com/40', // aizvietot ar reālu attēlu no db
        gender: 'Vīrietis',
        profession: 'Sportists',
        region: 'Kurzeme',
        year: 1992
      };

      this.guesses.unshift(fakeGuess);
      this.guessInput = '';
    },
    getColor(value, correctValue) {
      return value === correctValue ? 'correct' : 'incorrect';
    },
    getYearColor(year) {
      const diff = Math.abs(year - this.correct.year);
      if (year === this.correct.year) return 'correct';
      if (diff <= 5) return 'close';
      return 'incorrect';
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
  flex: 1;
  background-color: #fff4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
.welcome {
  font-weight: bold;
  font-size: 3rem;
  margin-bottom: 1rem;
}
.guess-box {
  background-color: #b89393;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 2rem;
}
.guess-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.help-icon {
  background-color: #d9bcbc;
  color: #333;
  font-weight: bold;
  border-radius: 4px;
  border: 1px solid #333;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-icon:hover {
  background-color: #8f8181;
}
.input-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
input {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #999;
}
button {
  padding: 0.5rem 1.5rem;
  background-color: #2c2c2c;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background-color: #a33a3a;
}
.guess-results table {
  border-collapse: collapse;
}
.guess-results th, .guess-results td {
  padding: 0.5rem 1rem;
  text-align: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.correct {
  background-color: #28a745;
  color: white;
}
.incorrect {
  background-color: #dc3545;
  color: white;
}
.close {
  background-color: #ffc107;
  color: black;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #e5c9cf;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  text-align: left;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.close-button {
  background-color: #d9bcbc;
  color: #333;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  border: none;
  cursor: pointer;
}

.legend {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 4px;
}
.legend.green {
  background-color: #28a745;
}
.legend.red {
  background-color: #dc3545;
}
.legend.yellow {
  background-color: #ffc107;
}
.help-list {
  list-style: none;
  padding: 0;
}
.help-list li {
  margin-bottom: 0.5rem;
}



</style>
