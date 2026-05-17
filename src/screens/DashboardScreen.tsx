import React from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';
import { useFinancialEngine } from '../hooks/useFinancialEngine';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import HeroSummary from '../components/dashboard/HeroSummary';
import QuickActions from '../components/dashboard/QuickActions';
import FinancialHealth from '../components/dashboard/FinancialHealth';
import ForecastChart from '../components/dashboard/ForecastChart';
import CashFlow from '../components/dashboard/CashFlow';
import BalanceSheet from '../components/dashboard/BalanceSheetSection';
import FinancialInsights from '../components/dashboard/FinancialInsights';
import RecentExpenses from '../components/dashboard/RecentExpenses';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';

export default function DashboardScreen({ navigation }: { navigation: { navigate: (r: string) => void } }) {
  const engine = useFinancialEngine();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader />

        {engine.loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {engine.error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{engine.error}</Text>
              </View>
            ) : null}

            <HeroSummary
              netWorth={engine.netWorth}
              financialScore={engine.financialScore}
              savingsRate={engine.savingsRate}
            />

            <QuickActions onNavigate={(route) => navigation.navigate(route)} />

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

            <BalanceSheet
              balanceSheet={engine.balanceSheet}
              liabilities={engine.raw.liabilities}
              allocationBuckets={engine.allocationBuckets}
              hasCustomAllocation={engine.hasCustomAllocation}
              onEditAllocation={() => navigation.navigate('AllocationEditor')}
            />

            <FinancialInsights recommendations={engine.recommendations} />

            <RecentExpenses
              expenses={engine.currentMonthExpenses}
              monthlyTotal={engine.monthlyExpenses}
            />
          </>
        )}

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  errorBanner: {
    backgroundColor: colors.dangerMuted,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
  },
  footer: {
    height: spacing.xl,
  },
});
