import React, { useState, useEffect } from 'react';
import { MOCK_SALES } from '../data/mockData';
import { Sale } from '../types';
import { Card } from './common/Card';

const processSalesData = (sales: Sale[]) => {
    const dailySales: { [date: string]: number } = {};
    const productSales: { [name: string]: number } = {};

    sales.forEach(sale => {
        // Daily sales
        dailySales[sale.date] = (dailySales[sale.date] || 0) + sale.total;

        // Product sales
        sale.items.forEach(item => {
            productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
        });
    });

    const dailyData = Object.keys(dailySales).map(date => ({
        date,
        sales: dailySales[date],
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const productData = Object.keys(productSales).map(name => ({
        name,
        quantity: productSales[name],
    })).sort((a, b) => b.quantity - a.quantity).slice(0, 5); // Top 5 products

    const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
    const totalTransactions = sales.length;
    const avgSale = totalSales > 0 ? totalSales / totalTransactions : 0;

    return { dailyData, productData, totalSales, totalTransactions, avgSale };
};


export const ReportsView: React.FC = () => {
    const [recharts, setRecharts] = useState<any | null>(null);

    useEffect(() => {
        if ((window as any).Recharts) {
            setRecharts((window as any).Recharts);
            return;
        }

        const intervalId = setInterval(() => {
            if ((window as any).Recharts) {
                setRecharts((window as any).Recharts);
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);
    
    const { dailyData, productData, totalSales, totalTransactions, avgSale } = processSalesData(MOCK_SALES);
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

    if (!recharts) {
        return (
            <div className="p-6 h-full flex items-center justify-center">
                <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-lg font-semibold text-gray-300">Loading Analytics...</p>
                </div>
            </div>
        );
    }

    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } = recharts;

    return (
        <div className="p-6 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6">Sales & Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <h3 className="text-gray-400 text-sm font-medium">Total Revenue</h3>
                    <p className="text-3xl font-bold text-green-400 mt-1">${totalSales.toFixed(2)}</p>
                </Card>
                <Card>
                    <h3 className="text-gray-400 text-sm font-medium">Total Transactions</h3>
                    <p className="text-3xl font-bold text-indigo-400 mt-1">{totalTransactions}</p>
                </Card>
                <Card>
                    <h3 className="text-gray-400 text-sm font-medium">Average Sale Value</h3>
                    <p className="text-3xl font-bold text-yellow-400 mt-1">${avgSale.toFixed(2)}</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3 h-96 flex flex-col">
                    <h3 className="font-semibold mb-4 shrink-0">Daily Sales</h3>
                    <div className="flex-grow">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                <XAxis dataKey="date" stroke="#a0aec0" />
                                <YAxis stroke="#a0aec0" />
                                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} />
                                <Legend />
                                <Bar dataKey="sales" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card className="lg:col-span-2 h-96 flex flex-col">
                    <h3 className="font-semibold mb-4 shrink-0">Top Selling Products</h3>
                    <div className="flex-grow">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={productData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="quantity"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {productData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};
