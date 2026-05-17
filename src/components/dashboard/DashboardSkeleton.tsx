import { View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../theme';

function Block({ height, style }: { height: number; style?: object }) {
  return <View style={[styles.block, { height }, style]} />;
}

export default function DashboardSkeleton() {
  return (
    <View style={styles.wrap}>
      <Block height={56} style={styles.mb} />
      <Block height={140} style={styles.mb} />
      <Block height={44} style={[styles.mb, { width: '70%' }]} />
      <View style={styles.row}>
        <Block height={88} style={styles.tile} />
        <Block height={88} style={styles.tile} />
      </View>
      <View style={styles.row}>
        <Block height={88} style={styles.tile} />
        <Block height={88} style={styles.tile} />
      </View>
      <Block height={260} style={styles.mb} />
      <Block height={200} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: spacing.md },
  block: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    opacity: 0.55,
  },
  mb: { marginBottom: spacing.lg },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  tile: { flex: 1 },
});
