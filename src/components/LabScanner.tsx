import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export function LabScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleUpload = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setResults({
        testosterone: { value: 850, status: 'optimal', label: 'Testosterona Total' },
        estradiol: { value: 25, status: 'optimal', label: 'Estradiol' },
        ldl: { value: 140, status: 'warning', label: 'LDL (Colesterol)' },
      });
    }, 2000);
  };

  return (
    <div className="p-6 text-white w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 tracking-tight">LabScanner OCR</h2>
      
      {!results && (
        <div 
          onClick={handleUpload}
          className="border-2 border-dashed border-cyan-800/50 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-cyan-900/10 transition"
        >
          {isScanning ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Activity className="w-12 h-12 text-cyan-400 mb-4" />
            </motion.div>
          ) : (
            <Upload className="w-12 h-12 text-cyan-500 mb-4" />
          )}
          <p className="text-gray-300 font-medium">
            {isScanning ? 'Analisando biomarcadores...' : 'Faça upload do seu exame de sangue (PDF/Imagem)'}
          </p>
        </div>
      )}

      {results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(results).map((item: any, idx: number) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-start space-x-4">
                <div className="mt-1">
                  {item.status === 'optimal' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className={`text-2xl font-mono font-bold ${item.status === 'optimal' ? 'text-green-400' : 'text-orange-400'}`}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setResults(null)} className="mt-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm transition">
            Escanear outro arquivo
          </button>
        </motion.div>
      )}
    </div>
  );
}
