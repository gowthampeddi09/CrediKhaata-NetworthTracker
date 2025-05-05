import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { formatDateForInput } from '../../utils/dateUtils';

const AddLoanForm = ({ customerId, onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      dueDate: formatDateForInput(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) // Default to 30 days from now
    }
  });
  const [loading, setLoading] = useState(false);
  const { addLoan } = useData();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const loanData = {
        ...data,
        customerId,
        amount: parseFloat(data.amount)
      };
      
      await addLoan(loanData);
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error adding loan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="form-label" htmlFor="item">Item Description</label>
        <input
          id="item"
          type="text"
          className="form-input"
          placeholder="e.g., Monthly groceries, School supplies"
          {...register('item', { 
            required: 'Item description is required'
          })}
        />
        {errors.item && <p className="form-error">{errors.item.message}</p>}
      </div>
      
      <div className="mb-4">
        <label className="form-label" htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          className="form-input"
          placeholder="Loan amount"
          {...register('amount', { 
            required: 'Amount is required',
            min: {
              value: 0.01,
              message: 'Amount must be greater than 0'
            },
            valueAsNumber: true
          })}
        />
        {errors.amount && <p className="form-error">{errors.amount.message}</p>}
      </div>
      
      <div className="mb-6">
        <label className="form-label" htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          className="form-input"
          {...register('dueDate', { 
            required: 'Due date is required'
          })}
        />
        {errors.dueDate && <p className="form-error">{errors.dueDate.message}</p>}
      </div>
      
      <div className="flex justify-end">
        <button 
          type="button" 
          className="btn-secondary mr-2"
          onClick={onSuccess}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Loan'}
        </button>
      </div>
    </form>
  );
};

export default AddLoanForm;