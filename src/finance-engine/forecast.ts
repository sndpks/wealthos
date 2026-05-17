export function forecastNetWorth({
    currentIncome,
    currentExpenses,
    currentAssets,
    currentLiabilities,
    incomeGrowthRate = 0.08,
    expenseGrowthRate = 0.05,
    investmentGrowthRate = 0.10,
    years = 10
  }: any) {
    let income = currentIncome
    let expenses = currentExpenses
    let assets = currentAssets
    let liabilities = currentLiabilities
  
    const projections = []
  
    for (let year = 1; year <= years; year++) {
      income = income * (1 + incomeGrowthRate)
  
      expenses = expenses * (1 + expenseGrowthRate)
  
      const yearlySavings = (income - expenses) * 12
  
      assets =
        assets * (1 + investmentGrowthRate) + yearlySavings
  
      liabilities = liabilities * 0.95
  
      const netWorth = assets - liabilities
  
      projections.push({
        year,
        income: Math.round(income),
        expenses: Math.round(expenses),
        netWorth: Math.round(netWorth)
      })
    }
  
    return projections
  }