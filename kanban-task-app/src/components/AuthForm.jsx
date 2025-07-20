import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Trash2, User, LogOut, Calendar, Clock, AlertCircle, Paperclip, Download, FileText } from 'lucide-react';
const AuthForm = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (isLogin) => {
    if (email && password) {
      onAuth(email, password, isLogin);
    }
  };

  return (
    <div className="text-black space-y-6 ">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your password"
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => handleSubmit(true)}
          className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Sign In
        </button>
        <button
          onClick={() => handleSubmit(false)}
          className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default AuthForm;