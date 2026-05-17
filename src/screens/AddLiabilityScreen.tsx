import React, { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../services/supabase';
import FormScreen from '../components/forms/FormScreen';

export default function AddLiabilityScreen({ navigation }: { navigation: { goBack: () => void } }) {
  const [type, setType] = useState('');
  const [outstanding, setOutstanding] = useState('');
  const [emi, setEmi] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveLiability() {
    const trimmed = type.trim();
    const out = Number(outstanding);
    const emiVal = Number(emi);
    if (!trimmed || !out || out <= 0 || !emiVal || emiVal <= 0) {
      Alert.alert('Invalid entry', 'Enter type, outstanding balance, and monthly EMI.');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('liabilities').insert([
      {
        type: trimmed,
        outstanding: out,
        emi: emiVal,
        interest_rate: Number(interestRate) || 0,
      },
    ]);
    setSaving(false);

    if (error) {
      Alert.alert('Error', error.message ?? 'Could not save liability');
    } else {
      navigation.goBack();
    }
  }

  return (
    <FormScreen
      title="New Liability"
      saveLabel="Save Liability"
      saving={saving}
      disabled={!type.trim() || !outstanding || !emi}
      onSave={saveLiability}
      fields={[
        { label: 'Type', value: type, onChangeText: setType, placeholder: 'e.g. Home Loan' },
        { label: 'Outstanding', value: outstanding, onChangeText: setOutstanding, keyboardType: 'decimal-pad' },
        { label: 'Monthly EMI', value: emi, onChangeText: setEmi, keyboardType: 'decimal-pad' },
        { label: 'Interest rate %', value: interestRate, onChangeText: setInterestRate, keyboardType: 'decimal-pad' },
      ]}
    />
  );
}
