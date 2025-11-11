function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = 'monthly',
  monthlyContribution = 0,
  retunRate = 0,
  returnTimeFrame = 'monthly'
) {
  // O if irá verificar se por acaso o timeHorizon e startingAmount está zerado ou não informado. Se for verdade nenhum cálculo será realizado
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      'Investimento inicial e prazo devem ser preenchidos com valores positivos.'
    );
  }

  // Taxa de retorno final que receberá o valor da taxa de acordo com o tipo (mensal, anual)
  const finalReturnRate =
    returnTimeFrame === 'monthly'
      ? 1 + retunRate / 100
      : convertToMontlyReturnRate(1 + retunRate / 100);

  // Converte o timeHorizon de anual para mensal
  const finalTimeHorizon =
    timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12;

  // objeto de referencia inicial de investimento
  const referenceInvestmentObject = {
    // Total já investido
    investedAmount: startingAmount,
    // Retorno em juros - o rendimento do ultimo mês
    interestReturns: 0,
    // retorno em Juros total o rendimento total deis do primeiro mês até o atual
    totalInterestReturns: 0,
    // Contagem do mês
    month: 0,
    // O taotal investido + o total de rendimento mensal
    totalAmount: startingAmount,
  };

  // Iniciamos o array com o primeiro objeto
  const returnsArray = [referenceInvestmentObject];

  // Preenchemos o array  utilizando o for para percorrer os meses
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    // Calcula o total investido  pegando o valor do mês anterior
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribution;

    // Calcula quanto rendeu naquele mês
    const interestReturns = //valorMesPassado * 5% - FinalReturnRate= 1 + percentual - Logo temos que subtrair 1
      returnsArray[timeReference - 1].totalAmount * (finalReturnRate - 1);

    // Total já investido
    const investedAmount = startingAmount + monthlyContribution * timeReference;

    // Toatl que o investimento já me gerou - tudo que eu tenho - tudo que já recebi de retorno
    const totalInterestReturns = totalAmount - investedAmount;

    returnsArray.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }

  return returnsArray;
}
