import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Smartphone, 
  Mail, 
  Bell, 
  Eye,
  Monitor,
  Layout,
  Save,
  Copy
} from 'lucide-react';

const TemplatePreview = () => {
  const [activeView, setActiveView] = useState('email');
  const [templateData, setTemplateData] = useState({
    subject: "Reminder TVA: {{deadline_date}}",
    content: `Stimate {{client_name}},

Vă reamintim că termenul pentru declarația TVA este {{deadline_date}}.

Documente necesare:
{{#each documents}}
- {{this}}
{{/each}}

Cu stimă,
Echipa de contabilitate`
  });

  // Date de test pentru preview
  const previewData = {
    client_name: "Tech Solutions SRL",
    deadline_date: "25.12.2024",
    documents: [
      "Jurnal vânzări",
      "Jurnal cumpărări",
      "Balanță de verificare"
    ]
  };

  const viewOptions = [
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile' },
    { id: 'push', icon: Bell, label: 'Push' }
  ];

  const replaceVariables = (text) => {
    return text.replace(/{{(\w+)}}/g, (match, key) => {
      if (key === 'documents') {
        return previewData.documents.map(doc => `- ${doc}`).join('\n');
      }
      return previewData[key] || match;
    });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Editor Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subiect</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={templateData.subject}
                onChange={(e) => setTemplateData({...templateData, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Conținut</label>
              <textarea
                className="w-full h-[400px] px-3 py-2 border rounded-lg font-mono text-sm"
                value={templateData.content}
                onChange={(e) => setTemplateData({...templateData, content: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Preview Live</span>
              <div className="flex gap-2">
                {viewOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <button 
                      key={option.id}
                      onClick={() => setActiveView(option.id)}
                      className={`p-2 rounded ${activeView === option.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                      aria-label={option.label}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeView === 'email' && (
              <div className="border rounded-lg p-4 space-y-4">
                <div className="border-b pb-2">
                  <p className="font-medium">
                    Subiect: {replaceVariables(templateData.subject)}
                  </p>
                </div>
                <div className="whitespace-pre-wrap">
                  {replaceVariables(templateData.content)}
                </div>
              </div>
            )}
            {activeView === 'mobile' && (
              <div className="border rounded-lg p-4 mx-auto" style={{ maxWidth: '320px' }}>
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-medium text-sm mb-2">Notificare SMS</h3>
                  <p className="text-sm">
                    {replaceVariables(templateData.content.split('\n')[0])}
                  </p>
                </div>
              </div>
            )}
            {activeView === 'push' && (
              <div className="border rounded-lg p-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">MetaTask</p>
                      <p className="text-xs text-gray-500">acum</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    {replaceVariables(templateData.subject)}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Variabile disponibile */}
        <Card>
          <CardHeader>
            <CardTitle>Variabile Disponibile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(previewData).map(([key, value]) => (
                <div key={key} className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm font-mono text-blue-600">{'{{' + key + '}}'}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {Array.isArray(value) ? value.join(', ') : value.toString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplatePreview;