import { Recipe } from '@/types';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Ndole platain mur',
    image: require('../../assets/images/recipes/1.jpg'),
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
    image: require('../../assets/images/recipes/2.jpg'),
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
    image: require('../../assets/images/recipes/2.jpg'),
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
  },
  {
    id: '4',
    title: 'Koki (Haricots pilés)',
    image: require('../../assets/images/recipes/4.jpg'),
    servings: 8,
    prepTime: 30,
    difficulty: 'easy',
    category: 'Plat principal',
    ingredients: [
      '500g de haricots noirs (black-eyed peas)',
      '2 cuillères à soupe d\'huile de palme',
      '1 oignon moyen',
      '2 gousses d\'ail',
      '1 cube de bouillon',
      'Sel et poivre',
      'Feuilles de bananier pour l\'emballage'
    ],
    instructions: [
      'Piler les haricots après les avoir décortiqués',
      'Ajouter l\'oignon, l\'ail et les épices',
      'Incorporer l\'huile de palme',
      'Emballer dans les feuilles de bananier',
      'Cuire à la vapeur pendant 45 minutes'
    ]
  },
  {
    id: '5',
    title: 'Pepper Soup (Poisson)',
    image: require('../../assets/images/recipes/5.jpg'),
    servings: 4,
    prepTime: 25,
    difficulty: 'easy',
    category: 'Soupe',
    ingredients: [
      '1kg de poisson frais (tilapia ou machoiron)',
      '2 cuillères à soupe de pepper soup spice',
      '1 oignon moyen',
      '3 gousses d\'ail',
      'Gingembre frais',
      '2 cubes de bouillon',
      'Feuilles de menthe fraîche',
      'Sel au goût'
    ],
    instructions: [
      'Nettoyer et découper le poisson',
      'Faire bouillir avec les épices et aromates',
      'Ajouter le pepper soup spice',
      'Laisser mijoter 15 minutes',
      'Garnir de feuilles de menthe'
    ]
  },
  {
    id: '6',
    title: 'Fufu et Sauce Jaune',
    image: require('../../assets/images/recipes/6.jpg'),
    servings: 6,
    prepTime: 75,
    difficulty: 'medium',
    category: 'Plat principal',
    ingredients: [
      '1kg de tubercules de manioc',
      '500g de plantain vert',
      '300g de viande de bœuf',
      '200g de poisson fumé',
      '2 cuillères à soupe d\'huile de palme',
      'Tomates fraîches',
      'Oignons',
      'Épices locales (ginger, garlic)'
    ],
    instructions: [
      'Éplucher et cuire le manioc et plantain',
      'Piler ensemble pour former le fufu',
      'Préparer la sauce avec viande et poisson',
      'Ajouter tomates et huile de palme',
      'Servir le fufu avec la sauce chaude'
    ]
  },
  {
    id: '7',
    title: 'Beignets de Haricots (Accra)',
    image: require('../../assets/images/recipes/7.jpg'),
    servings: 10,
    prepTime: 20,
    difficulty: 'easy',
    category: 'Entrée',
    ingredients: [
      '300g de haricots noirs',
      '1 oignon moyen',
      '2 gousses d\'ail',
      '1 piment rouge',
      '1 cube de bouillon',
      'Huile pour friture',
      'Sel au goût'
    ],
    instructions: [
      'Décortiquer et piler les haricots',
      'Ajouter oignon, ail et piment hachés',
      'Assaisonner avec sel et bouillon',
      'Former des boulettes avec la pâte',
      'Frire dans l\'huile chaude jusqu\'à dorure'
    ]
  },
  {
    id: '8',
    title: 'Mbongo Tchobi',
    image: require('../../assets/images/recipes/g8.jpg'),
    servings: 6,
    prepTime: 50,
    difficulty: 'hard',
    category: 'Plat principal',
    ingredients: [
      '1kg de poisson frais (capitaine ou carpe)',
      '200g d\'épices mbongo (mélange d\'épices noires)',
      '2 oignons moyens',
      '4 gousses d\'ail',
      'Gingembre frais',
      '2 cubes de bouillon',
      'Huile de palme',
      'Feuilles de basilic africain'
    ],
    instructions: [
      'Nettoyer et découper le poisson',
      'Préparer la pâte d\'épices mbongo',
      'Faire revenir oignons et aromates',
      'Ajouter la pâte d\'épices et le poisson',
      'Mijoter 30 minutes avec un peu d\'eau',
      'Garnir de basilic avant de servir'
    ]
  }
];