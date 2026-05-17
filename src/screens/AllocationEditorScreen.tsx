import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../services/supabase';
import {
  recommendAllocation,
  AllocationBucket,
} from '../finance-engine/allocation';
import { DEFAULT_USER_ID } from '../constants/app';
import { colors, spacing, radius, typography } from '../theme';

async function loadMonthlyIncome(): Promise<number> {
  const { data } = await supabase.from('income').select('amount');
  const total = (data ?? []).reduce(
    (sum, row) => sum + (Number(row.amount) || 0),
    0,
  );
  return total;
}

async function loadMonthlyEmi(): Promise<number> {
  const { data } = await supabase.from('liabilities').select('emi');
  return (data ?? []).reduce((sum, row) => sum + (Number(row.emi) || 0), 0);
}

const BUCKET_ORDER: AllocationBucket['key'][] = [
  'loans',
  'essentials',
  'lifestyle',
  'goals',
  'investments',
];

const LABELS: Record<AllocationBucket['key'], string> = {
  loans: 'Loans / EMI',
  essentials: 'Essentials',
  lifestyle: 'Lifestyle',
  goals: 'Goals',
  investments: 'Investments',
};

export default function AllocationEditorScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pcts, setPcts] = useState<Record<string, number>>({
    loans: 0,
    essentials: 0,
    lifestyle: 0,
    goals: 0,
    investments: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data: existing } = await supabase
          .from('allocations')
          .select('*')
          .eq('user_id', DEFAULT_USER_ID)
          .maybeSingle();

        if (existing?.buckets) {
          setPcts(existing.buckets);
        } else {
          const [income, emi] = await Promise.all([
            loadMonthlyIncome(),
            loadMonthlyEmi(),
          ]);
          const recommended = recommendAllocation(income, emi);
          const seeded: Record<string, number> = {};
          recommended.forEach((b) => (seeded[b.key] = b.recommendedPct));
          setPcts(seeded);
        }
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'Could not load allocation');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = useMemo(
    () => BUCKET_ORDER.reduce((s, k) => s + (pcts[k] ?? 0), 0),
    [pcts],
  );
  const isValid = Math.round(total) === 100;

  const handleSave = async () => {
    if (!isValid) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('allocations').upsert(
        {
          user_id: DEFAULT_USER_ID,
          buckets: pcts,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      );
      if (error) throw error;
      navigation.goBack();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      Alert.alert('Save failed', message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Capital Allocation</Text>
        <Text style={styles.subtitle}>
          Drag sliders so the total equals 100%. Changes appear on your dashboard after saving.
        </Text>

        <View style={styles.card}>
          {BUCKET_ORDER.map((key, index) => (
            <View
              key={key}
              style={[
                styles.row,
                index < BUCKET_ORDER.length - 1 && styles.rowBorder,
              ]}
            >
              <View style={styles.rowHeader}>
                <Text style={styles.label}>{LABELS[key]}</Text>
                <Text style={styles.pct}>{Math.round(pcts[key])}%</Text>
              </View>
              <Slider
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={pcts[key]}
                onValueChange={(v) => setPcts((p) => ({ ...p, [key]: v }))}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.surfaceElevated}
                thumbTintColor={colors.primary}
              />
            </View>
          ))}
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={[styles.totalValue, !isValid && styles.totalInvalid]}>
            {Math.round(total)}%
          </Text>
        </View>
        {!isValid && (
          <Text style={styles.error}>Total must equal 100% to save.</Text>
        )}

        <TouchableOpacity
          style={[styles.saveBtn, (!isValid || saving) && styles.saveBtnDisabled]}
          disabled={!isValid || saving}
          onPress={handleSave}
          activeOpacity={0.7}
        >
          <Text style={styles.saveBtnText}>
            {saving ? 'Saving…' : 'Save'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.groupedBackground },
  container: { padding: spacing.lg, paddingBottom: 48 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.groupedBackground,
  },
  title: { ...typography.largeTitle, color: colors.text, marginBottom: 8 },
  subtitle: { ...typography.subhead, color: colors.textMuted, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  row: { padding: spacing.md },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: { ...typography.headline, color: colors.text },
  pct: { ...typography.headline, color: colors.primary },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  totalLabel: { ...typography.headline, color: colors.text },
  totalValue: { ...typography.headline, color: colors.success },
  totalInvalid: { color: colors.danger },
  error: { color: colors.danger, fontSize: 13, marginBottom: spacing.md },
  saveBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  saveBtnDisabled: { opacity: 0.45 },
  saveBtnText: { ...typography.headline, color: '#fff' },
});
