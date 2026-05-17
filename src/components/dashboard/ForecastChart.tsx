import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, spacing } from '../../theme';
import { buildChartConfig } from '../../utils/chartConfig';
import { getChartWidth } from '../../utils/chartLayout';
import type { FinancialSnapshot } from '../../finance-engine/financialEngine';
import ChartPanel from './ChartPanel';

type Props = Pick<FinancialSnapshot, 'forecast'>;

const CHART_HEIGHT = 220;

export default function ForecastChart({ forecast }: Props) {
  const chartWidth = getChartWidth();
  const labels = forecast.map((f) => `Y${f.year}`);
  const values = forecast.map((f) => Math.max(f.netWorth / 100000, 0));

  return (
    <ChartPanel
      title="Net worth forecast"
      subtitle="10-year projected trajectory (₹ Lakhs)"
      variant="primary"
    >
      <View style={[styles.clip, { width: chartWidth }]}>
        <LineChart
          data={{
            labels,
            datasets: [{ data: values.length ? values : [0] }],
          }}
          width={chartWidth}
          height={CHART_HEIGHT}
          yAxisLabel=""
          yAxisSuffix="L"
          chartConfig={buildChartConfig('primary')}
          bezier
          style={styles.chart}
          withInnerLines
          withOuterLines={false}
          fromZero
        />
      </View>
    </ChartPanel>
  );
}

const styles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
    borderRadius: 8,
    alignSelf: 'center',
  },
  chart: {
    marginLeft: -spacing.sm,
    borderRadius: 8,
  },
});
