import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';
import SectionHeader from './SectionHeader';

type Props = {
  recommendations: string[];
};

export default function FinancialInsights({ recommendations }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader
        title="Insights & recommendations"
        subtitle="Based on your live financial position"
      />
      <View style={styles.card}>
        {recommendations.length === 0 ? (
          <Text style={styles.empty}>
            Add income, expenses, and liabilities to generate insights.
          </Text>
        ) : (
          recommendations.map((rec, index) => (
            <View
              key={index}
              style={[
                styles.row,
                index < recommendations.length - 1 && styles.rowBorder,
              ]}
            >
              <View style={styles.dot} />
              <Text style={styles.text}>{rec}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: spacing.md,
  },
  text: {
    ...typography.subhead,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  empty: {
    ...typography.subhead,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
});
