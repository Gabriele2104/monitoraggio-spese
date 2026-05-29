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
let uscite = [];

impostaBudget.addEventListener("click", () => {
  if (inputBudget.value == "" || categoriaEntrata.value == "") {
    visualizzaBudget.innerHTML = 0 + " €";
    usciteTotali.innerHTML = "Nessuna uscita";
    visualizzaSaldo.innerHTML = 0 + " €";
    alert("Devi riempire tutti i campi obbligatori (*)");
    return;
  } else {
    visualizzaBudget.innerHTML = inputBudget.value + " €";
    usciteTotali.innerHTML = "Nessuna uscita";
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
    usciteTotali.innerHTML = "Nessuna uscita";
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
