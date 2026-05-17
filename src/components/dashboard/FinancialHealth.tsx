import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { formatCurrency, formatPercent } from '../../utils/format';
import type { FinancialSnapshot } from '../../finance-engine/financialEngine';
import SectionHeader from './SectionHeader';
import MetricTile from './MetricTile';

type Props = Pick<
  FinancialSnapshot,
  | 'monthlyIncome'
  | 'monthlyExpenses'
  | 'savings'
  | 'savingsRate'
  | 'debtRatio'
  | 'totalEmi'
  | 'totalLiabilities'
  | 'hasIncomeData'
>;

export default function FinancialHealth({
  monthlyIncome,
  monthlyExpenses,
  savings,
  savingsRate,
  debtRatio,
  totalEmi,
  totalLiabilities,
  hasIncomeData,
}: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader
        title="Core financial health"
        subtitle="Monthly position from Supabase"
      />
      <View style={styles.grid}>
        <MetricTile
          label="Income"
          value={hasIncomeData ? formatCurrency(monthlyIncome, true) : '—'}
          hint={hasIncomeData ? undefined : 'Add income'}
          tone="default"
        />
        <MetricTile
          label="Expenses"
          value={formatCurrency(monthlyExpenses, true)}
          tone="warning"
        />
        <MetricTile
          label="Savings"
          value={formatCurrency(savings, true)}
          hint={`${savingsRate}% rate`}
          tone={savings >= 0 ? 'success' : 'danger'}
        />
        <MetricTile
          label="EMI burden"
          value={formatPercent(debtRatio)}
          hint={`${formatCurrency(totalEmi, true)}/mo`}
          tone={debtRatio > 40 ? 'danger' : debtRatio > 30 ? 'warning' : 'default'}
        />
        <MetricTile
          label="Liabilities"
          value={formatCurrency(totalLiabilities, true)}
          hint="Outstanding balance"
          tone="warning"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});
