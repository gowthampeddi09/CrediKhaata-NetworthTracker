export const mockCustomers = [
    {
      id: 'customer-1',
      name: 'Rajesh Kumar',
      phone: '9876543210',
      address: '123 Main Street, Delhi',
      email: 'rajesh@example.com',
      createdAt: '2023-01-01T12:00:00Z',
    },
    {
      id: 'customer-2',
      name: 'Priya Sharma',
      phone: '8765432109',
      address: '456 Park Avenue, Mumbai',
      email: 'priya@example.com',
      createdAt: '2023-01-15T10:30:00Z',
    },
    {
      id: 'customer-3',
      name: 'Amit Patel',
      phone: '7654321098',
      address: '789 Garden Road, Bangalore',
      email: 'amit@example.com',
      createdAt: '2023-02-05T14:15:00Z',
    },
  ];
  
  export const mockTransactions = [
    {
      id: 'transaction-1',
      customerId: 'customer-1',
      item: 'Monthly groceries',
      amount: 5000,
      dueDate: '2023-06-30T23:59:59Z',
      createdAt: '2023-06-01T09:00:00Z',
      repayments: [
        {
          id: 'repayment-1',
          amount: 2000,
          date: '2023-06-15T10:30:00Z',
        },
      ],
      remainingAmount: 3000,
    },
    {
      id: 'transaction-2',
      customerId: 'customer-1',
      item: 'School supplies',
      amount: 3000,
      dueDate: '2023-06-20T23:59:59Z',
      createdAt: '2023-06-05T11:45:00Z',
      repayments: [],
      remainingAmount: 3000,
    },
    {
      id: 'transaction-3',
      customerId: 'customer-2',
      item: 'Party decoration items',
      amount: 8000,
      dueDate: '2023-07-15T23:59:59Z',
      createdAt: '2023-06-10T13:20:00Z',
      repayments: [
        {
          id: 'repayment-2',
          amount: 4000,
          date: '2023-06-25T16:10:00Z',
        },
      ],
      remainingAmount: 4000,
    },
    {
      id: 'transaction-4',
      customerId: 'customer-3',
      item: 'Electronic gadgets',
      amount: 15000,
      dueDate: '2023-05-30T23:59:59Z',
      createdAt: '2023-05-01T15:40:00Z',
      repayments: [
        {
          id: 'repayment-3',
          amount: 5000,
          date: '2023-05-15T14:00:00Z',
        },
        {
          id: 'repayment-4',
          amount: 5000,
          date: '2023-06-01T14:00:00Z',
        },
      ],
      remainingAmount: 5000,
    },
  ];
  