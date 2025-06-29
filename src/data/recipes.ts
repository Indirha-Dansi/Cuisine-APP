import { Recipe } from '../types';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Ndole platain mur',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f93bd5f0?w=400&h=250&fit=crop&q=80',
    servings: 4,
    prepTime: 45,
    difficulty: 'medium',
    category: 'Plat principal',
    ingredients: [
      '500g de feuilles de ndole',
      '300g de crevettes',
      '2 plantains mûrs',
      '200g de viande de bœuf',
      'Huile de palme'
    ],
    instructions: [
      'Préparer les feuilles de ndole',
      'Cuire la viande et les crevettes',
      'Ajouter les plantains',
      'Mijoter avec l\'huile de palme'
    ]
  },
  {
    id: '2',
    title: 'Poulet DG',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=250&fit=crop&q=80',
    servings: 6,
    prepTime: 60,
    difficulty: 'medium',
    category: 'Plat principal',
    ingredients: [
      '1 poulet entier',
      '3 plantains',
      '200g de haricots verts',
      'Carotte',
      'Épices locales'
    ],
    instructions: [
      'Découper le poulet',
      'Faire revenir avec les légumes',
      'Ajouter les épices',
      'Laisser mijoter'
    ]
  },
  {
    id: '3',
    title: 'Eru',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=250&fit=crop&q=80',
    servings: 5,
    prepTime: 90,
    difficulty: 'hard',
    category: 'Soupe',
    ingredients: [
      'Feuilles d\'eru',
      'Viande fumée',
      'Poisson séché',
      'Huile de palme',
      'Waterleaf'
    ],
    instructions: [
      'Nettoyer les feuilles d\'eru',
      'Préparer la viande fumée',
      'Cuire ensemble',
      'Assaisonner'
    ]
  }
];