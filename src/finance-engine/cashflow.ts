import { isCurrentMonth } from '../utils/dates';

export function calculateMonthlyExpenses(
    expenses: { amount: number | string; date?: string }[]
) {
    return expenses
        .filter((e) => isCurrentMonth(e.date))
        .reduce((total, expense) => total + Number(expense.amount), 0);
}

export function calculateMonthlySavings(
    income: number,
    expenses: number
) {
    return income - expenses
}

export function calculateSavingsRate(
    savings: number,
    income: number
) {
    return ((savings / income) * 100).toFixed(1)
}