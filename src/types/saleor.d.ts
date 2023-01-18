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
    type: string;
  }[];
}

interface SaleorAddress {
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  countryArea: string;
}
