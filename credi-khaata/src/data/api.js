const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const api = {
  // Auth related API calls
  auth: {
    login: async (email, password) => {
      await delay(1000); // Simulate network delay
      
      if (email && password) {
        return { id: '1', email, name: email.split('@')[0] };
      }
      
      throw new Error('Invalid credentials');
    },
    
    signup: async (email, password, name) => {
      await delay(1000);
      
      if (email && password && name) {
        return { id: '1', email, name };
      }
      
      throw new Error('Invalid information');
    },
  },
  
  // Customer related API calls
  customers: {
    getAll: async () => {
      await delay(500);
      return [...mockCustomers];
    },
    
    getById: async (id) => {
      await delay(300);
      const customer = mockCustomers.find(c => c.id === id);
      
      if (!customer) {
        throw new Error('Customer not found');
      }
      
      return { ...customer };
    },
    
    create: async (customerData) => {
      await delay(800);
      
      const newCustomer = {
        id: `customer-${Date.now()}`,
        ...customerData,
        createdAt: new Date().toISOString(),
      };
      
      return newCustomer;
    },
  },
  
  // Transaction related API calls
  transactions: {
    getByCustomerId: async (customerId) => {
      await delay(500);
      return mockTransactions.filter(t => t.customerId === customerId).map(t => ({ ...t }));
    },
    
    create: async (transactionData) => {
      await delay(800);
      
      const newTransaction = {
        id: `transaction-${Date.now()}`,
        ...transactionData,
        createdAt: new Date().toISOString(),
        repayments: [],
        remainingAmount: transactionData.amount,
      };
      
      return newTransaction;
    },
    
    addRepayment: async (transactionId, repaymentData) => {
      await delay(600);
      
      const transaction = mockTransactions.find(t => t.id === transactionId);
      
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      
      if (repaymentData.amount > transaction.remainingAmount) {
        throw new Error('Repayment amount cannot exceed remaining balance');
      }
      
      const newRepayment = {
        id: `repayment-${Date.now()}`,
        ...repaymentData,
        date: repaymentData.date || new Date().toISOString(),
      };
      
      return newRepayment;
    },
  },
};
