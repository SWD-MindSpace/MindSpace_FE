import React, { useState } from 'react';
import { Input, Select, SelectItem, Button } from '@heroui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppointmentQueryParams } from '../schemas';

const InvoiceFilter: React.FC<{ onFilter: (filters: AppointmentQueryParams) => void }> = ({ onFilter }) => {
    const [filters, setFilters] = useState<AppointmentQueryParams>({
        sort: 'dateAsc',
        psychologistName: '',
        studentEmail: '',
        startDate: null,
        endDate: null,
        schoolId: '',
        appointmentStatus: null
    });

    const handleChange = (field: keyof AppointmentQueryParams, value: any) => {
        console.log("Status: ", value);
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onFilter(filters);
    };

    const handleClear = () => {
        const clearedFilters: AppointmentQueryParams = {
            sort: 'dateAsc',
            psychologistName: '',
            studentEmail: '',
            startDate: null,
            endDate: null,
            schoolId: '',
            appointmentStatus: null
        };
        setFilters(clearedFilters);
        onFilter(clearedFilters);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Bộ Lọc Buổi Tư vấn</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sort */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp</label>
                    <Select
                        value={filters.sort}
                        onSelectionChange={(keys) => {
                            const selectedSort = Array.from(keys)[0] || 'dateAsc';
                            handleChange('sort', selectedSort);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        selectionMode="single"
                        placeholder="Chọn kiểu sắp xếp"
                    >
                        <SelectItem key="dateAsc">Ngày tăng dần</SelectItem>
                        <SelectItem key="dateDesc">Ngày giảm dần</SelectItem>
                    </Select>
                </div>

                {/* Psychologist Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên nhà tâm lý học</label>
                    <Input
                        value={filters.psychologistName}
                        onChange={(e) => handleChange('psychologistName', e.target.value)}
                        placeholder="Nhập tên nhà tâm lý học"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                </div>

                {/* Student Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email học sinh</label>
                    <Input
                        value={filters.studentEmail}
                        onChange={(e) => handleChange('studentEmail', e.target.value)}
                        placeholder="Nhập email học sinh"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
                    <DatePicker
                        selected={filters.startDate ? new Date(filters.startDate) : null}
                        onChange={(date) => {
                            if (filters.endDate && date && date > new Date(filters.endDate)) {
                                alert('Ngày bắt đầu không thể sau ngày kết thúc');
                                return;
                            }
                            handleChange('startDate', date);
                        }}
                        selectsStart
                        startDate={filters.startDate ? new Date(filters.startDate) : null}
                        endDate={filters.endDate ? new Date(filters.endDate) : null}
                        dateFormat="dd/MM/yyyy"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholderText="Chọn ngày bắt đầu"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
                    <DatePicker
                        selected={filters.endDate ? new Date(filters.endDate) : null}
                        onChange={(date) => {
                            if (filters.startDate && date && date < new Date(filters.startDate)) {
                                alert('Ngày kết thúc không thể trước ngày bắt đầu');
                                return;
                            }
                            handleChange('endDate', date);
                        }}
                        selectsEnd
                        startDate={filters.startDate ? new Date(filters.startDate) : null}
                        endDate={filters.endDate ? new Date(filters.endDate) : null}
                        dateFormat="dd/MM/yyyy"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholderText="Chọn ngày kết thúc"
                    />
                </div>

                {/* School ID */}
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mã trường học</label>
                    <Input
                        value={filters.schoolId}
                        onChange={(e) => handleChange('schoolId', e.target.value)}
                        placeholder="Nhập mã trường học"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                </div> */}

                {/* Appointment Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái buổi tư vấn</label>
                    <Select
                        value={filters.appointmentStatus !== null ? filters.appointmentStatus.toString() : ''}
                        onSelectionChange={(selection) => {
                            const key = selection.currentKey;
                            handleChange('appointmentStatus', (key || key === '0') ? parseInt(key) : null);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        selectionMode="single"
                        placeholder="Chọn trạng thái"
                    >
                        <SelectItem key="">Tất cả trạng thái</SelectItem>
                        <SelectItem key="0">Chờ xác nhận (Pending)</SelectItem>
                        <SelectItem key="1">Thành công (Success)</SelectItem>
                        <SelectItem key="2">Thất bại (Failed)</SelectItem>
                    </Select>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button
                    onClick={handleClear}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                    Clear Filters
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default InvoiceFilter;