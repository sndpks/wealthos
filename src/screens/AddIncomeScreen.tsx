import React, { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { todayISO } from '../utils/dates';
import FormScreen from '../components/forms/FormScreen';

export default function AddIncomeScreen({ navigation }: { navigation: { goBack: () => void } }) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveIncome() {
    const trimmed = source.trim();
    const value = Number(amount);
    if (!trimmed || !value || value <= 0) {
      Alert.alert('Invalid entry', 'Enter a source and amount greater than zero.');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('income').insert([
      {
        source: trimmed,
        amount: value,
        date: todayISO(),
        recurring: true,
      },
    ]);
    setSaving(false);

    if (error) {
      Alert.alert('Error', error.message ?? 'Could not save income');
    } else {
      navigation.goBack();
    }
  }

  return (
    <FormScreen
      title="New Income"
      saveLabel="Save Income"
      saving={saving}
      disabled={!source.trim() || !amount}
      onSave={saveIncome}
      fields={[
        { label: 'Source', value: source, onChangeText: setSource, placeholder: 'e.g. Salary' },
        { label: 'Amount', value: amount, onChangeText: setAmount, keyboardType: 'decimal-pad', placeholder: '₹' },
      ]}
    />
  );
}
