# CrediKhaata - Loan Ledger UI for Shopkeepers

## Overview
CrediKhaata is a responsive React.js web application designed for small shopkeepers to manage customer credit efficiently. The application provides shopkeepers with tools to track customer loans, record repayments, monitor outstanding balances, and generate statements - all from a user-friendly dashboard.
Features

User Authentication: Secure login and signup system
Dashboard View: Overview of all customers with outstanding balances and status indicators
Customer Management: Add, view, and manage customer information
Loan Tracking: Record new loans with details and due dates
Repayment System: Track partial or full repayments against loans
Visual Indicators: Highlight overdue loans for better visibility
PDF Export: Generate and download customer statements as PDF
Dark Mode: Toggle between light and dark themes for comfortable viewing
Responsive Design: Works seamlessly on desktop and mobile devices

## Tech Stack
React.js (v18+)
React Router for navigation
Context API for state management
React Hook Form for form validations
Tailwind CSS for styling
jsPDF for PDF generation
React Toastify for notifications

## Installation & Setup
### Prerequisites

Node.js (v14 or higher)
npm or yarn package manager

## Steps to Run Locally

### 1. Clone the repository
git clone https://github.com/yourusername/credi-khaata.git
cd credi-khaata

### 2. Install dependencies
npm install

### 3. Start the development server
npm start


## Project Structure
credi-khaata/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/        # Authentication components
│   │   ├── dashboard/   # Dashboard views
│   │   ├── customer/    # Customer details and transactions
│   │   ├── forms/       # Form components
│   │   ├── layout/      # Layout components
│   │   ├── ui/          # UI utilities
│   ├── context/         # Application state
│   ├── data/            # Mock data and API
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   ├── index.js         # Application entry point
├── tailwind.config.js   # Tailwind CSS configuration
├── package.json         # Project dependencies
└── README.md            # Project documentation

## Usage Guide
Sign Up/Login: Create an account or log in with existing credentials
Dashboard: View all customers and their status
Add Customer: Add new customers with their contact details
Customer Details: Click on a customer to view their transaction history
Add Loan: Record a new loan for a customer with amount and due date
Record Repayment: Add repayments against existing loans
Export Statement: Generate a PDF statement for a customer


## Design Decisions
Mock Authentication: The current implementation uses a mock authentication system with localStorage for demonstration purposes. In a production environment, this would be connected to a secure backend API.
State Management: Context API was chosen over Redux for state management due to the application's moderate complexity and to reduce bundle size.
Responsive Design: Mobile-first approach was implemented to ensure usability across devices, considering that shopkeepers might use the application on various devices.
Dark Mode: Implemented to reduce eye strain during extended use, particularly in varying lighting conditions in shops.
PDF Generation: jsPDF was selected for its small footprint and ease of integration for generating professional-looking customer statements.