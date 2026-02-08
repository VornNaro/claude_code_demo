'use client';

import { useEffect, useState, useCallback } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastMessage {
  id: number;
  text: string;
}

let toastId = 0;
const listeners = new Set<(msg: ToastMessage) => void>();

export function showToast(text: string) {
  const msg = { id: ++toastId, text };
  listeners.forEach((fn) => fn(msg));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (msg: ToastMessage) => {
      setToasts((prev) => [...prev, msg]);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg',
            'animate-in slide-in-from-right-5 fade-in duration-300'
          )}
        >
          <Check className="w-4 h-4 text-green-400 shrink-0" />
          <span className="text-sm">{toast.text}</span>
          <button
            onClick={() => dismiss(toast.id)}
            className="ml-2 hover:bg-white/10 rounded-full p-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
