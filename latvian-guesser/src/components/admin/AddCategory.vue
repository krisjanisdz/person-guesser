<template>
    <div class="page">
      <Header />
      <main class="main">
        <h1 class="welcome">Personības pievienošana</h1>
        <div class="fields">
          <form class="form">
            <div class="left">
              <label class="field-label">
                Nosaukums
                <input type="text" placeholder="Nosaukums" />
              </label>
              <label class="field-label">
                Apraksts
                <input type="text" placeholder="Apraksts" />
              </label>
              <label class="field-label">
                Grūtības līmenis
                <input type="text" placeholder="Vērtība" />
              </label>
            </div>
  
            <div class="middle">
              <label class="field-label">
                Attēls
                <div class="upload-box picture">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1
                      M12 6v8
                      m0-8l-4 4
                      m4-4l4 4" />
                  </svg>
                </div>
              </label>
            </div>
  
            <div class="right">
              <label class="field-label">
                Personības
                <div class="upload-box portrait">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
              </label>
  
              <div class="button-wrapper">
                <button class="add-button">Pievienot</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  
  <script>
  import Header from '../Header.vue';
  import Footer from '../Footer.vue';
  
  export default {
    name: 'AddCategory',
    components: {
      Header,
      Footer
    }
  }
  </script>
  
  <style>
  
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
    padding: 40px;
    font-size: 60px;
    font-weight: 600;
  }
  
  .fields {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form {
    display: flex;
    gap: 40px;
    justify-content: center;
    margin-bottom: 30px;
  }
  
  .left, .middle, .right {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .field-label {
    font-weight: 500;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center; 
  }
  
  input, textarea {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    width: 250px;
    background-color: white;
    font-size: 16px;
  }
  
  textarea {
    height: 180px;
    resize: none;
    display: flex; 
    justify-content: center;
    align-items: center;
  }
  
  .citation::placeholder {
    text-align: center;
  }
  
  
  .upload-box {
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 115px;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  
  .upload-box.portrait {
    height: 250px;
    width: 250px;
  }

  .upload-box.picture {
    height: 250px;
    width: 250px;
  }
  
  .button-wrapper {
    text-align: center;
    margin-top: 20px; 
  }
  
  .add-button {
    background-color: black;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
  }
  
  .add-button:hover {
    background-color: #333;
  }
  
  </style>