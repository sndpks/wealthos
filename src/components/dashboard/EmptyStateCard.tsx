import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../theme';

export default function EmptyStateCard({
    title, message, progress,
}: { title: string; message: string; progress?: number }) {
    return (
        <View style={s.card}>
            <Text style={s.title}>{title}</Text>
            <Text style={s.message}>{message}</Text>
            {progress !== undefined && (
                <View style={s.barTrack}>
                    <View style={[s.barFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
                </View>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    card: {
        backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg,
        borderWidth: 1, borderStyle: 'dashed' as any, borderColor: colors.border,
        marginBottom: spacing.lg,
    },
    title: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 6 },
    message: { color: colors.textSecondary, fontSize: 14, lineHeight: 20 },
    barTrack: {
        height: 6, backgroundColor: colors.border, borderRadius: 3,
        marginTop: spacing.md, overflow: 'hidden',
    },
    barFill: { height: '100%', backgroundColor: colors.primary },
});