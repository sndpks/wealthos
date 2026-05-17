import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';
import { formatCurrency } from '../../utils/format';
import type { Expense } from '../../types/finance';
import SectionHeader from './SectionHeader';

type Props = {
  expenses: Expense[];
  monthlyTotal: number;
};

export default function RecentExpenses({ expenses, monthlyTotal }: Props) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Recent expenses" subtitle="Current month" />
      <View style={styles.table}>
        {expenses.length === 0 ? (
          <Text style={styles.empty}>
            No expenses logged this month. Use + Expense to add one.
          </Text>
        ) : (
          expenses.slice(0, 10).map((expense, index) => (
            <View
              key={String(expense.id)}
              style={[
                styles.row,
                index < Math.min(expenses.length, 10) - 1 && styles.rowBorder,
              ]}
            >
              <View style={styles.cellLeft}>
                <Text style={styles.category}>{expense.category}</Text>
                <Text style={styles.meta}>
                  {(
                    (Number(expense.amount) / Math.max(monthlyTotal, 1)) *
                    100
                  ).toFixed(0)}
                  % of spend
                </Text>
              </View>
              <Text style={styles.amount}>
                {formatCurrency(Number(expense.amount))}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.xl },
  table: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  cellLeft: { flex: 1, marginRight: spacing.md },
  category: {
    ...typography.callout,
    color: colors.text,
    fontWeight: '600',
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  amount: {
    ...typography.callout,
    color: colors.text,
    fontWeight: '700',
  },
  empty: {
    ...typography.subhead,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
});
