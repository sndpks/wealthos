import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../theme';

type Props = {
  label: string;
  value: string;
  hint?: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
};

const toneColors = {
  default: colors.primary,
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
};

export default function MetricTile({
  label,
  value,
  hint,
  tone = 'default',
}: Props) {
  return (
    <View style={styles.tile}>
      <View style={[styles.accent, { backgroundColor: toneColors[tone] }]} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
    overflow: 'hidden',
  },
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 4,
  },
  value: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
});
