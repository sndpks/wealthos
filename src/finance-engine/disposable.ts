export type DisposableInput = {
    income: number;
    expenses: number;
    emi: number;
    savingsTarget?: number; // optional fixed monthly savings commitment
};

export type DisposableOutput = {
    disposable: number;
    discretionaryRatio: number;
    buyingPower: {
        monthly: number;
        threeMonth: number;     // ~3-month accumulation for one-time purchases
        emiCapacity: number;    // extra EMI room (40% rule)
        affordableLoan: number; // ~5yr horizon
    };
};

export function calculateDisposable({
    income, expenses, emi, savingsTarget = 0,
}: DisposableInput): DisposableOutput {
    const committed = expenses + emi + savingsTarget;
    const disposable = income - committed;
    const emiCapacity = Math.max(income * 0.4 - emi, 0);
    return {
        disposable,
        discretionaryRatio: income > 0 ? disposable / income : 0,
        buyingPower: {
            monthly: Math.max(disposable, 0),
            threeMonth: Math.max(disposable, 0) * 3,
            emiCapacity,
            affordableLoan: emiCapacity * 60, // 5 years * 12 months, flat estimate
        },
    };
}