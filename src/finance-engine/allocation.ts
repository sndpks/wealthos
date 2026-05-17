export type Bucket = 'loans' | 'essentials' | 'lifestyle' | 'goals' | 'investments';

export type AllocationBucket = {
    key: Bucket;
    label: string;
    recommendedPct: number;
    recommendedAmount: number;
    subGoals?: { label: string; pct: number; amount: number }[];
};

export function recommendAllocation(
    income: number,
    emi: number,
): AllocationBucket[] {
    const emiPct = income > 0 ? Math.min((emi / income) * 100, 50) : 0;
    const remaining = 100 - emiPct;

    // Distribute remaining across 4 buckets with sensible defaults
    const essentialsPct = Math.min(40, remaining * 0.5);
    const investmentsPct = Math.max(15, remaining * 0.3);
    const goalsPct = Math.max(10, remaining * 0.15);
    const lifestylePct = Math.max(5, 100 - emiPct - essentialsPct - investmentsPct - goalsPct);

    const pct = (p: number) => (income * p) / 100;

    return [
        { key: 'loans', label: 'Loan EMIs', recommendedPct: emiPct, recommendedAmount: pct(emiPct) },
        { key: 'essentials', label: 'Essentials', recommendedPct: essentialsPct, recommendedAmount: pct(essentialsPct) },
        { key: 'lifestyle', label: 'Lifestyle', recommendedPct: lifestylePct, recommendedAmount: pct(lifestylePct) },
        {
            key: 'goals', label: 'Goals', recommendedPct: goalsPct, recommendedAmount: pct(goalsPct),
            subGoals: [
                { label: 'Car', pct: 30, amount: pct(goalsPct) * 0.30 },
                { label: 'House', pct: 35, amount: pct(goalsPct) * 0.35 },
                { label: 'Gold', pct: 15, amount: pct(goalsPct) * 0.15 },
                { label: 'Vacation', pct: 20, amount: pct(goalsPct) * 0.20 },
            ],
        },
        { key: 'investments', label: 'Investments', recommendedPct: investmentsPct, recommendedAmount: pct(investmentsPct) },
    ];
}

export function currentPeriod(kind: 'quarter' | 'year' = 'quarter'): string {
    const d = new Date();
    if (kind === 'year') return `${d.getFullYear()}`;
    return `${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3) + 1}`;
}

export function nextPeriod(kind: 'quarter' | 'year' = 'quarter'): string {
    const d = new Date();
    if (kind === 'year') return `${d.getFullYear() + 1}`;
    const q = Math.floor(d.getMonth() / 3) + 2; // next quarter
    return q > 4 ? `${d.getFullYear() + 1}-Q1` : `${d.getFullYear()}-Q${q}`;
}

/** Apply user-saved bucket percentages onto a recommended allocation template. */
export function applySavedBuckets(
    income: number,
    base: AllocationBucket[],
    saved: Record<string, number>,
): AllocationBucket[] {
    const pctAmount = (p: number) => (income * p) / 100;

    return base.map((bucket) => {
        const recommendedPct = saved[bucket.key] ?? bucket.recommendedPct;
        const recommendedAmount = pctAmount(recommendedPct);
        const updated: AllocationBucket = {
            ...bucket,
            recommendedPct,
            recommendedAmount,
        };
        if (bucket.subGoals) {
            updated.subGoals = bucket.subGoals.map((g) => ({
                ...g,
                amount: recommendedAmount * (g.pct / 100),
            }));
        }
        return updated;
    });
}