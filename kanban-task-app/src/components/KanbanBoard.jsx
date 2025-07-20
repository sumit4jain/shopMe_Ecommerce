import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Trash2, User, LogOut, Calendar, Clock, AlertCircle, Paperclip, Download, FileText } from 'lucide-react';
import KanbanColumn from './KanbanColumn';
const KanbanBoard = ({ userBoard, ...props }) => (
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(userBoard).map(([columnId, column]) => (
        <KanbanColumn key={columnId} columnId={columnId} column={column} {...props} />
      ))}
    </div>
  </div>
);
export default KanbanBoard;