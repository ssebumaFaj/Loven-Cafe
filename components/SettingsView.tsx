
import React from 'react';
import { Card } from './common/Card';

export const SettingsView: React.FC = () => {
    return (
        <div className="p-6 h-full">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Card className="max-w-2xl">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Store Configuration</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Store Name</label>
                        <input type="text" value="Zenith Cafe" disabled className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Tax Rate (%)</label>
                        <input type="number" value="8" disabled className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Currency Symbol</label>
                        <input type="text" value="$" disabled className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 cursor-not-allowed" />
                    </div>
                    <p className="text-gray-400 text-sm pt-4">More settings for receipt printers, payment terminals, and user roles would appear here.</p>
                </div>
            </Card>
        </div>
    );
};
