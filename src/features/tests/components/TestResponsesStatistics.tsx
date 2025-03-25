'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardBody } from "@heroui/card";
import { DateRangePicker } from '@/components/dashboard/DateRangePicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Line, ComposedChart } from 'recharts';
import { getQuestionResponseAnalysis, getScoreRankAnalysis, TestResponseStatisticsQueryParams } from '../APIs';

interface RankGroup {
    rank: string;
    responseCount: number;
    averageScore: number;
    minScore: number;
    maxScore: number;
    medianScore: number;
    percentage: number;
}

interface QuestionResponseStatistic {
    questionContent: string;
    slices: {
        answerOption: string;
        count: number;
        percentage: number;
    }[];
}

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function TestResponseStatistics() {
    // const currentUser = localStorage.getItem('userInfo');

    // uncomment the above line when api ready
    // const schoolId = currentUser ? JSON.parse(currentUser).schoolId : null; 
    const schoolId = 1;
    const params = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rankGroupData, setRankGroupData] = useState<RankGroup[]>([]);
    const [questionResponseData, setQuestionResponseData] = useState<QuestionResponseStatistic[]>([]);

    // Format date for input
    const formatDateForInput = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Initial date setup
    useEffect(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        setStartDate(formatDateForInput(thirtyDaysAgo));
        setEndDate(formatDateForInput(today));
    }, []);

    // Fetch test response statistics
    const fetchTestResponseStatistics = async (start?: string, end?: string) => {
        try {
            const statisticsParams: TestResponseStatisticsQueryParams = {
                SchoolId: schoolId,
                StartDate: start,
                EndDate: end,
                TestId: Number(params.id) // truyen prop tu trang details
            };

            // Fetch score rank analysis
            const rankResponse = await getScoreRankAnalysis(statisticsParams)
            const rankData = await rankResponse.data;
            setRankGroupData(rankData.rankGroups);

            // Fetch question response analysis
            const questionResponse = await getQuestionResponseAnalysis(statisticsParams);
            const questionData = await questionResponse.data;
            setQuestionResponseData(questionData.testQuestionResponseStatistics);
        } catch (error) {
            console.error('Error fetching test response statistics:', error);
        }
    };

    // Fetch initial data and when dates change
    useEffect(() => {
        if (params.id) {
            fetchTestResponseStatistics(startDate, endDate);
        }
    }, [params.id, startDate, endDate]);

    // Handle date range change
    const handleDateRangeChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
        fetchTestResponseStatistics(start, end);
    };

    return (
        <Card className="w-full max-w-[900px] p-4">
            <CardHeader className="text-lg font-semibold mb-4">
                Thống kê kết quả bài test
            </CardHeader>

            {/* Date Range Picker */}
            <div className="mb-4">
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onRangeChange={handleDateRangeChange}
                    label="Thời gian thống kê"
                />
            </div>
            <div className="text-center mb-3 font-semibold">
                Tổng số lượt phản hồi: {rankGroupData.reduce((total, group) => total + group.responseCount, 0)}
            </div>
            {/* Score Rank Analysis Chart */}
            {rankGroupData && rankGroupData.length > 0 && (
                <Card className="mb-4">
                    <CardHeader>Xu hướng tâm lý theo nhóm xếp hạng</CardHeader>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={400}>
                            <ComposedChart data={rankGroupData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="rank" />
                                <YAxis
                                    yAxisId="left"
                                    label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }}
                                    tickSize={1}
                                    allowDecimals={false}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    label={{ value: 'Điểm số', angle: 90, position: 'insideRight' }}
                                />
                                <Tooltip
                                    formatter={(value, name, props) => {
                                        if (name === 'Số lượng') return [Math.round(value as number), 'Số lượng'];
                                        if (name === 'Điểm trung bình' && typeof value === 'number') return [value.toFixed(2), 'Điểm trung bình'];
                                        if (name === 'Min') return [value, 'Điểm thấp nhất'];
                                        if (name === 'Max') return [value, 'Điểm cao nhất'];
                                        if (name === 'Median') return [value, 'Điểm trung vị'];
                                        return [value, name];
                                    }}
                                />
                                <Legend />

                                {/* Số lượng người trả lời */}
                                <Bar
                                    yAxisId="left"
                                    dataKey="responseCount"
                                    fill="#FF6384"
                                    name="Số lượng"
                                    barSize={50}
                                />

                                {/* Điểm trung bình */}
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="averageScore"
                                    stroke="#36A2EB"
                                    name="Điểm trung bình"
                                />

                                {/* Điểm min-max để thể hiện phân bố */}
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="minScore"
                                    stroke="#FFCE56"
                                    strokeDasharray="5 5"
                                    name="Min"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="maxScore"
                                    stroke="#4BC0C0"
                                    strokeDasharray="5 5"
                                    name="Max"
                                />

                                {/* Điểm trung vị */}
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="medianScore"
                                    stroke="#9966FF"
                                    name="Median"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            )}

            {/* Question Response Analysis */}
            {questionResponseData.map((question, index) => (
                <Card key={index} className="mb-4">
                    <CardHeader>{question.questionContent}</CardHeader>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={question.slices}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {question.slices.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => [
                                        `${value} (${props.payload.percentage.toFixed(2)}%)`,
                                        props.payload.answerOption
                                    ]}
                                />
                                <Legend
                                    formatter={(value, entry) => (entry?.payload as any)?.answerOption ?? ''}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            ))}
        </Card>
    );
}

