import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radius } from '../../theme';
import { formatCurrency } from '../../utils/format';
import { AllocationBucket, nextPeriod } from '../../finance-engine/allocation';

const TONE: Record<string, string> = {
    loans: colors.danger,         // red — debt
    essentials: colors.primary,   // blue — must-have
    lifestyle: colors.warning,    // amber — discretionary
    goals: colors.chart[3],
    investments: colors.success,  // green — wealth building
};


export default function AllocationCard({
    buckets,
    onEdit,
    subtitle,
}: {
    buckets: AllocationBucket[];
    onEdit?: () => void;
    subtitle?: string;
}) {

    const [horizon, setHorizon] = useState<'quarter' | 'year'>('quarter');
    const factor = horizon === 'quarter' ? 3 : 12;
    const period = nextPeriod(horizon);

    return (
        <View style={s.card}>
            <View style={s.headerRow}>
                <View>
                    <Text style={s.title}>Capital allocation</Text>
                    <Text style={s.subtitle}>
                        {subtitle ?? `Plan for ${period}`}
                    </Text>
                </View>
                <View style={s.toggle}>
                    {(['quarter', 'year'] as const).map((h) => (
                        <TouchableOpacity
                            key={h}
                            onPress={() => setHorizon(h)}
                            style={[s.toggleBtn, horizon === h && s.toggleBtnActive]}
                        >
                            <Text style={[s.toggleText, horizon === h && s.toggleTextActive]}>
                                {h === 'quarter' ? 'Next Q' : 'Next Y'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={s.stackedBar}>
                {buckets.map((b) => (
                    <View
                        key={b.key}
                        style={{
                            flex: Math.max(b.recommendedPct, 0.5),
                            backgroundColor: TONE[b.key],
                        }}
                    />
                ))}
            </View>

            {buckets.map((b) => (
                <View key={b.key} style={s.row}>
                    <View style={s.rowLeft}>
                        <View style={[s.dot, { backgroundColor: TONE[b.key] }]} />
                        <Text style={s.rowLabel}>{b.label}</Text>
                        <Text style={s.rowPct}>{b.recommendedPct.toFixed(0)}%</Text>
                    </View>
                    <Text style={s.rowAmount}>
                        {formatCurrency(b.recommendedAmount * factor, true)}
                    </Text>
                </View>
            ))}

            {buckets.find((b) => b.key === 'goals')?.subGoals && (
                <View style={s.subBlock}>
                    <Text style={s.subTitle}>Goals breakdown</Text>
                    {buckets.find((b) => b.key === 'goals')!.subGoals!.map((g) => (
                        <View key={g.label} style={s.subRow}>
                            <Text style={s.subLabel}>{g.label}</Text>
                            <Text style={s.subAmount}>{formatCurrency(g.amount * factor, true)}</Text>
                        </View>
                    ))}
                </View>
            )}

            {onEdit && (
                <TouchableOpacity style={s.editBtn} onPress={onEdit}>
                    <Text style={s.editText}>Customize allocation</Text>
                </TouchableOpacity>
            )}
            
        </View>

    );
}

const s = StyleSheet.create({
    card: {
        backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.separator,
        marginBottom: spacing.md,
    },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
    title: { color: colors.text, fontSize: 18, fontWeight: '800' },
    subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
    toggle: { flexDirection: 'row', backgroundColor: colors.surfaceElevated, borderRadius: radius.md, padding: 2 },
    toggleBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.sm },
    toggleBtnActive: { backgroundColor: colors.surfaceElevated },
    toggleText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
    toggleTextActive: { color: colors.text },
    stackedBar: { flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: spacing.md },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
    rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    rowLabel: { color: colors.text, fontSize: 14, fontWeight: '600', flex: 1 },
    rowPct: { color: colors.textMuted, fontSize: 12, marginRight: 8 },
    rowAmount: { color: colors.text, fontSize: 14, fontWeight: '700' },
    subBlock: {
        marginTop: spacing.md, paddingTop: spacing.md,
        borderTopWidth: 1, borderTopColor: colors.border,
    },
    subTitle: { color: colors.textSecondary, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 },
    subRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, paddingLeft: spacing.md },
    subLabel: { color: colors.text, fontSize: 13 },
    subAmount: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
    editBtn: {
        marginTop: spacing.md,
        backgroundColor: colors.surfaceSecondary,
        borderRadius: radius.md,
        paddingVertical: 12,
        alignItems: 'center',
    },
    editText: { color: colors.primary, fontWeight: '600', fontSize: 15 },
});