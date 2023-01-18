interface Transaction {
  id: string;
  created: Date;
  status: string;
}

interface TransactionDetails extends Transaction {
  billingAddress: SaleorAddress;
  shippingAddress: SaleorAddress;
  total: {
    gross: {
      amount: number;
    };
    net: {
      amount: number;
    };
    tax: {
      amount: number;
    };
  };
  lines: {
    productName: string;
    quantity: number;
  }[];
  events: {
    date: Date;
    type: EventType;
  }[];
}

interface SaleorAddress {
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  countryArea: string;
}

type EventType =
  | "ORDER_CREATED"
  | "ORDER_CREATED_FROM_REPLACE"
  | "ORDER_ADDED_PRODUCTS"
  | "ORDER_REMOVED_PRODUCTS"
  | "ORDER_PLACED"
  | "ORDER_PLACED_FROM_DRAFT"
  | "ORDER_OVERSOLD_ITEMS"
  | "ORDER_CANCELED"
  | "ORDER_MARKED_AS_PAID"
  | "ORDER_FULLY_PAID"
  | "ORDER_REPLACEMENT_CREATED"
  | "ORDER_DISCOUNT_ADDED"
  | "ORDER_DISCOUNT_AUTOMATICALLY_UPDATED"
  | "ORDER_DISCOUNT_UPDATED"
  | "ORDER_DISCOUNT_DELETED"
  | "ORDER_LINE_DISCOUNT_UPDATED"
  | "ORDER_LINE_DISCOUNT_REMOVED"
  | "ORDER_LINE_PRODUCT_DELETED"
  | "ORDER_LINE_VARIANT_DELETED"
  | "ORDER_UPDATED_ADDRESS"
  | "ORDER_EMAIL_SENT"
  | "ORDER_CONFIRMED"
  | "ORDER_PAYMENT_AUTHORIZED"
  | "ORDER_PAYMENT_CAPTURED"
  | "ORDER_EXTERNAL_SERVICE_NOTIFICATION"
  | "ORDER_PAYMENT_REFUNDED"
  | "ORDER_PAYMENT_VOIDED"
  | "ORDER_PAYMENT_FAILED"
  | "ORDER_TRANSACTION_EVENT"
  | "ORDER_TRANSACTION_CAPTURE_REQUESTED"
  | "ORDER_TRANSACTION_REFUND_REQUESTED"
  | "ORDER_TRANSACTION_VOID_REQUESTED"
  | "ORDER_INVOICE_REQUESTED";
