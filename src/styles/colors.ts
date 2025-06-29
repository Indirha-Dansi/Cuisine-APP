export const colors = {
    primary: '#c8bfa0',      // Couleur principale beige
    secondary: '#e8e8e8',    // Gris clair pour les contenus
    dark: '#333333',         // Noir pour les textes et boutons
    gray: '#a8a8a8',         // Gris pour la barre de recherche
    lightGray: '#d0d0d0',    // Gris très clair
    white: '#ffffff',
    black: '#000000',
    
    // Couleurs d'accent
    accent: '#666666',
    border: '#cccccc',
    placeholder: '#999999',
    
    // Couleurs pour les catégories
    categoryRed: '#ff6b6b',
    categoryBlue: '#4ecdc4',
    categoryGreen: '#45b7d1',
    categoryOrange: '#f9ca24',
  } as const;
  
  export type ColorKeys = keyof typeof colors;