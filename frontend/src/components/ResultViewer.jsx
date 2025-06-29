import React, { useState } from 'react';
import { Download, Shield, Zap, FileText, Camera, CheckCircle } from 'lucide-react';

function ResultViewer({ reportId }) {
    const base = `http://localhost:5050/download/${reportId}`;

    const downloadTypes = [
        { type: 'report', label: 'HTML Report', icon: FileText, color: 'bg-purple-500' },
        { type: 'axe', label: 'Axe Data', icon: Shield, color: 'bg-blue-500' },
        { type: 'lighthouse', label: 'Lighthouse Data', icon: Zap, color: 'bg-orange-500' },
        { type: 'screenshot', label: 'Screenshot', icon: Camera, color: 'bg-green-500' }
    ];

    return (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Analysis Complete!</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {downloadTypes.map(({ type, label, icon: Icon, color }) => (
                    <a
                        key={type}
                        href={`${base}/html`}
                        className={`${color} hover:opacity-90 transform hover:scale-105 transition-all duration-200 text-white p-4 rounded-xl flex items-center justify-between group shadow-lg`}
                    >
                        <div className="flex items-center">
                            <Icon className="w-5 h-5 mr-3" />
                            <span className="font-medium">{label}</span>
                        </div>
                        <Download className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default ResultViewer;