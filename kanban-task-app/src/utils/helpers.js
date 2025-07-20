import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Trash2, User, LogOut, Calendar, Clock, AlertCircle, Paperclip, Download, FileText } from 'lucide-react';

// =================================================================================
// --- utils/helpers.js ---
// You can move these helper functions to a separate file e.g., 'src/utils/helpers.js'
// =================================================================================

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

const isDueSoon = (dueDate) => {
  if (!dueDate) return false;
  const now = new Date();
  const due = new Date(dueDate);
  const hoursDiff = (due - now) / (1000 * 60 * 60);
  return hoursDiff > 0 && hoursDiff <= 24;
};

const formatDueDate = (dueDate) => {
  if (!dueDate) return '';
  const date = new Date(dueDate);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const taskDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  let dateStr = '';
  if (taskDate.getTime() === today.getTime()) {
    dateStr = 'Today';
  } else if (taskDate.getTime() === tomorrow.getTime()) {
    dateStr = 'Tomorrow';
  } else {
    dateStr = date.toLocaleDateString();
  }
  
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${dateStr} at ${timeStr}`;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
