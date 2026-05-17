export function todayISO(): string {
  return new Date().toISOString();
}

export function isCurrentMonth(dateStr?: string | null): boolean {
  if (!dateStr) return true;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return true;
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}
