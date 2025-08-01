export const useStorage = <T>() => {
    
    const toLocalStorage = (key: string, arr: Array<T>): void => {
        localStorage.setItem(key, JSON.stringify(arr));        
    }

    const fromLocalStorage = (key: string, defaultArr: Array<T>): Array<T> => {
        const currentArr = localStorage.getItem(key);
        
        if (!currentArr) {            
            toLocalStorage(key, defaultArr)
            return defaultArr
        }
        
        try {
            const parsed: unknown = JSON.parse(currentArr);
            if (Array.isArray(parsed)) {
                return parsed as Array<T>;
            }
            return defaultArr;
        } catch {
            return defaultArr;
        }
    }

    return {
        toLocalStorage,
        fromLocalStorage
    }
}
  