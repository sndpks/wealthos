import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export default function DashboardHeader() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>WealthOS</Text>
      <Text style={styles.subtitle}>Personal Financial Operating System</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  title: {
    ...typography.largeTitle,
    color: colors.text,
  },
  subtitle: {
    ...typography.subhead,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
