import { useState } from 'react'
import './App.css'
import ResultViewer from './components/ResultViewer';
import { Globe, Code, Eye, Download, Shield, Zap, FileText, Camera, AlertCircle, Clock } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [reportId, setReportId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('url'); // 'url' or 'html'
  const [htmlInput, setHtmlInput] = useState('');
  const [error, setError] = useState(null);


  const handleAnalyze = async () => {
    setLoading(true);
    setReportId(null);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5050/${mode === 'url' ? 'analyze' : 'analyze-html'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'url' ? { url } : { html: htmlInput })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      setReportId(data.reportId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 p-6 sm:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Accessibility Analyzer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover accessibility issues instantly with enterprise-grade tools. 
              Get actionable insights to make your web content accessible to everyone.
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100">
              <button
                onClick={() => setMode('url')}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  mode === 'url' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Globe className="w-5 h-5 mr-2" />
                Analyze URL
              </button>
              <button
                onClick={() => setMode('html')}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  mode === 'html' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Code className="w-5 h-5 mr-2" />
                Analyze HTML
              </button>
            </div>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8">
            {mode === 'url' ? (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Enter Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Paste HTML Code
                </label>
                <div className="relative">
                  <Code className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    placeholder="<html>&#10;  <head>&#10;    <title>Your HTML</title>&#10;  </head>&#10;  <body>&#10;    <!-- Your content here -->&#10;  </body>&#10;</html>"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg font-mono resize-none h-48"
                  />
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || (!url && !htmlInput)}
              className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl flex items-center justify-center text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  <Clock className="w-5 h-5 mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  Start Analysis
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 flex items-center">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Results */}
          {reportId && <ResultViewer reportId={reportId} />}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Tools Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Powered by Industry Leaders</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">axe-core</p>
                    <p className="text-sm text-gray-600">World's leading accessibility testing engine</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                  <Zap className="w-6 h-6 text-orange-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Lighthouse</p>
                    <p className="text-sm text-gray-600">Google's accessibility auditing tool</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Complete Analysis Package</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: FileText, text: "Professional HTML report with visual insights" },
                  { icon: Shield, text: "Detailed axe-core accessibility violations" },
                  { icon: Zap, text: "Lighthouse performance and accessibility scores" },
                  { icon: Camera, text: "Full-page screenshot for visual reference" }
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center">
                    <Icon className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pb-8">
            <p className="text-gray-500">
              Built with ❤️ for web accessibility • Helping create inclusive digital experiences
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
