import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import TransactionList from './TransactionList';
import AddLoanForm from '../forms/AddLoanForm';
import { generateCustomerStatement } from '../../utils/pdfUtils';

const CustomerDetail = () => {
  const { id } = useParams();
  const { 
    getCustomerById, 
    getTransactionsByCustomerId,
    calculateOutstandingBalance
  } = useData();
  
  const [showAddLoanForm, setShowAddLoanForm] = useState(false);
  
  const customer = getCustomerById(id);
  const transactions = getTransactionsByCustomerId(id);
  const totalOutstanding = calculateOutstandingBalance(id);
  
  const handleExportStatement = () => {
    const pdfUrl = generateCustomerStatement(customer, transactions);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${customer.name.replace(/\s+/g, '_')}_statement.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (!customer) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Customer not found.</p>
        <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <Link 
            to="/dashboard" 
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">{customer.name}</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <button 
            className="btn-primary"
            onClick={() => setShowAddLoanForm(true)}
          >
            Add New Loan
          </button>
          
          <button 
            className="btn-secondary"
            onClick={handleExportStatement}
          >
            Export Statement
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Contact Info</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>
              <span className="font-medium">Phone:</span> {customer.phone}
            </p>
            <p>
              <span className="font-medium">Email:</span> {customer.email || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Address:</span> {customer.address}
            </p>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Account Summary</h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Customer Since:</span> {new Date(customer.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Total Transactions:</span> {transactions.length}
            </p>
            <p className="text-xl font-bold mt-4">
              <span className="text-gray-700 dark:text-gray-200">Outstanding:</span>{' '}
              <span className={totalOutstanding > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                ₹{totalOutstanding.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-primary-600 to-primary-500 text-white">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              className="w-full py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md text-left px-3 transition-colors"
              onClick={() => setShowAddLoanForm(true)}
            >
              Record New Credit Sale
            </button>
            <button 
              className="w-full py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md text-left px-3 transition-colors"
              onClick={handleExportStatement}
            >
              Generate PDF Statement
            </button>
          </div>
        </div>
      </div>
      
      {showAddLoanForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Loan</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowAddLoanForm(false)}
                >
                  ✕
                </button>
              </div>
              <AddLoanForm 
                customerId={customer.id}
                onSuccess={() => setShowAddLoanForm(false)}
              />
            </div>
          </div>
        </div>
      )}
      
      <TransactionList 
        transactions={transactions} 
        customerName={customer.name}
      />
    </div>
  );
};

export default CustomerDetail;