import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, radius } from '../../theme';
import { formatCurrency } from '../../utils/format';
import { QuarterPnL, qoqDelta } from '../../finance-engine/quarterly';

export default function QuarterlyPnLTable({ data }: { data: QuarterPnL[] }) {
    if (!data.length) return null;
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.wrap}>
            <View style={s.table}>
                <Row header cells={['Quarter', 'Income', 'Expenses', 'Savings', 'Rate', 'QoQ']} />
                {data.map((q, i) => {
                    const prev = data[i - 1];
                    const delta = prev ? qoqDelta(q.savings, prev.savings) : 0;
                    return (
                        <Row
                            key={q.quarter}
                            cells={[
                                q.quarter,
                                formatCurrency(q.income, true),
                                formatCurrency(q.expenses, true),
                                formatCurrency(q.savings, true),
                                `${q.savingsRatePct.toFixed(1)}%`,
                                prev ? `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%` : '—',
                            ]}
                            deltaColor={delta >= 0 ? colors.success : colors.danger}
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
}

function Row({
    cells, header, deltaColor,
}: { cells: string[]; header?: boolean; deltaColor?: string }) {
    return (
        <View style={[s.row, header && s.headerRow]}>
            {cells.map((c, i) => (
                <Text
                    key={i}
                    style={[
                        s.cell,
                        header && s.headerCell,
                        i === cells.length - 1 && !header && deltaColor && { color: deltaColor },
                    ]}
                >
                    {c}
                </Text>
            ))}
        </View>
    );
}

const s = StyleSheet.create({
    wrap: { marginBottom: spacing.lg },
    table: {
        borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg,
        backgroundColor: colors.surface, overflow: 'hidden',
    },
    row: { flexDirection: 'row' },
    headerRow: { backgroundColor: colors.surfaceElevated },
    cell: {
        width: 110, paddingVertical: 12, paddingHorizontal: 10,
        color: colors.text, fontSize: 13, fontWeight: '600',
        borderTopWidth: 1, borderTopColor: colors.border,
    },
    headerCell: { color: colors.textMuted, fontSize: 11, textTransform: 'uppercase', borderTopWidth: 0 },
});