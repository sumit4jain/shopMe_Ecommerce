import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Trash2, User, LogOut, Calendar, Clock, AlertCircle, Paperclip, Download, FileText } from 'lucide-react';

const Header = ({ currentUser, onLogout }) => (
  <header className="bg-white shadow-sm border-b     border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          <p className="text-sm text-gray-600">Welcome back, {currentUser?.split('@')[0]}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  </header>
);
export default Header;
