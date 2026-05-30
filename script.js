let inputBudget = document.querySelector("#inputBudget");
let impostaBudget = document.querySelector("#btnBudget");
let descrizioneSpesa = document.querySelector("#descrizioneSpesa");
let inputSpesa = document.querySelector("#inputSpesa");
let categoriaSpese = document.querySelector("#categoriaSpese");
let impostaSpesa = document.querySelector("#btnSpesa");
let visualizzaBudget = document.querySelector("#visualizzaBudget");
let usciteTotali = document.querySelector("#visualizzaSpesa");
let visualizzaSaldo = document.querySelector("#visualizzaSaldo");
let transazioni = document.querySelector("#transazioni");
let categoriaEntrata = document.querySelector("#categoriaEntrata");
let resetMese = document.querySelector("#btnReset");
let popup = document.querySelector("#scelta");
let uscite = [];

impostaBudget.addEventListener("click", () => {
  if (inputBudget.value == "" || categoriaEntrata.value == "") {
    visualizzaBudget.innerHTML = 0 + " €";
    usciteTotali.innerHTML = 0 + " €";
    visualizzaSaldo.innerHTML = 0 + " €";
    alert("Devi riempire tutti i campi obbligatori (*)");
    return;
  } else {
    visualizzaBudget.innerHTML = inputBudget.value + " €";
    usciteTotali.innerHTML = 0 + " €";
    visualizzaSaldo.innerHTML = inputBudget.value + " €";
    visualizzaBudget.classList.add("entrataBudget");
    visualizzaSaldo.classList.add("usciteNormali");
    inserimentoBudgetTabella();
  }
  
});

impostaSpesa.addEventListener("click", () => {
  if (
    descrizioneSpesa.value == "" ||
    inputSpesa.value == "" ||
    categoriaSpese.value == ""
  ) {
    alert("Devi riempire tutti i campi obbligatori (*)");
    visualizzaBudget.innerHTML = inputBudget.value + " €";
    usciteTotali.innerHTML = 0 + " €";
    visualizzaSaldo.innerHTML = inputBudget.value + " €";
    return;
  } else {
    visualizzaSaldo.innerHTML = inputBudget.value - inputSpesa.value + " €";
    usciteTotali.innerHTML = inputSpesa.value + " €";
    let saldoDisponibile = 0;
    let spesaAttuale = 0;
    let totaleUscite = 0;
    uscite.push(Number(inputSpesa.value));
    totaleUscite = uscite.reduce(
      (spesaCorrente, valoreCorrente) => spesaCorrente + valoreCorrente,
      spesaAttuale,
    );
    saldoDisponibile = Number(inputBudget.value) - totaleUscite;
    usciteTotali.innerHTML = totaleUscite + " €";
    visualizzaSaldo.innerHTML = saldoDisponibile + " €";

    if (totaleUscite < (inputBudget.value / 100) * 50) {
      usciteTotali.classList.add("usciteNormali");
    } else if (totaleUscite < (inputBudget.value / 100) * 80) {
      usciteTotali.classList.add("usciteMedie");
    } else {
      usciteTotali.classList.add("usciteAlte");
    }

    if (saldoDisponibile > (inputBudget.value / 100) * 30) {
      visualizzaSaldo.classList.add("usciteNormali");
    } else if (saldoDisponibile > (inputBudget.value / 100) * 15) {
      visualizzaSaldo.classList.add("usciteMedie");
    } else {
      visualizzaSaldo.classList.add("usciteAlte");
    }
    creaTabellaTransazioni();
  }
});

function creaTabellaTransazioni() {
  const spesa = {
    data: new Date().toLocaleDateString("it-IT"),
    categoria: categoriaSpese.value,
    descrizione: descrizioneSpesa.value,
    importo: inputSpesa.value,
  };

  transazioni.innerHTML += `
          <tr>
              <td>${spesa.data}</td>
              <td>${spesa.categoria}</td>
              <td>${spesa.descrizione}</td>
              <td class="uscitaBudget">€${spesa.importo}</td>
          </tr>
      `;
}

function inserimentoBudgetTabella() {
  const entrata = {
    data: new Date().toLocaleDateString("it-IT"),
    categoria: categoriaEntrata.value,
    descrizione: categoriaEntrata.value,
    entrata: inputBudget.value,
  };

  transazioni.innerHTML += `
          <tr>
              <td>${entrata.data}</td>
              <td>${entrata.categoria}</td>
              <td></td>
              <td class="entrataBudget">€${entrata.entrata}</td>
          </tr>
      `;
}

resetMese.addEventListener("click", () => {
  creaPopup();
})

function creaPopup(){
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const sectionButtons = document.createElement("section");
  const btnGreen = document.createElement("button");
  const btnRed = document.createElement("button");
  const body = document.querySelector("body");

  h2.textContent = "Sei sicuro di svuotare tutti i campi?";
  btnGreen.textContent = "No";
  btnRed.textContent = "Si";

  div.classList.add("popup");
  h2.classList.add("h2Popup");
  sectionButtons.classList.add("sectionButtons");
  btnGreen.classList.add("btnGreen");
  btnRed.classList.add("btnRed");
  body.classList.add("popupBody");

  div.appendChild(h2);
  div.appendChild(sectionButtons);
  sectionButtons.appendChild(btnGreen);
  sectionButtons.appendChild(btnRed);
  popup.appendChild(div);

  btnGreen.addEventListener("click", () => {
    div.style.display = "none";
    body.classList.remove("popupBody");
  })
  btnRed.addEventListener("click", () =>{
    svuotaCampi();
    div.style.display = "none";
    body.classList.remove("popupBody");
  })
}

function svuotaCampi(){
  inputBudget.value = "";
  visualizzaBudget.textContent = 0 + " €";
  descrizioneSpesa.value = "";
  inputSpesa.value = "";
  usciteTotali.textContent = 0 + " €";
  visualizzaSaldo.textContent = 0 + " €";
  transazioni.textContent = "";
}