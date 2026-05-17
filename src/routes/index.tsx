import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  DashboardHeader, HeroSummary, QuickActions, FinancialHealth,
  ForecastChart, CashFlow, BalanceSheetSection, FinancialInsights, RecentExpenses,
} from "@/components/dashboard";
import { GitHubSyncPanel } from "@/components/dashboard/GitHubSyncPanel";
import { computeFinancialSnapshot } from "@/lib/finance-engine/financialEngine";
import { SAMPLE_DATA } from "@/lib/sample-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WealthOS — Personal Financial Operating System" },
      { name: "description", content: "Track net worth, cash flow, forecasts and capital allocation in one dashboard." },
      { property: "og:title", content: "WealthOS — Personal Financial Operating System" },
      { property: "og:description", content: "Track net worth, cash flow, forecasts and capital allocation in one dashboard." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const engine = useMemo(() => computeFinancialSnapshot(SAMPLE_DATA), []);
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-5 py-6">
        <DashboardHeader />
        <GitHubSyncPanel />
        <HeroSummary
          netWorth={engine.netWorth}
          financialScore={engine.financialScore}
          savingsRate={engine.savingsRate}
          savings={engine.savings}
          monthlyIncome={engine.monthlyIncome}
          monthlyExpenses={engine.monthlyExpenses}
        />
        <QuickActions />
        <FinancialHealth
          monthlyIncome={engine.monthlyIncome}
          monthlyExpenses={engine.monthlyExpenses}
          savings={engine.savings}
          savingsRate={engine.savingsRate}
          debtRatio={engine.debtRatio}
          totalEmi={engine.totalEmi}
          totalLiabilities={engine.totalLiabilities}
          hasIncomeData={engine.hasIncomeData}
        />
        <ForecastChart forecast={engine.forecast} />
        <CashFlow
          monthlyIncome={engine.monthlyIncome}
          monthlyExpenses={engine.monthlyExpenses}
          savings={engine.savings}
          totalEmi={engine.totalEmi}
          expenseBreakdown={engine.expenseBreakdown}
          hasExpenseData={engine.hasExpenseData}
        />
        <BalanceSheetSection
          balanceSheet={engine.balanceSheet}
          liabilities={SAMPLE_DATA.liabilities}
          allocationBuckets={engine.allocationBuckets}
        />
        <FinancialInsights recommendations={engine.recommendations} />
        <RecentExpenses
          expenses={engine.currentMonthExpenses}
          monthlyTotal={engine.monthlyExpenses}
        />
      </div>
    </main>
  );
}
