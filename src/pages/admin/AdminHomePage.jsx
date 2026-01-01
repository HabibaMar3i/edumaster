import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

export const AdminHomePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const stats = [
        { label: 'Lessons', value: '80', icon: 'fas fa-chalkboard-teacher' },
        { label: 'Exams', value: '14', icon: 'fas fa-question-circle' },
        { label: 'Students', value: '52', icon: 'fas fa-user-circle' },
        { label: 'Scores', value: '200', icon: 'fas fa-clipboard-list' },
    ];

    const data = [
        { name: 'Jun', profit: 20000 },
        { name: 'Feb', profit: 15000 },
        { name: 'Mar', profit: 10000 },
        { name: 'Apr', profit: 8000 },
        { name: 'May', profit: 20000 },
    ];
    // #49BBBD

    const requestTypes = [
        { type: 'Lessons', count: '40%', color: '#E47B5C', bgColor: 'bg-red-400' },
        { type: 'Exams', count: '20%', color: '#4887F6', bgColor: 'bg-blue-400' },
        { type: 'Students', count: '10%', color: '#49BBBD', bgColor: 'bg-teal-400' },
        { type: 'Score', count: '30%', color: '#E2635E', bgColor: 'bg-orange-400' }
    ];

    // Calculate angles for each segment
    const values = [49, 26, 6, 3];
    const total = values.reduce((sum, val) => sum + val, 0);

    let cumulativePercentage = 0;
    const segments = values.map((value, index) => {
        const percentage = (value / total) * 100;
        const startAngle = cumulativePercentage * 3.6; // Convert to degrees
        const endAngle = (cumulativePercentage + percentage) * 3.6;

        const segment = {
            value,
            percentage,
            startAngle,
            endAngle,
            color: requestTypes[index].color
        };

        cumulativePercentage += percentage;
        return segment;
    });

    const createPath = (startAngle, endAngle, innerRadius = 35, outerRadius = 50) => {
        const start = (startAngle - 90) * (Math.PI / 180);
        const end = (endAngle - 90) * (Math.PI / 180);

        const x1 = 50 + outerRadius * Math.cos(start);
        const y1 = 50 + outerRadius * Math.sin(start);
        const x2 = 50 + outerRadius * Math.cos(end);
        const y2 = 50 + outerRadius * Math.sin(end);

        const x3 = 50 + innerRadius * Math.cos(end);
        const y3 = 50 + innerRadius * Math.sin(end);
        const x4 = 50 + innerRadius * Math.cos(start);
        const y4 = 50 + innerRadius * Math.sin(start);

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">جاري تحميل البيانات...</div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6 min-h-screen" style={{ backgroundColor: '#FBFCFE' }}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start gap-2 flex-row">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg">
                                <i className={`${stat.icon} text-[#49BBBD] text-lg`}></i>
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-black font-medium mt-1">{stat.label}</p>
                                <p className="text-xl font-bold text-gray-900 text-left mt-4">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6">

                {/* Wide boxes: Chart & Requests */}
                <div className="flex flex-col gap-6">
                    {/* Chart Section */}
                    <div className="w-full h-[450px] p-4 bg-white rounded-xl shadow" >
                        <h2 className="text-left text-xl font-bold text-black mb-4 mt-2">Profits</h2>
                        <ResponsiveContainer width="100%" height="80%" className="mt-8">
                            <BarChart data={data} margin={{ top: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 4" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    reversed
                                    axisLine={{ stroke: '#000000' }}
                                    tickLine={{ stroke: '#000000' }}
                                />
                                <YAxis
                                    tickFormatter={(value) => value === 0 ? '0' : `${value}`}
                                    orientation="left"
                                    axisLine={{ stroke: 'white' }}
                                    tickLine={{ stroke: 'white' }}
                                    tick={{ dx: 30, dy: -9 }}
                                    width={80}
                                    className='pe-4'
                                />
                                <Tooltip
                                    formatter={(value) => `${value}`}
                                    contentStyle={{ backgroundColor: 'white', border: 'none' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="profit" fill="#49BBBD" barSize={15} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Request Types */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[450px]">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-Left">Total Scores</h3>

                        <div className="flex items-start justify-between mb-6 p-x-4">
                            <div className="flex flex-col gap-y-4  text-sm mt-4" >
                                {requestTypes.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0`} style={{ backgroundColor: item.color }}></div>
                                        <div className="flex flex-col items-start mt-3">
                                            <span className="text-black font-bold text-xl">{item.type}</span>
                                            <span className="text-[#718096] text-xs">{item.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="relative">
                                <svg width="350" height="250" viewBox="0 0 100 100" className='mt-10'>
                                    {segments.map((segment, index) => (
                                        <path
                                            key={index}
                                            d={createPath(segment.startAngle, segment.endAngle)}
                                            fill={segment.color}
                                            stroke="white"
                                            strokeWidth="0"
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;