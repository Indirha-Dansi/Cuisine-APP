export interface Recipe {
    id: string;
    title: string;
    image: string;
    servings: number;
    prepTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    ingredients: string[];
    instructions: string[];
  }
  
  export interface PlanningEntry {
    id: number;
    date: string;
    hasRecipe: boolean;
    recipe?: Recipe;
  }
  
  export interface Category {
    id: string;
    name: string;
    image?: string;
    color?: string;
  }
  
  export type RootStackParamList = {
    MainTabs: undefined;
    RecipeDetail: { recipeId: string };
  };
  
  export type BottomTabParamList = {
    Recipes: undefined;
    Shop: undefined;
    Planning: undefined;
    Coffee: undefined;
    Categories: undefined;
  };