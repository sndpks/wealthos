import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../services/supabase';
import { DEFAULT_USER_ID } from '../constants/app';
import {
  computeFinancialSnapshot,
  type FinancialSnapshot,
  type RawFinancialData,
} from '../finance-engine/financialEngine';
import type { Expense, Income, Asset, Liability } from '../types/finance';

export function useFinancialEngine() {
  const [raw, setRaw] = useState<RawFinancialData>({
    expenses: [],
    income: [],
    assets: [],
    liabilities: [],
    savedBuckets: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [e, i, a, l, alloc] = await Promise.all([
        supabase.from('expenses').select('*'),
        supabase.from('income').select('*'),
        supabase.from('assets').select('*'),
        supabase.from('liabilities').select('*'),
        supabase
          .from('allocations')
          .select('buckets')
          .eq('user_id', DEFAULT_USER_ID)
          .maybeSingle(),
      ]);

      const firstErr =
        e.error?.message ??
        i.error?.message ??
        a.error?.message ??
        l.error?.message;
      if (firstErr) setError(firstErr);

      setRaw({
        expenses: (e.data ?? []) as Expense[],
        income: (i.data ?? []) as Income[],
        assets: (a.data ?? []) as Asset[],
        liabilities: (l.data ?? []) as Liability[],
        savedBuckets: alloc.data?.buckets ?? null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const snapshot: FinancialSnapshot = useMemo(
    () => computeFinancialSnapshot(raw),
    [raw],
  );

  return {
    ...snapshot,
    loading,
    error,
    reload: load,
    raw,
  };
}
