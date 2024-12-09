import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Download, 
  Clock, 
  Calendar,
  Settings,
  Filter,
  BarChart,
  Play
} from 'lucide-react';

const ReportGenerator = () => {
  const [selectedReport, setSelectedReport] = useState('financial');
  const [reportSettings, setReportSettings] = useState({
    period: 'current_month',
    format: 'pdf',
    schedule: 'manual',
    distribution: ['email']
  });

  const reportTypes = [
    {
      id: 'financial',
      name: 'Raport Financiar',
      description: 'Balanță, P&L, Cash Flow',
      icon: BarChart
    },
    {
      id: 'fiscal',
      name: 'Raport Fiscal',
      description: 'TVA, Contribuții, Taxe',
      icon: FileText
    },
    {
      id: 'compliance',
      name: 'Raport Conformitate',
      description: 'Status declarații și termene',
      icon: Calendar
    }
  ];

  const reportSections = [
    { id: 'summary', name: 'Sumar executiv' },
    { id: 'indicators', name: 'Indicatori financiari' },
    { id: 'transactions', name: 'Detalii tranzacții' },
    { id: 'charts', name: 'Grafice și analize' },
    { id: 'recommendations', name: 'Recomandări' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Selector tip raport */}
        <div className="col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tip Raport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {reportTypes.map((report) => {
                  const ReportIcon = report.icon;
                  return (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`w-full p-4 rounded-lg border text-left flex items-center gap-3
                        ${selectedReport === report.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                    >
                      <ReportIcon className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-gray-500">{report.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Programare Raport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Frecvență</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg"
                    value={reportSettings.schedule}
                    onChange={(e) => setReportSettings({...reportSettings, schedule: e.target.value})}
                  >
                    <option value="manual">Manual</option>
                    <option value="daily">Zilnic</option>
                    <option value="weekly">Săptămânal</option>
                    <option value="monthly">Lunar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Format Export</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg"
                    value={reportSettings.format}
                    onChange={(e) => setReportSettings({...reportSettings, format: e.target.value})}
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="html">HTML</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configurator raport */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Configurare Raport</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    Preview
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Generează Raport
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Filtre și setări */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Perioadă</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="current_month">Luna curentă</option>
                      <option value="last_month">Luna anterioară</option>
                      <option value="current_quarter">Trimestrul curent</option>
                      <option value="current_year">An curent</option>
                      <option value="custom">Personalizat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Clienți</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="all">Toți clienții</option>
                      <option value="tech">Tech Solutions SRL</option>
                      <option value="construct">Construct Pro SA</option>
                    </select>
                  </div>
                </div>

                {/* Secțiuni raport */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Secțiuni Incluse</h3>
                  <div className="space-y-2">
                    {reportSections.map((section) => (
                      <label key={section.id} className="flex items-center justify-between">
                        <span className="text-sm">{section.name}</span>
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="rounded border-gray-300"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Personalizare vizuală */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Personalizare</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Branding</label>
                      <select className="w-full px-3 py-2 border rounded-lg">
                        <option value="standard">Template standard</option>
                        <option value="client">Template client</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Limba</label>
                      <select className="w-full px-3 py-2 border rounded-lg">
                        <option value="ro">Română</option>
                        <option value="en">Engleză</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;