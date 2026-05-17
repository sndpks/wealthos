import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { spacing } from '../../theme';
import { buildChartConfig } from '../../utils/chartConfig';
import { getChartWidth } from '../../utils/chartLayout';
import type { FinancialSnapshot } from '../../finance-engine/financialEngine';
import type { Liability } from '../../types/finance';
import ChartPanel from './ChartPanel';
import SectionHeader from './SectionHeader';
import AllocationCard from './AllocationCard';
import BalanceSheetCard from './BalanceSheetCard';

type Props = Pick<
  FinancialSnapshot,
  'balanceSheet' | 'allocationBuckets' | 'hasCustomAllocation'
> & {
  liabilities: Liability[];
  onEditAllocation: () => void;
};

export default function BalanceSheetSection({
  balanceSheet,
  liabilities,
  allocationBuckets,
  hasCustomAllocation,
  onEditAllocation,
}: Props) {
  const chartWidth = getChartWidth();

  const liabilityChart =
    liabilities.length > 0
      ? {
          labels: liabilities.map((l) => l.type.slice(0, 8)),
          datasets: [
            {
              data: liabilities.map((l) =>
                Math.max(Number(l.outstanding) / 100000, 0.01),
              ),
            },
          ],
        }
      : null;

  return (
    <View style={styles.wrap}>
      <SectionHeader
        title="Balance sheet & allocation"
        subtitle="Assets, debt exposure, capital plan"
      />

      <BalanceSheetCard bs={balanceSheet} />

      {liabilityChart ? (
        <ChartPanel
          title="Liability exposure"
          subtitle="Outstanding by type (₹ Lakhs)"
        >
          <View style={[styles.clip, { width: chartWidth }]}>
            <BarChart
              data={liabilityChart}
              width={chartWidth}
              height={200}
              yAxisLabel=""
              yAxisSuffix="L"
              chartConfig={buildChartConfig('warning')}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
            />
          </View>
        </ChartPanel>
      ) : null}

      <AllocationCard
        buckets={allocationBuckets}
        onEdit={onEditAllocation}
        subtitle={
          hasCustomAllocation
            ? 'Your custom plan'
            : 'Recommended from live income & EMI'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  clip: { overflow: 'hidden', alignSelf: 'center' },
  chart: { marginLeft: -spacing.sm, borderRadius: 8 },
});
