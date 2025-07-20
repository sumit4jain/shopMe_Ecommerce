import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Trash2, User, LogOut, Calendar, Clock, AlertCircle, Paperclip, Download, FileText } from 'lucide-react';
const KanbanColumn = ({ columnId, column, onDragOver, onDrop, onAddTask, onEditTask, onDeleteTask, onDragStart }) => (
  <div
    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, columnId)}
  >
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-900">{column.title}</h2>
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{column.tasks.length}</span>
      </div>
      <button
        onClick={() => onAddTask(columnId)}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border-2 border-dashed border-gray-300 hover:border-indigo-300"
      >
        <Plus className="w-4 h-4" /> Add Task
      </button>
    </div>
    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
      {column.tasks.map((task) => (
        <KanbanTask
          key={task.id}
          task={task}
          columnId={columnId}
          onDragStart={onDragStart}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  </div>
);
export default KanbanColumn;