export type Expense = {
  id: string;
  category: string;
  amount: number;
  date: string;
};

export type Income = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

export type Asset = {
  id: string;
  type: string;
  name?: string;
  value: number;
};

export type Liability = {
  id: string;
  type: string;
  outstanding: number;
  emi: number;
};

export type AllocationRow = {
  id: string;
  period: string;
  bucket: string;
  sub_goal?: string;
  amount: number;
};
