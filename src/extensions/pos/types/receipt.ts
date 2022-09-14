export interface Receipt {
  total_amount: string;
  total_discount_amount: string;
  total_tax_amount: string;
  date_settled?: string;
  intention: "payment" | "cancellation" | "refund";
  lines: ReceiptLine[];
}

export interface ReceiptLine {
  reference: string;
  title: string;
  line_number: number;
  item_type: string;
  quantity: number;
  unit_price: string;
  total_amount: string;
  total_discount_amount: string;
  discounts: ReceiptLineDiscount[];
  tax_rate: string;
  tax_code: string;
  total_tax_amount: string;
}

export interface ReceiptLineDiscount {
  title: string;
  amount: string;
}
