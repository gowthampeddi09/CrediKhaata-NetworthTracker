import React, { useState } from 'react';
import { formatDate, isPastDue } from '../../utils/dateUtils';
import RepaymentForm from '../forms/RepaymentForm';

const TransactionItem = ({ transaction }) => {
  const [expanded, setExpanded] = useState(false);
  const [showRepaymentForm, setShowRepaymentForm] = useState(false);
  
  const isOverdue = isPastDue(transaction.dueDate) && transaction.remainingAmount > 0;
  const isPaid = transaction.remainingAmount === 0;
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <React.Fragment>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {formatDate(transaction.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          {transaction.item}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          ₹{transaction.amount.toFixed(2)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span className={isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'}>
            {formatDate(transaction.dueDate)}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span className={
            isPaid 
              ? 'text-green-600 dark:text-green-400 font-medium' 
              : isOverdue 
                ? 'text-red-600 dark:text-red-400 font-medium' 
                : 'text-gray-500 dark:text-gray-400'
          }>
            ₹{transaction.remainingAmount.toFixed(2)}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
          <div className="flex justify-end space-x-2">
            <button 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              onClick={toggleExpand}
            >
              {expanded ? 'Hide' : 'Details'}
            </button>
            
            {transaction.remainingAmount > 0 && (
              <button 
                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                onClick={() => setShowRepaymentForm(true)}
              >
                Repay
              </button>
            )}
          </div>
        </td>
      </tr>
      
      {expanded && (
        <tr className="bg-gray-50 dark:bg-gray-800">
          <td colSpan="6" className="px-6 py-4">
            <div className="text-sm">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Repayment History</h3>
              
              {transaction.repayments && transaction.repayments.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {transaction.repayments.map(repayment => (
                        <tr key={repayment.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(repayment.date)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ₹{repayment.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No repayments recorded yet.</p>
              )}
            </div>
          </td>
        </tr>
      )}
      
      {showRepaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Record Repayment</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowRepaymentForm(false)}
                >
                  ✕
                </button>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                <span className="font-medium">Item:</span> {transaction.item}<br />
                <span className="font-medium">Total Amount:</span> ₹{transaction.amount.toFixed(2)}<br />
                <span className="font-medium">Remaining:</span> ₹{transaction.remainingAmount.toFixed(2)}
              </p>
              <RepaymentForm 
                transactionId={transaction.id}
                maxAmount={transaction.remainingAmount}
                onSuccess={() => setShowRepaymentForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TransactionItem;