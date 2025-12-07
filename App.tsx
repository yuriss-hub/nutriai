import React, { useState } from 'react';
import { analyzeFood } from './services/gemini';
import { NutritionalData } from './types';
import NutritionCard from './components/NutritionCard';
import { Search, Loader2, UtensilsCrossed, Leaf } from 'lucide-react';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NutritionalData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeFood(query);
      setData(result);
    } catch (err) {
      setError('Não foi possível analisar este alimento. Tente ser mais específico (ex: "100g de peito de frango").');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-green-200 selection:text-green-900">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2">
          <div className="bg-green-600 text-white p-2 rounded-lg">
            <Leaf size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">NutriSimulador <span className="text-green-600">AI</span></h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Descubra as <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">calorias</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            Digite qualquer alimento ou refeição abaixo e nossa Inteligência Artificial calculará os macronutrientes para você.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-12 relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {loading ? (
              <Loader2 className="animate-spin text-green-600" size={24} />
            ) : (
              <Search className="text-gray-400 group-focus-within:text-green-600 transition-colors" size={24} />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: 1 banana prata, arroz com feijão, hamburger..."
            className="w-full pl-14 pr-4 py-5 text-lg rounded-2xl border-2 border-gray-200 shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300 placeholder:text-gray-400 bg-white"
            disabled={loading}
          />
          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-3 top-3 bottom-3 bg-gray-900 text-white px-6 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            Analisar
          </button>
        </form>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-center justify-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {!data && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center p-8 border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <UtensilsCrossed size={48} className="opacity-50" />
              </div>
              <p className="font-medium">Nenhum alimento analisado ainda</p>
              <p className="text-sm mt-2">Tente buscar por "Pizza de calabresa" ou "100g de aveia"</p>
            </div>
          )}

          {data && <NutritionCard data={data} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-200 mt-auto bg-white">
        <p>© {new Date().getFullYear()} NutriSimulador AI. Dados gerados por Gemini 2.5.</p>
      </footer>
    </div>
  );
};

export default App;