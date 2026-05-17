export type Asset = { id: string | number; type: string; value: number };
export type Liability = { id: string | number; type: string; outstanding: number; emi: number };

export type BalanceSheet = {
    assetsByType: Record<string, number>;
    liabilitiesByType: Record<string, number>;
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
    debtToAssetPct: number;
    liquidAssets: number;
    currentRatio: number; // liquid / short-term liabilities
};

const LIQUID_TYPES = ['cash', 'savings', 'fd', 'liquid', 'mf'];

export function buildBalanceSheet(assets: Asset[], liabilities: Liability[]): BalanceSheet {
    const assetsByType: Record<string, number> = {};
    assets.forEach((a) => {
        assetsByType[a.type] = (assetsByType[a.type] ?? 0) + Number(a.value);
    });

    const liabilitiesByType: Record<string, number> = {};
    liabilities.forEach((l) => {
        liabilitiesByType[l.type] = (liabilitiesByType[l.type] ?? 0) + Number(l.outstanding);
    });

    const totalAssets = Object.values(assetsByType).reduce((a, b) => a + b, 0);
    const totalLiabilities = Object.values(liabilitiesByType).reduce((a, b) => a + b, 0);
    const liquidAssets = LIQUID_TYPES.reduce((sum, t) => sum + (assetsByType[t] ?? 0), 0);
    const shortTermEmi = liabilities.reduce((s, l) => s + Number(l.emi) * 12, 0);

    return {
        assetsByType,
        liabilitiesByType,
        totalAssets,
        totalLiabilities,
        netWorth: totalAssets - totalLiabilities,
        debtToAssetPct: totalAssets ? (totalLiabilities / totalAssets) * 100 : 0,
        liquidAssets,
        currentRatio: shortTermEmi ? liquidAssets / shortTermEmi : 0,
    };
}