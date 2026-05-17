export function generateRecommendations({
    savingsRate,
    debtRatio
  }: any) {
    const recommendations = []
  
    if (savingsRate < 20) {
      recommendations.push(
        'Your savings rate is low. Try reducing discretionary expenses.'
      )
    }
  
    if (debtRatio > 40) {
      recommendations.push(
        'Your debt burden is high. Consider reducing EMI obligations.'
      )
    }
  
    return recommendations
  }