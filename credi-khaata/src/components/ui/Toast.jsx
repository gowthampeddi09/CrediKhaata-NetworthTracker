import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

// This is a utility component for displaying toast notifications
// It's already configured in index.js with the ToastContainer
const Toast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  warning: (message) => toast.warning(message),
};

export default Toast;