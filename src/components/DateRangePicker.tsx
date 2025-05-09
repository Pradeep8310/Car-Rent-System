import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  minDate?: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate = new Date(),
}) => {
  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    onStartDateChange(date);
    
    // If end date is before start date, update it
    if (endDate && date > endDate) {
      // Set end date to start date + 1 day
      const newEndDate = new Date(date);
      newEndDate.setDate(newEndDate.getDate() + 1);
      onEndDateChange(newEndDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    onEndDateChange(date);
  };

  // Calculate min date for end date input (must be after start date)
  const calculateMinEndDate = () => {
    if (!startDate) return formatDateForInput(minDate);
    
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1);
    return formatDateForInput(minEndDate);
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={formatDateForInput(startDate)}
            min={formatDateForInput(minDate)}
            onChange={handleStartDateChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10 py-2 border"
          />
          <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Return Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={formatDateForInput(endDate)}
            min={calculateMinEndDate()}
            onChange={handleEndDateChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10 py-2 border"
            disabled={!startDate}
          />
          <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;