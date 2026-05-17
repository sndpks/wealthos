import {
  calculateMonthlyExpenses,
  calculateMonthlySavings,
  calculateSavingsRate,
} from './cashflow';
import { buildBalanceSheet, type BalanceSheet } from './balanceSheet';
import { forecastNetWorth } from './forecast';
import { generateFinancialScore } from './score';
import { generateRecommendations } from './recommendations';
import {
  recommendAllocation,
  applySavedBuckets,
  type AllocationBucket,
} from './allocation';
import { aggregateByCategory } from '../utils/expenses';
import { isCurrentMonth } from '../utils/dates';
import type { Expense, Income, Asset, Liability } from '../types/finance';

export type RawFinancialData = {
  expenses: Expense[];
  income: Income[];
  assets: Asset[];
  liabilities: Liability[];
  savedBuckets: Record<string, number> | null;
};

export type FinancialSnapshot = {
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  savingsRate: string;
  totalEmi: number;
  debtRatio: number;
  totalLiabilities: number;
  balanceSheet: BalanceSheet;
  netWorth: number;
  financialScore: number;
  recommendations: string[];
  forecast: ReturnType<typeof forecastNetWorth>;
  allocationBuckets: AllocationBucket[];
  hasCustomAllocation: boolean;
  currentMonthExpenses: Expense[];
  expenseBreakdown: ReturnType<typeof aggregateByCategory>;
  hasIncomeData: boolean;
  hasExpenseData: boolean;
};

export function computeFinancialSnapshot(
  data: RawFinancialData,
): FinancialSnapshot {
  const { expenses, income, assets, liabilities, savedBuckets } = data;

  const monthlyIncome = income.reduce(
    (sum, row) => sum + (Number(row.amount) || 0),
    0,
  );

  const currentMonthExpenses = expenses.filter((e) => isCurrentMonth(e.date));
  const monthlyExpenses = calculateMonthlyExpenses(expenses);
  const savings = calculateMonthlySavings(monthlyIncome, monthlyExpenses);
  const savingsRate =
    monthlyIncome > 0 ? calculateSavingsRate(savings, monthlyIncome) : '0.0';

  const totalEmi = liabilities.reduce(
    (sum, row) => sum + (Number(row.emi) || 0),
    0,
  );

  const balanceSheet = buildBalanceSheet(assets, liabilities);
  const totalLiabilities = balanceSheet.totalLiabilities;
  const netWorth = balanceSheet.netWorth;
  const debtRatio =
    monthlyIncome > 0 ? (totalEmi / monthlyIncome) * 100 : 0;

  const forecast = forecastNetWorth({
    currentIncome: monthlyIncome,
    currentExpenses: monthlyExpenses,
    currentAssets: balanceSheet.totalAssets,
    currentLiabilities: totalLiabilities,
    years: 10,
  });

  const financialScore = generateFinancialScore({
    savingsRate: Number(savingsRate),
    debtRatio,
  });

  const recommendations = generateRecommendations({
    savingsRate: Number(savingsRate),
    debtRatio,
  });

  const baseAllocation = recommendAllocation(monthlyIncome, totalEmi);
  const allocationBuckets = savedBuckets
    ? applySavedBuckets(monthlyIncome, baseAllocation, savedBuckets)
    : baseAllocation;

  return {
    monthlyIncome,
    monthlyExpenses,
    savings,
    savingsRate,
    totalEmi,
    debtRatio,
    totalLiabilities,
    balanceSheet,
    netWorth,
    financialScore,
    recommendations,
    forecast,
    allocationBuckets,
    hasCustomAllocation: savedBuckets != null,
    currentMonthExpenses,
    expenseBreakdown: aggregateByCategory(currentMonthExpenses),
    hasIncomeData: income.length > 0,
    hasExpenseData: currentMonthExpenses.length > 0,
  };
}
