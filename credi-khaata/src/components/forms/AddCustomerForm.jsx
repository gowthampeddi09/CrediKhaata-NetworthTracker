import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useData } from '../../context/DataContext';

const AddCustomerForm = ({ onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { addCustomer } = useData();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addCustomer(data);
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error adding customer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="form-label" htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          className="form-input"
          placeholder="Customer name"
          {...register('name', { 
            required: 'Name is required'
          })}
        />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>
      
      <div className="mb-4">
        <label className="form-label" htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          className="form-input"
          placeholder="10-digit phone number"
          {...register('phone', { 
            required: 'Phone number is required',
            pattern: {
              value: /^\d{10}$/,
              message: 'Enter a valid 10-digit phone number'
            }
          })}
        />
        {errors.phone && <p className="form-error">{errors.phone.message}</p>}
      </div>
      
      <div className="mb-4">
        <label className="form-label" htmlFor="email">Email (Optional)</label>
        <input
          id="email"
          type="email"
          className="form-input"
          placeholder="Customer email"
          {...register('email', { 
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address'
            }
          })}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>
      
      <div className="mb-6">
        <label className="form-label" htmlFor="address">Address</label>
        <textarea
          id="address"
          className="form-input"
          placeholder="Customer address"
          rows="3"
          {...register('address', { 
            required: 'Address is required'
          })}
        />
        {errors.address && <p className="form-error">{errors.address.message}</p>}
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
          {loading ? 'Adding...' : 'Add Customer'}
        </button>
      </div>
    </form>
  );
};

export default AddCustomerForm;