import React, { createContext, useReducer, useContext } from 'react';
import { toast } from 'react-toastify';
import { mockCustomers, mockTransactions } from '../data/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

// Action types
const ADD_CUSTOMER = 'ADD_CUSTOMER';
const ADD_LOAN = 'ADD_LOAN';
const ADD_REPAYMENT = 'ADD_REPAYMENT';

// Initial state
const initialState = {
  customers: mockCustomers,
  transactions: mockTransactions,
};

// Reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    case ADD_LOAN:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case ADD_REPAYMENT:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.transactionId
            ? {
                ...transaction,
                repayments: [...(transaction.repayments || []), action.payload.repayment],
                remainingAmount: transaction.remainingAmount - action.payload.repayment.amount,
              }
            : transaction
        ),
      };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Add a new customer
  const addCustomer = (customer) => {
    const newCustomer = {
      id: `customer-${Date.now()}`,
      ...customer,
      createdAt: new Date().toISOString(),
    };
    
    dispatch({ type: ADD_CUSTOMER, payload: newCustomer });
    toast.success(`Customer ${newCustomer.name} added successfully!`);
    return newCustomer;
  };

  // Add a new loan
  const addLoan = (loan) => {
    const newLoan = {
      id: `transaction-${Date.now()}`,
      ...loan,
      createdAt: new Date().toISOString(),
      repayments: [],
      remainingAmount: loan.amount,
    };
    
    dispatch({ type: ADD_LOAN, payload: newLoan });
    toast.success(`Loan added successfully!`);
    return newLoan;
  };

  // Add a repayment to a loan
  const addRepayment = (transactionId, repayment) => {
    const transaction = state.transactions.find(t => t.id === transactionId);
    
    if (!transaction) {
      toast.error('Transaction not found');
      return;
    }
    
    if (repayment.amount > transaction.remainingAmount) {
      toast.error('Repayment amount cannot exceed remaining balance');
      return;
    }
    
    const newRepayment = {
      id: `repayment-${Date.now()}`,
      ...repayment,
      date: repayment.date || new Date().toISOString(),
    };
    
    dispatch({
      type: ADD_REPAYMENT,
      payload: { transactionId, repayment: newRepayment },
    });
    
    toast.success('Repayment recorded successfully!');
  };

  // Get all customers
  const getCustomers = () => {
    return state.customers;
  };

  // Get a specific customer by ID
  const getCustomerById = (id) => {
    return state.customers.find(customer => customer.id === id);
  };

  // Get all transactions for a specific customer
  const getTransactionsByCustomerId = (customerId) => {
    return state.transactions.filter(transaction => transaction.customerId === customerId);
  };

  // Calculate total outstanding balance for a customer
  const calculateOutstandingBalance = (customerId) => {
    const customerTransactions = getTransactionsByCustomerId(customerId);
    return customerTransactions.reduce((total, transaction) => total + transaction.remainingAmount, 0);
  };

  // Calculate the next due date for a customer
  const calculateNextDueDate = (customerId) => {
    const customerTransactions = getTransactionsByCustomerId(customerId);
    const dueDates = customerTransactions
      .filter(transaction => transaction.remainingAmount > 0)
      .map(transaction => new Date(transaction.dueDate));
    
    if (dueDates.length === 0) return null;
    
    return new Date(Math.min(...dueDates));
  };

  // Check if a customer has overdue loans
  const hasOverdueLoans = (customerId) => {
    const customerTransactions = getTransactionsByCustomerId(customerId);
    const today = new Date();
    
    return customerTransactions.some(transaction => 
      transaction.remainingAmount > 0 && new Date(transaction.dueDate) < today
    );
  };

  const value = {
    customers: state.customers,
    transactions: state.transactions,
    addCustomer,
    addLoan,
    addRepayment,
    getCustomers,
    getCustomerById,
    getTransactionsByCustomerId,
    calculateOutstandingBalance,
    calculateNextDueDate,
    hasOverdueLoans,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};