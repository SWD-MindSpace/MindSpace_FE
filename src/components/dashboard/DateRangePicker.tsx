// components/dashboard/DateRangePicker.tsx
import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onRangeChange: (startDate: string, endDate: string) => void;
    label?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    startDate,
    endDate,
    onRangeChange,
    label = 'Date Range'
}) => {
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Reset error when dates change
        validateDates(tempStartDate, tempEndDate);
    }, [tempStartDate, tempEndDate]);

    const validateDates = (start: string, end: string): boolean => {
        if (start && end) {
            if (new Date(end) < new Date(start)) {
                setError('End date must be greater than or equal to start date');
                return false;
            }
        }
        setError(null);
        return true;
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        setTempStartDate(newStartDate);

        // If end date is already selected, validate the range
        if (tempEndDate) {
            validateDates(newStartDate, tempEndDate);
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = e.target.value;
        setTempEndDate(newEndDate);

        // If start date is already selected, validate the range
        if (tempStartDate) {
            validateDates(tempStartDate, newEndDate);
        }
    };

    const handleApply = () => {
        if (validateDates(tempStartDate, tempEndDate)) {
            onRangeChange(tempStartDate, tempEndDate);
        }
    };

    return (
        <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                <span className="text-sm font-medium">{label}</span>

                <div className="flex items-center space-x-4 flex-grow">
                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-xs text-gray-500">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            value={tempStartDate}
                            onChange={handleStartDateChange}
                            className="h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-xs text-gray-500">End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            value={tempEndDate}
                            onChange={handleEndDateChange}
                            min={tempStartDate} // Native HTML5 validation
                            className="h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                    </div>

                    <Button
                        onClick={handleApply}
                        variant="default"
                        size="default"
                        disabled={!!error}
                    >
                        Apply
                    </Button>
                </div>
            </div>

            {error && (
                <div className="text-sm text-red-500 mt-1">
                    {error}
                </div>
            )}
        </div>
    );
};