import type { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: 'default' | 'primary';
};

export default function ChartPanel({
  title,
  subtitle,
  children,
  variant = 'default',
}: Props) {
  const isPrimary = variant === 'primary';

  return (
    <View style={[styles.panel, isPrimary && styles.panelPrimary]}>
      <Text style={[styles.title, isPrimary && styles.titlePrimary]}>{title}</Text>
      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
      <View style={styles.chartWrap}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  panelPrimary: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.headline,
    color: colors.text,
  },
  titlePrimary: {
    fontSize: 18,
  },
  subtitle: {
    ...typography.footnote,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  chartWrap: {
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
  },
});
