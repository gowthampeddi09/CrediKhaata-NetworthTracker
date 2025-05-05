import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { formatDate} from '../../utils/dateUtils';

const CustomerCard = ({ customer }) => {
  const { 
    calculateOutstandingBalance, 
    calculateNextDueDate,
    hasOverdueLoans
  } = useData();
  
  const balance = calculateOutstandingBalance(customer.id);
  const nextDueDate = calculateNextDueDate(customer.id);
  const isOverdue = hasOverdueLoans(customer.id);
  
  return (
    <Link 
      to={`/customer/${customer.id}`}
      className="card hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{customer.name}</h2>
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isOverdue 
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }`}
        >
          {isOverdue ? 'Overdue' : 'Up-to-date'}
        </span>
      </div>
      
      <div className="space-y-2 text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-medium">Phone:</span> {customer.phone}
        </p>
        <p className="truncate">
          <span className="font-medium">Address:</span> {customer.address}
        </p>
        <p>
          <span className="font-medium">Outstanding:</span> ₹{balance.toFixed(2)}
        </p>
        {nextDueDate && (
          <p>
            <span className="font-medium">Next Due:</span>{' '}
            <span className={isOverdue ? 'text-red-600 dark:text-red-400' : ''}>
              {formatDate(nextDueDate)}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default CustomerCard;