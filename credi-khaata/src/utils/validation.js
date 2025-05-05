export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Phone number validation (10 digits)
  export const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };
  
  // Check if required fields are present
  export const validateRequired = (obj, fields) => {
    const errors = {};
    
    fields.forEach(field => {
      if (!obj[field] || obj[field].trim() === '') {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    return errors;
  };
  