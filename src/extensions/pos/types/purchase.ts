import { Receipt } from "./receipt";

export interface Purchase {
  number: string;
  checkout_session?: string;
  main_payment_identifier?: string;
  date_initiated: string;
  date_confirmed: string;
  currency?: string;
  site_code: string;
  locale: string;
  country_code: string;
  email: string;
  phone?: string;
}

export interface PurchaseDetail {
  purchase: Purchase;
  receipts: Receipt[];
}
