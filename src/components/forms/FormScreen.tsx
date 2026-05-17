import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { formStyles } from '../../theme/formStyles';
import { colors, typography } from '../../theme';

type Field = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
};

type Props = {
  title: string;
  fields: Field[];
  onSave: () => void;
  saveLabel: string;
  saving?: boolean;
  disabled?: boolean;
};

export default function FormScreen({
  title,
  fields,
  onSave,
  saveLabel,
  saving = false,
  disabled = false,
}: Props) {
  return (
    <KeyboardAvoidingView
      style={formStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={formStyles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>{title}</Text>

        <Text style={formStyles.sectionLabel}>Details</Text>
        <View style={formStyles.section}>
          {fields.map((field, index) => (
            <View
              key={field.label}
              style={[
                formStyles.field,
                index === fields.length - 1 && formStyles.fieldLast,
              ]}
            >
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <TextInput
                style={formStyles.input}
                placeholder={field.placeholder ?? field.label}
                placeholderTextColor={colors.textMuted}
                value={field.value}
                onChangeText={field.onChangeText}
                keyboardType={field.keyboardType ?? 'default'}
                autoCapitalize="sentences"
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            formStyles.saveButton,
            (disabled || saving) && formStyles.saveButtonDisabled,
          ]}
          onPress={onSave}
          disabled={disabled || saving}
          activeOpacity={0.7}
        >
          <Text style={formStyles.saveButtonText}>
            {saving ? 'Saving…' : saveLabel}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.largeTitle,
    color: colors.text,
    marginBottom: 24,
  },
  fieldLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 4,
  },
});
