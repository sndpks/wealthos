import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';
import { formatCurrency, formatPercent } from '../../utils/format';
import type { FinancialSnapshot } from '../../finance-engine/financialEngine';

type Props = Pick<
  FinancialSnapshot,
  'netWorth' | 'financialScore' | 'savingsRate'
>;

export default function HeroSummary({
  netWorth,
  financialScore,
  savingsRate,
}: Props) {
  const scoreTone =
    financialScore >= 75
      ? colors.success
      : financialScore >= 50
        ? colors.warning
        : colors.danger;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Net worth</Text>
      <Text style={styles.value}>{formatCurrency(netWorth)}</Text>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Financial score</Text>
          <Text style={[styles.metricValue, { color: scoreTone }]}>
            {financialScore}
            <Text style={styles.metricSuffix}>/100</Text>
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Savings rate</Text>
          <Text style={[styles.metricValue, { color: colors.success }]}>
            {formatPercent(Number(savingsRate))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
    borderLeftWidth: 3,
    borderLeftColor: colors.heroAccent,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    ...typography.metric,
    fontSize: 34,
    color: colors.text,
    marginTop: spacing.sm,
  },
  metrics: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  metric: { flex: 1, alignItems: 'center' },
  metricLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: spacing.xs,
    color: colors.text,
  },
  metricSuffix: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginHorizontal: spacing.sm,
  },
});
