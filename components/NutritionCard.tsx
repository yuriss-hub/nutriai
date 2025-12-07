import React from 'react';
import { NutritionalData } from '../types';
import MacroChart from './MacroChart';
import { Flame, Beef, Wheat, Droplet, Scale, Info } from 'lucide-react';

interface NutritionCardProps {
  data: NutritionalData;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in transition-all duration-500">
      <div className="bg-green-600 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold capitalize">{data.name}</h2>
            <p className="text-green-100 mt-1 flex items-center gap-2">
              <Scale size={16} />
              Porção: {data.servingSize}
            </p>
          </div>
          <div className="text-center bg-green-700 bg-opacity-30 rounded-lg p-3 backdrop-blur-sm">
            <span className="block text-4xl font-bold">{data.calories}</span>
            <span className="text-xs uppercase tracking-wide opacity-80">Kcal</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
              <div className="bg-blue-100 p-2 rounded-full mb-2 text-blue-600">
                <Beef size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-800">{data.protein}g</span>
              <span className="text-sm text-gray-500">Proteína</span>
            </div>

            <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center justify-center text-center">
              <div className="bg-red-100 p-2 rounded-full mb-2 text-red-600">
                <Wheat size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-800">{data.carbs}g</span>
              <span className="text-sm text-gray-500">Carboidratos</span>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex flex-col items-center justify-center text-center">
              <div className="bg-yellow-100 p-2 rounded-full mb-2 text-yellow-600">
                <Droplet size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-800">{data.fat}g</span>
              <span className="text-sm text-gray-500">Gorduras</span>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col items-center justify-center text-center">
              <div className="bg-green-100 p-2 rounded-full mb-2 text-green-600">
                <Flame size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-800">{data.fiber}g</span>
              <span className="text-sm text-gray-500">Fibras</span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-gray-500 font-medium mb-2 uppercase text-xs tracking-wider">Distribuição de Macros</h3>
            <MacroChart data={data} />
          </div>
        </div>

        {/* AI Insight */}
        <div className="mt-8 bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-3">
          <Info className="text-green-600 flex-shrink-0 mt-1" size={20} />
          <p className="text-gray-600 text-sm leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;