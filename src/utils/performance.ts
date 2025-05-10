
/**
 * Utilitários de performance para o aplicativo
 */

/**
 * Função para debounce de eventos
 * Útil para evitar múltiplas chamadas de função em eventos como resize ou input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Função para memorizar resultados de funções pesadas
 * Evita recálculos desnecessários para as mesmas entradas
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    
    return result;
  };
}

/**
 * Função para otimizar imagens
 * Retorna URL com parâmetros de dimensão otimizada
 */
export function optimizeImageUrl(url: string, width?: number): string {
  // Se for uma URL de placeholder, retorna imagem otimizada
  if (url.includes('placeholder.com')) {
    return width ? `https://via.placeholder.com/${width}x${Math.floor(width / 2)}` : url;
  }
  
  // Para URLs externas, retornamos como está
  return url;
}

/**
 * Função para ordenar array com minimização de renderizações
 * Usa object reference para detectar mudanças reais
 */
export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  // Se o array for vazio ou tiver apenas um elemento, retornar como está
  if (array.length <= 1) return array;
  
  // Cria cópia para não mutar o array original
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1]; // Preserva a ordem original
  });
  
  return stabilizedThis.map((el) => el[0]);
}

/**
 * Gera um ID único para componentes
 */
export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
