import { generateReturnsArray } from './src/investmentGoals.js';

// // Botão do formulário que recebe o evento de click
// const calculateButton = document.getElementById('calculate-results');

// Formulário
const form = document.getElementById('investment-form');

// Criamos uma função que irá renderizar na tela os cálculos e gráficos
function renderProgression(evt) {
  // Impede o comportamento padrão de submissão
  evt.preventDefault();
  // const startingAmount = Number(form['starting-amount']);
  // Capituramos os dados digitados pelo usuário
  const startingAmount = Number(
    document.getElementById('starting-amount').value
  );
  const additionalContribution = Number(
    document.getElementById('additional-contribution').value
  );
  const timeAmount = document.getElementById('time-amount').value;
  const timeAmountPeriod = document.getElementById('time-amount-period').value;
  const returnRate = Number(document.getElementById('return-rate').value);
  const returnRatePeriod = document.getElementById('evaluation-period').value;
  const taxRate = Number(document.getElementById('tax-rate').value);

  const returnArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnArray);
}

form.addEventListener('submit', renderProgression);
