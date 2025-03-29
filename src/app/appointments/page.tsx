'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Appointment, AppointmentQueryParams } from '@/features/appointments/schemas';
import AppointmentFilter from '@/features/appointments/components/AppointmentFilter';
import { getAppointmentList } from '@/features/appointments/APIs';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/list/Pagination';

const ManageAppointmentHistoryPage = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState<number | null>(null);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [filters, setFilters] = useState<AppointmentQueryParams>({
        sort: 'dateAsc',
        psychologistName: '',
        studentEmail: '',
        startDate: null,
        endDate: null,
        schoolId: '',
        appointmentStatus: null
    });
    const searchParams = useSearchParams();
    const router = useRouter();
    const pageSize = 12;

    const currentUser = localStorage.getItem('userInfo');
    const schoolId = currentUser ? JSON.parse(currentUser).schoolId : null;

    const fetchAppointments = async (filters: AppointmentQueryParams) => {
        setLoading(true);
        try {
            const startDateString = filters.startDate
                ? filters.startDate.toISOString().split('T')[0]
                : null;
            const endDateString = filters.endDate
                ? filters.endDate.toISOString().split('T')[0]
                : null;
            const queryParams: AppointmentQueryParams = {
                sort: filters.sort || 'dateAsc',
                psychologistName: filters.psychologistName || '',
                studentEmail: filters.studentEmail || '',
                startDate: startDateString || null,
                endDate: endDateString || null,
                schoolId: schoolId || '',
                appointmentStatus: filters.appointmentStatus !== undefined ? filters.appointmentStatus : null,
                pageIndex: filters.pageIndex || 1,
                pageSize: pageSize
            };
            const response = await getAppointmentList(queryParams);
            setAppointments(response.data.data);
            setTotalItems(response.data.count || 0);
            setTotalPages(Math.ceil((response.data.count || 0) / pageSize));
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    // Gọi API lần đầu khi trang được tải
    useEffect(() => {
        const pageIndex = searchParams.has('PageIndex') ? Number(searchParams.get('PageIndex')) : 1;
        const currentFilters = {
            ...filters,
            pageIndex: pageIndex,
            pageSize: pageSize
        };
        fetchAppointments(currentFilters);
    }, [searchParams]);

    const handleFilter = (newFilters: AppointmentQueryParams) => {
        const updatedFilters = {
            ...newFilters,
            pageIndex: 1,
            pageSize: pageSize
        };
        fetchAppointments(updatedFilters);

        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('PageIndex', '1');
        router.push(`?${newSearchParams.toString()}`);
    };

    const handleInputChange = (key: string, value: number) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set(key, value.toString());
        router.push(`?${newSearchParams.toString()}`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý lịch sử buổi tư vấn</h1>

            <AppointmentFilter onFilter={handleFilter} />

            <div className="mt-6">
                {loading ? (
                    <div className="text-center text-gray-600">Loading...</div>
                ) : appointments.length === 0 ? (
                    <div className="text-center text-gray-600">Không tìm thấy buổi tư vấn nào.</div>
                ) : (
                    <Table className="w-full border border-gray-200 rounded-lg">
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Ngày</TableColumn>
                            <TableColumn>Thời gian bắt đầu</TableColumn>
                            <TableColumn>Thời gian kết thúc</TableColumn>
                            <TableColumn>Nhà tâm lý học</TableColumn>
                            <TableColumn>Học sinh</TableColumn>
                            <TableColumn>Trạng thái</TableColumn>
                            <TableColumn>Link Meet</TableColumn>
                            <TableColumn>Trạng thái thời gian</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>{appointment.id}</TableCell>
                                    <TableCell>{appointment.date}</TableCell>
                                    <TableCell>{appointment.startTime}</TableCell>
                                    <TableCell>{appointment.endTime}</TableCell>
                                    <TableCell>{appointment.psychologistName || 'N/A'}</TableCell>
                                    <TableCell>{appointment.studentName || 'N/A'}</TableCell>
                                    <TableCell>{appointment.status || 'N/A'}</TableCell>
                                    <TableCell>
                                        <a
                                            href={appointment.meetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline"
                                        >
                                            Link Meet
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        {appointment.isUpcoming ? 'Sắp diễn ra' : 'Đã diễn ra'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            <Pagination
                searchParams={searchParams}
                totalPages={totalPages}
                totalItems={totalItems}
                onInputChange={handleInputChange}
            />
        </div>
    );
};

export default ManageAppointmentHistoryPage;