type ExpenseRow = {
  category: string;
  amount: number;
};

export function aggregateByCategory(expenses: ExpenseRow[]) {
  const totals = new Map<string, number>();

  for (const expense of expenses) {
    const key = expense.category?.trim() || 'Other';
    const amount = Number(expense.amount) || 0;
    totals.set(key, (totals.get(key) ?? 0) + amount);
  }

  const entries = [...totals.entries()].sort((a, b) => b[1] - a[1]);

  return {
    labels: entries.map(([label]) => label),
    amounts: entries.map(([, amount]) => amount),
  };
}
