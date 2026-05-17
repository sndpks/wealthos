import React, { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { todayISO } from '../utils/dates';
import FormScreen from '../components/forms/FormScreen';

export default function AddExpenseScreen({ navigation }: { navigation: { goBack: () => void } }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveExpense() {
    const trimmed = category.trim();
    const value = Number(amount);
    if (!trimmed || !value || value <= 0) {
      Alert.alert('Invalid entry', 'Enter a category and amount greater than zero.');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('expenses').insert([
      {
        category: trimmed,
        amount: value,
        date: todayISO(),
        fixed: false,
        mandatory: false,
      },
    ]);
    setSaving(false);

    if (error) {
      Alert.alert('Error', error.message ?? 'Could not save expense');
    } else {
      navigation.goBack();
    }
  }

  return (
    <FormScreen
      title="New Expense"
      saveLabel="Save Expense"
      saving={saving}
      disabled={!category.trim() || !amount}
      onSave={saveExpense}
      fields={[
        { label: 'Category', value: category, onChangeText: setCategory, placeholder: 'e.g. Rent' },
        { label: 'Amount', value: amount, onChangeText: setAmount, keyboardType: 'decimal-pad', placeholder: '₹' },
      ]}
    />
  );
}
