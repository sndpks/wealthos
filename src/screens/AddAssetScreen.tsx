import React, { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../services/supabase';
import FormScreen from '../components/forms/FormScreen';

export default function AddAssetScreen({ navigation }: { navigation: { goBack: () => void } }) {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveAsset() {
    const trimmed = type.trim().toLowerCase();
    const num = Number(value);
    if (!trimmed || !num || num <= 0) {
      Alert.alert('Invalid entry', 'Enter asset type and value greater than zero.');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('assets').insert([{ type: trimmed, value: num }]);
    setSaving(false);

    if (error) {
      Alert.alert('Error', error.message ?? 'Could not save asset');
    } else {
      navigation.goBack();
    }
  }

  return (
    <FormScreen
      title="New Asset"
      saveLabel="Save Asset"
      saving={saving}
      disabled={!type.trim() || !value}
      onSave={saveAsset}
      fields={[
        { label: 'Type', value: type, onChangeText: setType, placeholder: 'e.g. savings, mf, cash' },
        { label: 'Value', value: value, onChangeText: setValue, keyboardType: 'decimal-pad', placeholder: '₹' },
      ]}
    />
  );
}
