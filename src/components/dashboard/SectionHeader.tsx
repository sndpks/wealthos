import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title2,
    color: colors.text,
  },
  subtitle: {
    ...typography.footnote,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
