const initFromLocalStorage = <T>(storeName: string, initialState: T) => {

    const elementFromStore = localStorage.getItem(storeName);

    return elementFromStore
        ? JSON.parse(elementFromStore) as T
        : initialState;
}

export {
    initFromLocalStorage
}