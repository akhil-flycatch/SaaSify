import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ dateRange, onDateRangeChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const dateOptions = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'Last 30 Days',
    'This Month',
    'All Time'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={datePickerRef}>
      <button 
        onClick={() => setShowDatePicker(!showDatePicker)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-border-dark bg-card-dark text-white text-sm font-medium transition-all shadow-sm ${
          showDatePicker ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-lg">calendar_today</span>
        <span className="hidden sm:inline">{dateRange}</span>
        <span className={`material-symbols-outlined text-lg transition-transform ${showDatePicker ? 'rotate-180' : ''}`}>
          arrow_drop_down
        </span>
      </button>

      {showDatePicker && (
        <div className="absolute right-0 mt-2 w-48 bg-card-dark border border-border-dark rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 py-1 z-30">
          <div className="px-3 py-2 border-b border-white/5 mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Range</span>
          </div>
          {dateOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onDateRangeChange(option);
                setShowDatePicker(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                dateRange === option 
                  ? 'bg-primary/10 text-primary font-bold' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {option}
              {dateRange === option && (
                <span className="material-symbols-outlined text-base">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatePicker;