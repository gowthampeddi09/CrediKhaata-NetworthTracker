import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { formatDateForInput } from '../../utils/dateUtils';

const RepaymentForm = ({ transactionId, maxAmount, onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      date: formatDateForInput(new Date()),
      amount: maxAmount
    }
  });
  const [loading, setLoading] = useState(false);
  const { addRepayment } = useData();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const repaymentData = {
        ...data,
        amount: parseFloat(data.amount)
      };
      
      await addRepayment(transactionId, repaymentData);
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error adding repayment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="form-label" htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          max={maxAmount}
          className="form-input"
          placeholder="Repayment amount"
          {...register('amount', { 
            required: 'Amount is required',
            min: {
              value: 0.01,
              message: 'Amount must be greater than 0'
            },
            max: {
              value: maxAmount,
              message: `Amount cannot exceed the remaining balance (₹${maxAmount.toFixed(2)})`
            },
            valueAsNumber: true
          })}
        />
        {errors.amount && <p className="form-error">{errors.amount.message}</p>}
      </div>
      
      <div className="mb-6">
        <label className="form-label" htmlFor="date">Payment Date</label>
        <input
          id="date"
          type="date"
          className="form-input"
          {...register('date', { 
            required: 'Payment date is required'
          })}
        />
        {errors.date && <p className="form-error">{errors.date.message}</p>}
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
          {loading ? 'Processing...' : 'Record Payment'}
        </button>
      </div>
    </form>
  );
};

export default RepaymentForm;