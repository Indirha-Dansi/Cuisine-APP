// Service pour l'intégration de l'API Gemini

// Note: Pour utiliser ce service, vous devrez installer le package @google/generative-ai
// npm install @google/generative-ai

import { GoogleGenerativeAI } from '@google/generative-ai';

// Import de la variable d'environnement depuis le fichier .env
import { GEMINI_API_KEY } from '@env';

// Utilisation de la clé API depuis les variables d'environnement
const API_KEY = GEMINI_API_KEY || 'VOTRE_CLE_API_GEMINI';

// Initialiser l'API Gemini
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // Le modèle Gemini à utiliser

/**
 * Envoie un message à l'API Gemini et retourne la réponse
 * @param message Le message de l'utilisateur
 * @returns La réponse de l'API Gemini
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    // Vérifier si l'API_KEY est valide
    if (!API_KEY || API_KEY === 'VOTRE_CLE_API_GEMINI') {
      console.warn('Clé API Gemini non configurée. Mode démo activé.');
      // Retourner une réponse simulée en mode démo
      return generateDemoResponse(message);
    }
    
    // Appel réel à l'API Gemini
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Erreur lors de la communication avec Gemini:', error);
    return 'Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.';
  }
};

/**
 * Génère une recette basée sur les ingrédients fournis
 * @param ingredients - Liste d'ingrédients disponibles
 * @returns Une recette générée par Gemini
 */
export const generateRecipeFromIngredients = async (ingredients: string[]): Promise<string> => {
  try {
    const prompt = `Avec les ingrédients suivants: ${ingredients.join(', ')}, 
    propose une recette simple et délicieuse. 
    Inclus les étapes de préparation et le temps de cuisson.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Erreur lors de la génération de recette:', error);
    throw new Error('Impossible de générer une recette');
  }
};

/**
 * Obtient des conseils nutritionnels pour un plat spécifique
 * @param dish - Le nom du plat
 * @returns Informations nutritionnelles générées par Gemini
 */
export const getNutritionalInfo = async (dish: string): Promise<string> => {
  try {
    const prompt = `Donne-moi des informations nutritionnelles approximatives pour le plat suivant: ${dish}. 
    Inclus les calories, protéines, glucides et lipides si possible.`;
    
    return sendMessageToGemini(prompt);
  } catch (error) {
    console.error('Erreur lors de l\'obtention des informations nutritionnelles:', error);
    return 'Impossible d\'obtenir les informations nutritionnelles pour le moment.';
  }
};

/**
 * Génère une réponse démo pour le mode sans API key
 * @param message Le message de l'utilisateur
 * @returns Une réponse simulée
 */
const generateDemoResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('recette') || lowerMessage.includes('cuisine') || lowerMessage.includes('plat')) {
    return "Voici une idée de recette que vous pourriez essayer : Risotto aux champignons et parmesan. Pour 4 personnes, vous aurez besoin de 300g de riz arborio, 200g de champignons, 1 oignon, 1L de bouillon de légumes, 50g de parmesan râpé, 10cl de vin blanc sec et 30g de beurre. Faites revenir l'oignon dans le beurre, ajoutez le riz, déglacez au vin blanc, puis ajoutez le bouillon petit à petit tout en remuant. Après 18 minutes, incorporez les champignons poêlés et le parmesan. Servez immédiatement !";
  } else if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
    return "Bonjour ! Je suis votre assistant culinaire. Comment puis-je vous aider aujourd'hui ? Vous cherchez une recette particulière ou des conseils de cuisine ?";
  } else if (lowerMessage.includes('ingrédient') || lowerMessage.includes('aliment')) {
    return "Les ingrédients de base à avoir dans votre cuisine sont : huile d'olive, sel, poivre, ail, oignons, tomates, farine, riz, pâtes, œufs, beurre et quelques épices comme le paprika, le cumin et les herbes de Provence.";
  } else if (lowerMessage.includes('nutrition') || lowerMessage.includes('calories')) {
    return "Pour une alimentation équilibrée, il est recommandé de consommer quotidiennement : des fruits et légumes (au moins 5 portions), des féculents (pain, pâtes, riz), des protéines (viande, poisson, œufs, légumineuses), des produits laitiers et de limiter les aliments gras, sucrés et salés.";
  } else if (lowerMessage.includes('merci')) {
    return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
  } else {
    return "Je suis votre assistant culinaire virtuel. Je peux vous aider à trouver des recettes, vous donner des conseils de cuisine ou répondre à vos questions sur la gastronomie. N'hésitez pas à me poser une question spécifique !";
  }
};
