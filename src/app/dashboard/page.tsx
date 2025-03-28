// pages/dashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/dashboard/Card';
import Link from 'next/link'
import { Button } from '@/components/dashboard/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/dashboard/Tab';
import { getOverviewStatistics, getAppointmentStatistics, getSupportingProgramStatistics, StatisticsQueryParams, getRecentTests } from '@/features/dashboard/APIs';
import { DateRangePicker } from '@/components/dashboard/DateRangePicker';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppointmentStatistics, CountOverview, SupportingProgramStatistics } from '@/features/dashboard/schemas/statisticsSchema';
import { Test } from '@/features/tests/schemas/testSchema';


// Sample data
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const currentUser = localStorage.getItem('userInfo');
const schoolId = currentUser ? JSON.parse(currentUser).schoolId : null;
const Dashboard = () => {
    console.log(schoolId);
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const formatDateForInput = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const [startDate, setStartDate] = useState(formatDateForInput(thirtyDaysAgo));
    const [endDate, setEndDate] = useState(formatDateForInput(today));
    const [overviewData, setOverviewData] = useState<CountOverview>();
    const [recentTests, setRecentTests] = useState<Test[]>();
    const [counselingData, setCounselingData] = useState<{ name: string; appointments: number }[]>([]);
    const [programsData, setProgramsData] = useState<{ name: string; value: number }[]>([]);

    const fetchStatistics = async (start?: string, end?: string) => {
        try {
            const params: StatisticsQueryParams = {
                SchoolId: schoolId,
                StartDate: start,
                EndDate: end,
                Top: 3
            };

            // Fetch Overview statistics
            const overviewDataResponse = await getOverviewStatistics(params);
            setOverviewData(overviewDataResponse.data);

            // Fetch Recent Tests statistics
            const recentTestsResponse = await getRecentTests(params);
            console.log('recentTestsResponse:', recentTestsResponse);
            setRecentTests(recentTestsResponse.data);

            // Fetch Supporting Programs statistics
            const programsResponse = await getSupportingProgramStatistics(params);
            if (programsResponse && programsResponse.data) {
                // Transform the data for the pie chart
                const transformedData = programsResponse.data.keyValuePairs.map((pair: { specialization: { name: any; }; supportingProgramCount: any; }) => ({
                    name: pair.specialization.name || 'Unknown',
                    value: pair.supportingProgramCount
                }));
                setProgramsData(transformedData);
            }

            const appointmentResponse = await getAppointmentStatistics(params);
            console.log('appointmentResponse:', appointmentResponse);
            if (appointmentResponse && appointmentResponse.data) {
                const transformedData = appointmentResponse.data.keyValuePairs.map((pair: { specialization: { name: any; }; appointmentCount: any; }) => ({
                    name: pair.specialization.name || 'Unknown',
                    appointments: pair.appointmentCount
                }));
                setCounselingData(transformedData);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Initial data fetch when component mounts
    useEffect(() => {
        fetchStatistics();
    }, []);

    const handleDateRangeChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
        // Fetch new data based on the date range
        fetchStatistics(start, end);
        console.log('Date range changed:', { startDate: start, endDate: end });
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Quản lý trường học</h1>

            {/* Date Range Picker */}
            <Card className="mb-8">
                <CardContent className="p-4">
                    <div className="flex items-center">
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onRangeChange={handleDateRangeChange}
                            label="Thời gian thống kê (áp dụng cho toàn bộ trang)"
                        />
                    </div>
                </CardContent>
            </Card>
            {/* Quick Stats Bấm từng tab nhảy qua list tương ứng*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <Link href="/accounts/students" className="block">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Học sinh</h3>
                                <span className="text-2xl font-bold">{overviewData?.totalStudentsCount}</span>
                            </div>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <Link href="/tests" className="block">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Bài kiểm tra và khảo sát tâm lý</h3>
                                <span className="text-2xl font-bold">{overviewData?.totalTestsCount}</span>
                            </div>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <Link href="/supporting-programs" className="block">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Chương trình hỗ trợ</h3>
                                <span className="text-2xl font-bold">{overviewData?.totalSupportingProgramCount}</span>
                            </div>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <Link href="/resources/blogs" className="block">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Tài nguyên</h3>
                                <span className="text-2xl font-bold">{overviewData?.totalResourcesCount}</span>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Tests */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Thống kê 3 bài khảo sát gần nhất từ {startDate} - {endDate} </CardTitle>
                </CardHeader>
                <CardContent>
                    {recentTests?.map((test) => (
                        <Link href={`/tests/detail/${test.id}`} className="block">
                            <div key={test.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                                <div>
                                    <h4 className="font-medium">{test.title} ({test.testCode})</h4>
                                    <p className="text-sm text-gray-500">Lĩnh vực: {test.specialization?.name}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="font-bold">{test.questionCount} câu hỏi</span>
                                    <Button variant="outline" size="sm">Chi tiết</Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-8 mb-8">
                {/* Supporting Programs Chart */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Thống kê chương trình hỗ trợ theo lĩnh vực</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <p className="text-lg font-medium">Tổng số chương trình: {programsData.reduce((sum, item) => sum + item.value, 0)}</p>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={programsData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        nameKey="name"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {programsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} programs`, 'Count']} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    <p className="text-sm text-center mt-2">
                        Số lượng chương trình hỗ trợ, theo lĩnh vực, từ ngày {startDate} tới ngày {endDate}
                    </p>
                </Card>

                {/* Counseling Issues Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thống kê tư vấn tâm lý</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={counselingData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis tickSize={1} allowDecimals={false} />
                                    <Tooltip />
                                    <Bar dataKey="appointments" fill="#8884d8">
                                        {counselingData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <p className="text-sm text-center mt-2">
                                Số lượng buổi tư vấn tâm lý, theo lĩnh vực, từ ngày {startDate} tới ngày {endDate}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;