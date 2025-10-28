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
    document.getElementById('starting-amount').value.replace(',', '.')
  );
  const additionalContribution = Number(
    document.getElementById('additional-contribution').value.replace(',', '.')
  );
  const timeAmount = document.getElementById('time-amount').value;
  const timeAmountPeriod = document.getElementById('time-amount-period').value;
  const returnRate = Number(
    document.getElementById('return-rate').value.replace(',', '.')
  );
  const returnRatePeriod = document.getElementById('evaluation-period').value;
  const taxRate = Number(
    document.getElementById('tax-rate').value.replace(',', '.')
  );

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

function validateInput(evt) {
  // Como já temos a validação de campos vazios com o required, apenas encerramos a função de validação
  if (evt.target.value === '') {
    return;
  }

  // Capturamos o valor digitado e fazemos o tratamento da virgula
  const inputValue = evt.target.value.replace(',', '.');
  // Pegamos o elemento pai
  const { parentElement } = evt.target; //const parentElement = evt.target.parentElement();
  // Pegamos elemento avô, que será o pai do pai do elemento filho (alvo)
  const grandParent = evt.target.parentElement.parentElement;

  if (parentElement.classList.contains('error')) {
    parentElement.classList.remove('error');
  }

  // Validamos se é uma informação numérica e se é maior que 0
  if (isNaN(inputValue) || Number(inputValue) <= 0) {
    // Criamos o elemnto p e aplicamos a mensagem de erro
    const errorTextElement = document.createElement('p');
    // Aplicamos a classe de formatação do tailwind
    errorTextElement.classList.add('text-red-500');
    errorTextElement.innerText = 'Insira um valor numérico e maior que zero';
    // Adicionamos a Classe error ao elemento pai
    parentElement.classList.add('error');
    // Adicionamos a mensagem de erro
    grandParent.appendChild(errorTextElement);
  }
}

// Iremos percorrer cada um dos elementos do formulário
for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}
form.addEventListener('submit', renderProgression);
