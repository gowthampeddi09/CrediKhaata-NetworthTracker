import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import CustomerCard from './CustomerCard';
import AddCustomerForm from '../forms/AddCustomerForm';

const Dashboard = () => {
  const { getCustomers } = useData();
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const customers = getCustomers();
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Dashboard</h1>
        
        <button 
          className="btn-primary"
          onClick={() => setShowAddCustomerForm(true)}
        >
          Add New Customer
        </button>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers by name or phone..."
          className="form-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showAddCustomerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Customer</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowAddCustomerForm(false)}
                >
                  ✕
                </button>
              </div>
              <AddCustomerForm 
                onSuccess={() => setShowAddCustomerForm(false)}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(customer => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? 'No customers found matching your search.' 
                : 'No customers yet. Add your first customer to get started!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;