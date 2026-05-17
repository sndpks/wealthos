import { View, StyleSheet, Text } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { colors, spacing } from '../../theme';
import { buildChartConfig } from '../../utils/chartConfig';
import { getChartWidth } from '../../utils/chartLayout';
import type { FinancialSnapshot } from '../../finance-engine/financialEngine';
import ChartPanel from './ChartPanel';
import SectionHeader from './SectionHeader';

type Props = Pick<
  FinancialSnapshot,
  | 'monthlyIncome'
  | 'monthlyExpenses'
  | 'savings'
  | 'totalEmi'
  | 'expenseBreakdown'
  | 'hasExpenseData'
>;

export default function CashFlow({
  monthlyIncome,
  monthlyExpenses,
  savings,
  totalEmi,
  expenseBreakdown,
  hasExpenseData,
}: Props) {
  const chartWidth = getChartWidth();

  const pieSlices = hasExpenseData
    ? expenseBreakdown.labels.map((label, index) => ({
        name: label.slice(0, 12),
        amount: expenseBreakdown.amounts[index],
        color: colors.chart[index % colors.chart.length],
        legendFontColor: colors.textMuted,
        legendFontSize: 11,
      }))
    : [
        {
          name: 'No data',
          amount: 1,
          color: colors.border,
          legendFontColor: colors.textMuted,
          legendFontSize: 11,
        },
      ];

  return (
    <View style={styles.wrap}>
      <SectionHeader
        title="Cash flow breakdown"
        subtitle="Supporting views — income vs outflows"
      />

      <ChartPanel title="Monthly cash flow" subtitle="Income, spend, savings, EMI (₹ thousands)">
        <View style={[styles.clip, { width: chartWidth }]}>
          <BarChart
            data={{
              labels: ['Income', 'Spend', 'Save', 'EMI'],
              datasets: [
                {
                  data: [
                    monthlyIncome / 1000,
                    monthlyExpenses / 1000,
                    Math.max(savings, 0) / 1000,
                    totalEmi / 1000,
                  ],
                },
              ],
            }}
            width={chartWidth}
            height={200}
            yAxisLabel=""
            yAxisSuffix="k"
            chartConfig={buildChartConfig('success')}
            style={styles.chart}
            fromZero
            showValuesOnTopOfBars
          />
        </View>
      </ChartPanel>

      <ChartPanel title="Expense mix" subtitle="Current month by category">
        <View style={[styles.clip, { width: chartWidth }]}>
          <PieChart
            data={pieSlices}
            width={chartWidth}
            height={200}
            accessor="amount"
            chartConfig={buildChartConfig('primary')}
            backgroundColor="transparent"
            paddingLeft="8"
            absolute
            hasLegend
          />
        </View>
        {!hasExpenseData ? (
          <Text style={styles.empty}>Log expenses to see category breakdown.</Text>
        ) : null}
      </ChartPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  clip: { overflow: 'hidden', alignSelf: 'center' },
  chart: { marginLeft: -spacing.sm, borderRadius: 8 },
  empty: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
