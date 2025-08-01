import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An error occurred';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-card text-center">
        <h1 className="text-2xl font-bold text-error-600 mb-4">Authentication Error</h1>
        <p className="text-slate-600 mb-6">{errorMessage}</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;