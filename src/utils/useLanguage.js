import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const translations = {
  pt: {
    // App Name
    appName: 'Transcender',
    
    // Navigation
    home: 'Início',
    guides: 'Guias',
    healthcare: 'Profissionais',
    hospitals: 'Hospitais',
    news: 'Notícias',
    opportunities: 'Oportunidades',
    
    // Homepage
    heroTitle: 'Recursos Verificados para a',
    heroTitleHighlight: 'Comunidade Trans',
    heroSubtitle: 'Encontre informações confiáveis sobre mudança de nome, terapia hormonal, profissionais de saúde e oportunidades.',
    searchPlaceholder: 'Buscar guias, profissionais...',
    exploreCategories: 'Explore por Categoria',
    
    // Categories
    guidesCategory: 'Guias',
    providersCategory: 'Profissionais',
    hospitalsCategory: 'Hospitais SUS',
    newsCategory: 'Notícias',
    opportunitiesCategory: 'Oportunidades',
    
    // Category descriptions
    guidesDescription: 'Informações verificadas',
    providersDescription: 'Médicos especializados',
    hospitalsDescription: 'Hospitais públicos',
    newsDescription: 'Últimas notícias',
    opportunitiesDescription: 'Vagas e cursos',
    
    // Recent content
    recentGuides: 'Guias Recentes',
    recentNews: 'Notícias Recentes',
    
    // Common actions
    search: 'Buscar',
    verified: 'Verificado',
    onlyVerified: 'Apenas Verificados',
    readMore: 'Ler Guia Completo',
    
    // Categories
    allCategories: 'Todas',
    nameChange: 'Mudança de Nome',
    hormoneTherapy: 'Terapia Hormonal',
    healthcare: 'Saúde',
    legalRights: 'Direitos Legais',
    socialIssues: 'Questões Sociais',
    
    // Loading and errors
    loading: 'Carregando...',
    loadingGuides: 'Carregando guias...',
    errorLoading: 'Erro ao carregar. Tente novamente.',
    
    // Empty states
    noGuidesFound: 'Nenhum guia encontrado',
    adjustFilters: 'Tente ajustar os filtros ou termos de busca.',
    
    // Results
    showing: 'Mostrando',
    guide: 'guia',
    guides: 'guias',
    for: 'para',
    
    // Language
    language: 'Idioma',
    portuguese: 'Português',
    english: 'English',
  },
  en: {
    // App Name
    appName: 'Transcend',
    
    // Navigation
    home: 'Home',
    guides: 'Guides',
    healthcare: 'Healthcare',
    hospitals: 'Hospitals',
    news: 'News',
    opportunities: 'Opportunities',
    
    // Homepage
    heroTitle: 'Verified Resources for the',
    heroTitleHighlight: 'Trans Community',
    heroSubtitle: 'Find reliable information about name changes, hormone therapy, healthcare professionals, and opportunities.',
    searchPlaceholder: 'Search guides, professionals...',
    exploreCategories: 'Explore by Category',
    
    // Categories
    guidesCategory: 'Guides',
    providersCategory: 'Healthcare',
    hospitalsCategory: 'SUS Hospitals',
    newsCategory: 'News',
    opportunitiesCategory: 'Opportunities',
    
    // Category descriptions
    guidesDescription: 'Verified information',
    providersDescription: 'Specialized doctors',
    hospitalsDescription: 'Public hospitals',
    newsDescription: 'Latest news',
    opportunitiesDescription: 'Jobs and courses',
    
    // Recent content
    recentGuides: 'Recent Guides',
    recentNews: 'Recent News',
    
    // Common actions
    search: 'Search',
    verified: 'Verified',
    onlyVerified: 'Verified Only',
    readMore: 'Read Full Guide',
    
    // Categories
    allCategories: 'All',
    nameChange: 'Name Change',
    hormoneTherapy: 'Hormone Therapy',
    healthcare: 'Healthcare',
    legalRights: 'Legal Rights',
    socialIssues: 'Social Issues',
    
    // Loading and errors
    loading: 'Loading...',
    loadingGuides: 'Loading guides...',
    errorLoading: 'Error loading. Please try again.',
    
    // Empty states
    noGuidesFound: 'No guides found',
    adjustFilters: 'Try adjusting the filters or search terms.',
    
    // Results
    showing: 'Showing',
    guide: 'guide',
    guides: 'guides',
    for: 'for',
    
    // Language
    language: 'Language',
    portuguese: 'Português',
    english: 'English',
  }
};

export const useLanguageStore = create((set, get) => ({
  language: 'pt',
  isLoaded: false,
  
  setLanguage: async (lang) => {
    set({ language: lang });
    await AsyncStorage.setItem('transcend-language', lang);
  },
  
  loadLanguage: async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('transcend-language');
      if (savedLanguage) {
        set({ language: savedLanguage });
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      set({ isLoaded: true });
    }
  },
  
  t: (key) => {
    const { language } = get();
    return translations[language]?.[key] || key;
  },
  
  translations,
}));

export const useLanguage = () => {
  const { language, setLanguage, t, loadLanguage, isLoaded } = useLanguageStore();
  return { language, setLanguage, t, loadLanguage, isLoaded };
};