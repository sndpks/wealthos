export type DatedRow = { date: string; amount: number | string };
export type QuarterKey = string; // "2026-Q1"

export function quarterKey(d: Date): QuarterKey {
    return `${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3) + 1}`;
}

export function groupByQuarter(rows: DatedRow[]): Record<QuarterKey, number> {
    const out: Record<string, number> = {};
    rows.forEach((r) => {
        if (!r.date) return;
        const k = quarterKey(new Date(r.date));
        out[k] = (out[k] ?? 0) + Number(r.amount);
    });
    return out;
}

export function monthsOfHistory(rows: { date?: string }[]): number {
    const dates = rows.map((r) => r.date && new Date(r.date).getTime()).filter(Boolean) as number[];
    if (dates.length < 2) return 0;
    const span = Math.max(...dates) - Math.min(...dates);
    return span / (1000 * 60 * 60 * 24 * 30);
}

export function hasEnoughHistory(rows: { date?: string }[], minMonths = 3): boolean {
    return monthsOfHistory(rows) >= minMonths;
}

export type QuarterPnL = {
    quarter: QuarterKey;
    income: number;
    expenses: number;
    savings: number;
    savingsRatePct: number;
};

export function buildQuarterlyPnL(
    incomeRows: DatedRow[],
    expenseRows: DatedRow[],
): QuarterPnL[] {
    const incQ = groupByQuarter(incomeRows);
    const expQ = groupByQuarter(expenseRows);
    const all = new Set<string>([...Object.keys(incQ), ...Object.keys(expQ)]);
    return [...all]
        .sort()
        .map((q) => {
            const income = incQ[q] ?? 0;
            const expenses = expQ[q] ?? 0;
            const savings = income - expenses;
            return {
                quarter: q,
                income,
                expenses,
                savings,
                savingsRatePct: income > 0 ? (savings / income) * 100 : 0,
            };
        });
}

export function qoqDelta(curr: number, prev: number): number {
    if (!prev) return 0;
    return ((curr - prev) / prev) * 100;
}