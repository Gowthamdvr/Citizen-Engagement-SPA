
import React, { useState } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

interface EditModalProps {
  title: string;
  initialData: any;
  onSave: (data: any) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ title, initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(initialData)));

  const handleUpdate = (path: (string | number)[], value: any) => {
    const newData = JSON.parse(JSON.stringify(formData));
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setFormData(newData);
  };

  const addItem = (path: (string | number)[]) => {
    const newData = JSON.parse(JSON.stringify(formData));
    let current = newData;
    for (const p of path) {
      current = current[p];
    }
    
    // Create a template based on the first item if exists, else empty defaults
    const template = current.length > 0 
      ? Object.fromEntries(Object.keys(current[0]).map(k => [k, k === 'id' ? Date.now().toString() : '']))
      : { id: Date.now().toString(), title: 'New Item', description: '' };
    
    current.push(template);
    setFormData(newData);
  };

  const removeItem = (path: (string | number)[], index: number) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    const newData = JSON.parse(JSON.stringify(formData));
    let current = newData;
    for (const p of path) {
      current = current[p];
    }
    current.splice(index, 1);
    setFormData(newData);
  };

  const renderRecursive = (data: any, path: (string | number)[] = []): React.ReactNode => {
    if (data === null || data === undefined) return <div />;

    if (Array.isArray(data)) {
      return (
        <div className="space-y-6">
          {data.map((item, idx) => (
            <div key={idx} className="p-6 border border-slate-200 rounded-2xl bg-slate-50/30 relative group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-blue-600 uppercase">Item #{idx + 1}</span>
                <button 
                  onClick={() => removeItem(path, idx)}
                  className="p-2 text-slate-300 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {renderRecursive(item, [...path, idx])}
            </div>
          ))}
          <button 
            onClick={() => addItem(path)}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add New Item
          </button>
        </div>
      );
    }

    if (typeof data === 'object') {
      return (
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => {
            if (key === 'id') return null; // Skip IDs
            
            if (typeof value === 'object' && value !== null) {
              return (
                <div key={key} className="p-4 border border-slate-100 rounded-xl">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-3">{key}</label>
                  {renderRecursive(value, [...path, key])}
                </div>
              );
            }

            return (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{key}</label>
                {typeof value === 'string' && (value.length > 50 || key.toLowerCase().includes('bio') || key.toLowerCase().includes('address')) ? (
                  <textarea
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={value}
                    onChange={(e) => handleUpdate([...path, key], e.target.value)}
                    rows={3}
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={String(value)}
                    onChange={(e) => handleUpdate([...path, key], e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Base case for primitive values that are part of an array but not an object (e.g., gallery strings)
    return (
      <input
        type="text"
        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
        value={String(data)}
        onChange={(e) => handleUpdate(path, e.target.value)}
      />
    );
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col scale-in-center">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-400 font-medium">Update the content in real-time</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-full transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          {renderRecursive(formData)}
        </div>
        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
          <button 
            onClick={() => onSave(formData)}
            className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Save size={20} /> Save Changes
          </button>
          <button onClick={onClose} className="px-8 font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
