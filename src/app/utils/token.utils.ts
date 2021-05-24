import { localStorageConstants } from "../constants/local-storage.constants";
import { Session } from "../interfaces/session.interface";

export const setTokenToLocalStorage = (data: Session) => {
    localStorage.setItem(localStorageConstants.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(localStorageConstants.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem(localStorageConstants.ID_TOKEN, data.idToken);
    localStorage.setItem(localStorageConstants.USER, btoa(JSON.stringify((data.user))));
};

export const isAuthenticated = (): boolean => {
    if (localStorage.getItem(localStorageConstants.ACCESS_TOKEN) &&
        localStorage.getItem(localStorageConstants.REFRESH_TOKEN) &&
        localStorage.getItem(localStorageConstants.ID_TOKEN)) {
        return true;
    } else {
        return false;
    }
};

export const clearTokens = () => {
    localStorage.clear();
};
