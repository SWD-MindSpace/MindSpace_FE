'use client';

import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import {
    Card,
    CardHeader,
    CardBody,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from '@heroui/react';
import { DateRangePicker } from '@/components/dashboard/DateRangePicker';
import {
    getOverviewSystemStatistics,
    getRevenueTimeStatistics,
    getTopPsychologistsRevenue,
    getRevenueBySpecStatistics,
    getTopSchools,
    StatisticsQueryParams
} from '@/features/dashboard/APIs';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
    const today = new Date();
    const defaultStartDate = new Date(today);
    defaultStartDate.setDate(today.getDate() - 365 * 2);

    const formatDateForInput = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatDateForAPI = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const [startDate, setStartDate] = useState(formatDateForInput(defaultStartDate));
    const [endDate, setEndDate] = useState(formatDateForInput(today));
    const [groupBy, setGroupBy] = useState<string>('month');

    const [summaryCards, setSummaryCards] = useState<any[]>([]);
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [specializationData, setSpecializationData] = useState<any[]>([]);
    const [psychologistData, setPsychologistData] = useState<any[]>([]);
    const [schoolData, setSchoolData] = useState<any[]>([]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const fetchDashboardData = async () => {
        try {
            const apiStartDate = formatDateForAPI(
                new Date(startDate.split('/').reverse().join('-'))
            );
            const apiEndDate = formatDateForAPI(
                new Date(endDate.split('/').reverse().join('-'))
            );
            const queryParams: StatisticsQueryParams = {
                StartDate: apiStartDate,
                EndDate: apiEndDate,
                GroupBy: groupBy,
                Top: 5
            };

            const [
                overviewResponse,
                revenueTimeResponse,
                psychologistResponse,
                specializationResponse,
                schoolResponse
            ] = await Promise.all([
                getOverviewSystemStatistics(queryParams),
                getRevenueTimeStatistics(queryParams),
                getTopPsychologistsRevenue(queryParams),
                getRevenueBySpecStatistics(queryParams),
                getTopSchools(queryParams)
            ]);

            setSummaryCards([
                { title: 'Trường học', value: overviewResponse.data.totalSchools || 0 },
                { title: 'Chuyên viên tư vấn', value: overviewResponse.data.totalPsychologists || 0 },
                { title: 'Phụ huynh', value: overviewResponse.data.totalParents || 0 }
            ]);

            setRevenueData(revenueTimeResponse.data || []);
            setPsychologistData(psychologistResponse.data || []);
            setSpecializationData(specializationResponse.data || []);
            setSchoolData(schoolResponse.data || []);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [startDate, endDate, groupBy]);

    const handleDateRangeChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleGroupByChange = (value: string) => {
        setGroupBy(value);
    };

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            console.log(payload[0]);
            const percentage = payload[0].value;
            return (
                <div className="bg-white p-4 shadow-lg rounded-md">
                    <p className="font-bold">{payload[0].name}</p>
                    <p>Giá trị: {formatPrice(payload[0].payload.revenue)}</p>
                    <p>Tỷ lệ: {percentage}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="mb-8">
                <CardBody className="p-4">
                    <div className="flex items-center gap-4">
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onRangeChange={handleDateRangeChange}
                            label="Thời gian thống kê (áp dụng cho toàn bộ trang)"
                        />
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Nhóm theo:</label>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="flat" className="w-[150px] text-left">
                                        {groupBy === 'month' ? 'Tháng' : 'Ngày'}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem onAction={() => handleGroupByChange('month')} key="month">
                                        Tháng
                                    </DropdownItem>
                                    <DropdownItem onAction={() => handleGroupByChange('date')} key="date">
                                        Ngày
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {summaryCards.map((card, index) => (
                    <Card key={index} radius="sm" className="shadow-md hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="p-4">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-sm text-gray-600 uppercase tracking-wider">{card.title}</span>
                                <span className="text-3xl font-bold text-blue-600">{card.value}</span>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Card radius="sm">
                    <CardHeader>
                        <div className="text-lg font-semibold">
                            Doanh Thu và Lợi Nhuận {groupBy === 'month' ? 'Hàng Tháng' : 'Hàng Ngày'}
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey={groupBy} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Doanh Thu"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    name="Lợi Nhuận"
                                    stroke="#00C49F"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>

                <Card radius="sm">
                    <CardHeader>
                        <div className="text-lg font-semibold">Doanh Thu Theo Lĩnh Vực Tư Vấn</div>
                    </CardHeader>
                    <CardBody className="flex items-center justify-center">
                        <ResponsiveContainer width="60%" height={350}>
                            <PieChart>
                                <Pie
                                    data={specializationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {specializationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="w-[40%] pl-4 flex flex-col justify-center">
                            {specializationData.map((item, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <span
                                        className="inline-block w-3 h-3 mr-2 rounded-full"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    ></span>
                                    <span className="text-sm">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                <Card radius="sm">
                    <CardHeader>
                        <div className="text-lg font-semibold">Top 5 chuyên viên doanh thu cao nhất</div>
                    </CardHeader>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={psychologistData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>

                <Card radius="sm">
                    <CardHeader>
                        <div className="text-lg font-semibold">Top 5 trường học mang lại doanh thu cao nhất</div>
                    </CardHeader>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={schoolData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#10B981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}