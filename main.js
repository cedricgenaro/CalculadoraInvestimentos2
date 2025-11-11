import { generateReturnsArray } from './src/investmentGoals.js';
import { Chart } from 'chart.js/auto';

// // Botão do formulário que recebe o evento de click
// const calculateButton = document.getElementById('calculate-results');
// Pegando os elementos que vão abrigar os gráficos
const finalMoneyChart = document.getElementById('final-money-distribution');
const progressionChart = document.getElementById('progression');

// Formulário
const form = document.getElementById('investment-form');

function formatCurrency(value) {
  return value.toFixed(2);
}

// Criamos uma função que irá renderizar na tela os cálculos e gráficos
function renderProgression(evt) {
  // Impede o comportamento padrão de submissão
  evt.preventDefault();

  // Impedir a execução do processo em caso de erro
  if (document.querySelector('.error')) {
    return;
  }

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

  const finalInvestmentObject = returnArray[returnArray.length - 1];

  // Renderizando os gráficos:
  new Chart(finalMoneyChart, {
    type: 'doughnut',
    data: {
      labels: ['Total Investido', 'Rendimento', 'Imposto'],
      datasets: [
        {
          data: [
            formatCurrency(finalInvestmentObject.investedAmount),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100)
            ),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (taxRate / 100)
            ),
          ],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  // Gráfico de projeções
  new Chart(progressionChart, {
    type: 'bar',
    data: {
      labels: returnArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: 'Total Investido',
          data: returnArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount)
          ),
          backgroundColor: 'rgb(54, 162, 235)',
        },
        {
          label: 'Retorno de Investimento',
          data: returnArray.map((investmentObject) =>
            formatCurrency(investmentObject.interestReturns)
          ),
          backgroundColor: 'rgb(255, 205, 86)',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}

// Função de limpar o formulário
function clearForm() {
  form['starting-amount'].value = '';
  form['additional-contribution'].value = '';
  form['time-amount'].value = '';
  form['return-rate'].value = '';
  form['tax-rate'].value = '';

  // Remover as mensagens de erro
  const errorInputContainers = document.querySelectorAll('.error');

  // Percorremos a lista
  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove('error'); // Remove a classe erro
    errorInputContainer.parentElement.querySelector('p').remove(); // Acessa o elemento avô e remove a mensagem de erro
  }
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

  // Validamos se primeiramente se não contém a Classe error e se não é um número ou se é um número <= 0
  if (
    !parentElement.classList.contains('error') &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    // Criamos o elemnto p e aplicamos a mensagem de erro
    const errorTextElement = document.createElement('p');
    // Aplicamos a classe de formatação do tailwind
    errorTextElement.classList.add('text-red-500');
    errorTextElement.innerText = 'Insira um valor numérico e maior que zero';
    // Adicionamos a Classe error ao elemento pai
    parentElement.classList.add('error');
    // Adicionamos a mensagem de erro
    grandParent.appendChild(errorTextElement);
    // Aqui temos a condição para remover um erro, que se contem classe , deve ser um numero e maior que zero
  } else if (
    parentElement.classList.contains('error') &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove('error'); // Tiramos a classe error
    grandParent.querySelector('p').remove(); // tiramos a mensagem error
  }
}

// Iremos percorrer cada um dos elementos do formulário
for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}
form.addEventListener('submit', renderProgression);
document.getElementById('clear-form').addEventListener('click', clearForm);
