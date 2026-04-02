export type Transaction = {
  id: string;
  date: string;
  time: string;
  merchant: {
    name: string;
    icon: string;
  };
  amount: number;
  paymentMethod: {
    type: string;
    last4?: string;
  };
  location: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: string;
  statusColor: string;
};

export const mockTransactions: Transaction[] = [
  {
    id: 'TRX-9982-AB',
    date: 'Oct 24, 2023',
    time: '14:32:01 PM',
    merchant: {
      name: 'TechGizmo Inc.',
      icon: 'store',
    },
    amount: 1250.0,
    paymentMethod: {
      type: 'Visa',
      last4: '4242',
    },
    location: 'US',
    riskScore: 88,
    riskLevel: 'high',
    status: 'Fraud',
    statusColor: 'red',
  },
  {
    id: 'TRX-9981-AC',
    date: 'Oct 24, 2023',
    time: '14:28:45 PM',
    merchant: {
      name: 'Urban Styles',
      icon: 'shopping-bag',
    },
    amount: 342.5,
    paymentMethod: {
      type: 'PayPal',
    },
    location: 'CA',
    riskScore: 45,
    riskLevel: 'medium',
    status: 'Review',
    statusColor: 'yellow',
  },
];
