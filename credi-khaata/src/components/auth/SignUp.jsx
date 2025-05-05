import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signup(data.email, data.password, data.name);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            className="form-input"
            placeholder="Enter your full name"
            {...register('name', { 
              required: 'Name is required'
            })}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
      
        <div className="mb-4">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="Enter your email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address'
              }
            })}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        
        <div className="mb-6">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Enter your password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full mb-4"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      
      <p className="text-center text-gray-600 dark:text-gray-400">
        Already have an account? 
        <Link to="/login" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 ml-1">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;