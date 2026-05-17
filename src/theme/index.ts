/** Enterprise personal-finance palette — muted, trustworthy, high contrast */
export const colors = {
  background: '#0F1419',
  groupedBackground: '#0F1419',
  surface: '#1A2332',
  surfaceSecondary: '#243044',
  surfaceElevated: '#2D3A4F',
  border: '#334155',
  separator: 'rgba(148, 163, 184, 0.22)',
  primary: '#5B8DEF',
  primaryMuted: 'rgba(91, 141, 239, 0.14)',
  success: '#6B9E78',
  successMuted: 'rgba(107, 158, 120, 0.16)',
  warning: '#D4A574',
  warningMuted: 'rgba(212, 165, 116, 0.16)',
  danger: '#C97B7B',
  dangerMuted: 'rgba(201, 123, 123, 0.16)',
  text: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  fill: '#64748B',
  heroAccent: '#4A6FA5',
  chart: ['#5B8DEF', '#6B9E78', '#D4A574', '#8B9DC3', '#A78B9D', '#7BA3B8'],
  chartRgb: {
    primary: '91, 141, 239',
    success: '107, 158, 120',
    warning: '212, 165, 116',
    danger: '201, 123, 123',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;

export const typography = {
  largeTitle: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.5 },
  title2: { fontSize: 22, fontWeight: '600' as const, letterSpacing: -0.3 },
  headline: { fontSize: 17, fontWeight: '600' as const, letterSpacing: -0.2 },
  body: { fontSize: 17, fontWeight: '400' as const },
  callout: { fontSize: 16, fontWeight: '500' as const },
  subhead: { fontSize: 15, fontWeight: '400' as const },
  footnote: { fontSize: 13, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '500' as const },
  metric: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
};
