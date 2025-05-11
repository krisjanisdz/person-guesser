<template>
  <div class="page">
    <Header />
    <main class="main">
      <h1 class="welcome" v-if="correct">Uzmini šodienas personību!</h1>

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
                  <strong>Raksti personības pilno vārdu, ja nav izņēmumi, piemēram, Rainis</strong>
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
          :disabled = "gameEnded"
          @input = "fetchSuggestion"
          @keydown.down.prevent="moveHighlight(1)"
          @keydown.up.prevent="moveHighlight(-1)"
          @keydown.enter = "handleEnter"
          type="text" 
          placeholder="Raksti personības vārdu ..." 
          autocomplete = "off"
          />
          <ul v-if="suggestions.length" class="suggestions-list">
          <li 
            v-for="(person, i) in suggestions" 
            :key="person._id" 
            :class="{active: i === highlightIndex}"
            @click="selectSuggestion(person.name + ' ' + person.surname)"
          >
            {{ person.name }} {{ person.surname }}
            </li>
          </ul>
          <button type="submit" :disabled = "gameEnded">Minēt</button>
      </form>
    </div>

    <div v-if="gameEnded" class="play-again-wrapper">
      <button @click="restartGame">Spēlēt vēlreiz</button>
    </div>

    <div v-if="showWinModal" class="modal-backdrop">
      <div class="modal win-modal">
        <button class="close-button" @click="showWinModal = false">X</button>
        <h2>Tu uzminēji pareizi!</h2>
        <p>Vai vēlies spēlēt vēlreiz?</p>
        <div class="modal-buttons">
          <button @click="restartGame">Spēlēt vēlreiz</button>
        </div>
      </div>
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
          <td :class="['guess-cell', getColor(guess.career, correct.career)]">{{ guess.career }}</td>
          <td :class="['guess-cell', getColor(guess.region, correct.region)]">{{ guess.region }}</td>
          <td :class="['guess-cell', getYearHint(guess.birthYear).class]">
          {{ guess.birthYear }} <span class="arrow">{{ getYearHint(guess.birthYear).hint }}</span>
          </td>
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
      suggestions: [],
      highlightIndex: -1,
      guesses: [],
      correct: null,
      showHelp: false,
      showSuccess: false,
      showWinModal: false,
      gameEnded: false
      };
    },
  mounted() {
    this.fetchRandomPerson();
  },
  methods: {

    async fetchSuggestion(){
      if (this.guessInput.trim().length < 2){
        this.suggestions = [];
        return;
      }
      try {
        const res = await fetch (`http://localhost:3001/api/people/search?term=${this.guessInput}`);
        this.suggestions = await res.json();
      }catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    },

    selectSuggestion(fullName) {
      this.guessInput = fullName;
      this.suggestions = [];
      this.highlightIndex = -1;
    },

    async restartGame() {
      this.guesses = [];
      this.guessInput = '';
      this.showSuccess = false;
      this.showWinModal = false;
      this.gameEnded = false;
      await this.fetchRandomPerson();
    },

    async fetchRandomPerson() {
      try {
        const response = await fetch('http://localhost:3001/api/people/random');
        if (!response.ok) throw new Error('Network response error');
        this.correct = await response.json();
      } catch (error) {
        console.error('Error fetching random person:', error);
      }
    },

    async makeGuess() {
      const trimmed = this.guessInput.trim();
      if (!trimmed) return;

      try {
        const encodedName = encodeURIComponent(trimmed);
        const res = await fetch(`http://localhost:3001/api/guess?name=${encodedName}`);

        if (!res.ok) {
          alert('Personība netika atrasta');
          return;
        }

        const person = await res.json();
        this.guesses.unshift(person);

        const isCorrect =
          person.name === this.correct.name &&
          person.surname === this.correct.surname &&
          person.gender === this.correct.gender &&
          person.career === this.correct.career &&
          person.region === this.correct.region &&
          person.birthYear === this.correct.birthYear;

        if (isCorrect) {
          this.showSuccess = true;
          this.showWinModal = true;
          this.gameEnded = true;
          this.suggestions = [];
        }

        this.guessInput = '';
      } catch (error) {
        console.error('Error making guess:', error);
      }
    },

    getColor(value, correctValue) {
      return value === correctValue ? 'correct' : 'incorrect';
    },

    getYearHint(guessYear) {
        const correctYear = this.correct.birthYear;
        const diff = Math.abs(guessYear - correctYear);

        if (guessYear === correctYear) return { class: 'correct', hint: '' };

        if (guessYear < correctYear) {
          return { class: 'incorrect', hint: '↑' };
        } else if (diff <= 5) {
          const hint = guessYear < correctYear ? '↑' : '↓';
          return { class: 'close', hint };
        } else {
          return { class: 'incorrect', hint: '↓' }; 
        }
      },

    moveHighlight(step) {
      if (!this.suggestions.length) return;
      const max = this.suggestions.length - 1;

      if (this.highlightIndex === -1) {
        this.highlightIndex = step > 0 ? 0 : max;
      } else {
        this.highlightIndex = (this.highlightIndex + step + this.suggestions.length) % this.suggestions.length;
      }
  },

  chooseHighlight() {
    if (this.highlightIndex === -1) return;
    const p = this.suggestions[this.highlightIndex];
    this.selectSuggestion(p.name + ' ' + p.surname);
  
  },
  handleEnter(e) {
  if (this.suggestions.length && this.highlightIndex !== -1) {
    e.preventDefault();        
    this.chooseHighlight();
  }
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

.success-message {
  background-color: #a5d6a7;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
}

.win-modal {
  background: #e5c9cf;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
.modal-buttons {
  margin-top: 1rem;
}
.modal-buttons button {
  padding: 0.5rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
.modal-buttons button:hover {
  background-color: #388e3c;
}

.arrow {
  font-size: larger;
  font-weight: bold;
  margin-left: 4px;
}

.suggestions-list {
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 400px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 35px;
  list-style: none;
  padding: 0;
}
.suggestions-list li {
  padding: 0.5rem;
  cursor: pointer;
}

.suggestions-list li.active,
.suggestions-list li:hover {
  background-color: #e3e3e3;
}

.play-again-wrapper button {
  padding: 0.6rem 1.6rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}
.play-again-wrapper button:hover {
  background:#388e3c;
}

</style>
