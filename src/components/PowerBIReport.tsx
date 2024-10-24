import React, { useState, useEffect } from 'react';

interface PowerBIReportProps {
  reportUrl?: string;
  className?: string;
}

const PowerBIReport: React.FC<PowerBIReportProps> = ({
  reportUrl = 'https://app.powerbi.com/view?r=eyJrIjoiODNlN2NmNDAtMjNmNC00NTE1LWE3M2QtMjNlZGM2YjQxNDU4IiwidCI6IjhjYTUyZTJiLTFkMjAtNDI3NC05YTEzLWJkNzZlY2NiODFkMSIsImMiOjR9',
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeError = () => {
    setError('Failed to load the Power BI report. Please try again later.');
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2">
      <div className="w-full max-w-[95%]">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white p-3">
            <h2 className="text-xl font-semibold">Power BI Dashboard</h2>
          </div>

          {/* Content */}
          <div className="relative">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
                  <p className="mt-4 text-gray-600">Loading report...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                <div className="text-center p-6">
                  <div className="text-red-500 text-xl mb-4">⚠️</div>
                  <p className="text-red-600">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* PowerBI iframe */}
            <iframe
              title="Power BI Report"
              src={reportUrl}
              frameBorder="0"
              allowFullScreen={true}
              className={`w-full h-[calc(100vh-8rem)] min-h-[600px] ${className}`}
              onError={handleIframeError}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-3 border-t">
            <p className="text-sm text-gray-500 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBIReport;