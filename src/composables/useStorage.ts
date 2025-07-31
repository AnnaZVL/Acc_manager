export const useStorage = <T>() => {
    
    const toLocalStorage = (key: string, arr: Array<T>):void => {
        localStorage.setItem(key, JSON.stringify(arr));        
    }

    const fromLocalStorage = (key: string, defaultArr: Array<T>): Array<T> => {
        let currentArr = localStorage.getItem(key);
        
        if (!currentArr) {            
            toLocalStorage(key, defaultArr)
            return defaultArr
        }
        return JSON.parse(currentArr) as Array<T>
    }

    return {
        toLocalStorage,
        fromLocalStorage
    }
}
  