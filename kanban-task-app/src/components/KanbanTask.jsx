import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Trash2, User, LogOut, Calendar, Clock, AlertCircle, Paperclip, Download, FileText } from 'lucide-react';
const KanbanTask = ({ task, columnId, onDragStart, onEditTask, onDeleteTask }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, task, columnId)}
    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-move group"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium text-gray-900 text-sm leading-tight">{task.title}</h3>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEditTask(task, columnId)} className="p-1 text-gray-400 hover:text-indigo-600"><Edit2 className="w-3 h-3" /></button>
        <button onClick={() => onDeleteTask(task.id, columnId)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>
      </div>
    </div>
    {task.description && <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>}
    <div className="flex flex-wrap gap-2 mb-3">
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>{task.priority}</span>
      {task.tags?.map((tag, index) => <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{tag}</span>)}
    </div>
    {task.dueDate && (
      <div className={`flex items-center gap-1 text-xs mb-2 ${isOverdue(task.dueDate) ? 'text-red-600' : isDueSoon(task.dueDate) ? 'text-orange-600' : 'text-gray-500'}`}>
        {isOverdue(task.dueDate) ? <AlertCircle className="w-3 h-3" /> : isDueSoon(task.dueDate) ? <Clock className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
        <span className="font-medium">{formatDueDate(task.dueDate)}</span>
      </div>
    )}
    {task.attachments && task.attachments.length > 0 && (
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
        <Paperclip className="w-3 h-3" />
        <span>{task.attachments.length} file{task.attachments.length !== 1 ? 's' : ''}</span>
      </div>
    )}
  </div>
);
export default KanbanTask;