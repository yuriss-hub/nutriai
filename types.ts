export interface NutritionalData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingSize: string;
  description: string;
}

export interface MacroChartData {
  name: string;
  value: number;
  fill: string;
}
