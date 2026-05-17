import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../theme';
import { formatCurrency } from '../../utils/format';
import { BalanceSheet } from '../../finance-engine/balanceSheet';

export default function BalanceSheetCard({ bs }: { bs: BalanceSheet }) {
    return (
        <View style={s.card}>
            <Text style={s.title}>Balance Sheet</Text>

            <Section title="Assets" total={bs.totalAssets} items={bs.assetsByType} positive />
            <Section title="Liabilities" total={bs.totalLiabilities} items={bs.liabilitiesByType} />

            <View style={s.netRow}>
                <Text style={s.netLabel}>Net Worth</Text>
                <Text style={s.netValue}>{formatCurrency(bs.netWorth, true)}</Text>
            </View>

            <View style={s.ratios}>
                <Ratio label="Debt / Asset" value={`${bs.debtToAssetPct.toFixed(1)}%`} />
                <Ratio label="Current Ratio" value={bs.currentRatio.toFixed(2)} />
                <Ratio label="Liquid" value={formatCurrency(bs.liquidAssets, true)} />
            </View>
        </View>
    );
}

function Section({
    title, total, items, positive,
}: { title: string; total: number; items: Record<string, number>; positive?: boolean }) {
    return (
        <View style={s.section}>
            <View style={s.sectionHeader}>
                <Text style={s.sectionTitle}>{title}</Text>
                <Text style={[s.sectionTotal, { color: positive ? colors.success : colors.danger }]}>
                    {formatCurrency(total, true)}
                </Text>
            </View>
            {Object.entries(items).map(([k, v]) => (
                <View key={k} style={s.lineItem}>
                    <Text style={s.lineLabel}>{k}</Text>
                    <Text style={s.lineValue}>{formatCurrency(v, true)}</Text>
                </View>
            ))}
        </View>
    );
}

function Ratio({ label, value }: { label: string; value: string }) {
    return (
        <View style={s.ratio}>
            <Text style={s.ratioValue}>{value}</Text>
            <Text style={s.ratioLabel}>{label}</Text>
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
    title: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: spacing.md },
    section: { marginBottom: spacing.md },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    sectionTitle: { color: colors.textSecondary, fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
    sectionTotal: { fontSize: 14, fontWeight: '800' },
    lineItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
    lineLabel: { color: colors.text, fontSize: 14, textTransform: 'capitalize' },
    lineValue: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
    netRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        paddingTop: spacing.md, marginTop: spacing.sm,
        borderTopWidth: 1, borderTopColor: colors.border,
    },
    netLabel: { color: colors.text, fontSize: 16, fontWeight: '700' },
    netValue: { color: colors.success, fontSize: 20, fontWeight: '800' },
    ratios: {
        flexDirection: 'row', marginTop: spacing.md,
        paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border,
    },
    ratio: { flex: 1, alignItems: 'center' },
    ratioValue: { color: colors.text, fontSize: 16, fontWeight: '800' },
    ratioLabel: { color: colors.textMuted, fontSize: 11, marginTop: 2, textTransform: 'uppercase' },
});