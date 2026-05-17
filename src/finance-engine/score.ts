export function generateFinancialScore({
    savingsRate,
    debtRatio
  }: any) {
    let score = 50
  
    if (savingsRate > 30) score += 25
    else if (savingsRate > 20) score += 15
    else if (savingsRate > 10) score += 5
  
    if (debtRatio < 30) score += 25
    else if (debtRatio < 50) score += 10
  
    return Math.min(score, 100)
  }