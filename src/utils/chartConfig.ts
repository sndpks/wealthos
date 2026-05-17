import { colors } from '../theme';

type ChartAccent = keyof typeof colors.chartRgb;

export function buildChartConfig(accent: ChartAccent = 'primary') {
  const rgb = colors.chartRgb[accent];
  return {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surfaceElevated,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${rgb}, ${opacity})`,
    labelColor: () => colors.textMuted,
    strokeWidth: 2,
    barPercentage: 0.5,
    propsForBackgroundLines: {
      stroke: colors.border,
      strokeDasharray: '4 8',
    },
    propsForDots: {
      r: '3',
      strokeWidth: '2',
      stroke: `rgb(${rgb})`,
    },
  };
}
