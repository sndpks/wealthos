import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

const ACTIONS = [
  { label: 'Expense', route: 'AddExpense' },
  { label: 'Income', route: 'AddIncome' },
  { label: 'Asset', route: 'AddAsset' },
  { label: 'Liability', route: 'AddLiability' },
] as const;

type Props = {
  onNavigate: (route: string) => void;
};

export default function QuickActions({ onNavigate }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.row}
      contentContainerStyle={styles.content}
    >
      {ACTIONS.map((action) => (
        <TouchableOpacity
          key={action.route}
          style={styles.btn}
          onPress={() => onNavigate(action.route)}
          activeOpacity={0.75}
        >
          <Text style={styles.btnText}>+ {action.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { marginBottom: spacing.lg },
  content: { gap: spacing.sm, paddingRight: spacing.md },
  btn: {
    backgroundColor: colors.surfaceSecondary,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  btnText: {
    ...typography.callout,
    color: colors.primary,
  },
});
