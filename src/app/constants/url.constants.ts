export const BASE_URL = 'http://localhost:3000/dev/api'

export const APIURL = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    VERIFY_USER: '/user/verify',
    REFRESH_SESSION: '/refreshSession',
    CHANGE_PASSWORD: '/password/change',
    FORGOT_PASSWORD: '/password/forget',
    RESET_PASSWORD: '/password/reset',
    GET_EVENT_TYPES: '/event/types',
    CREATE_EVENT: '/event',
    GET_EVENTS: (state: string, date: string) => `/events/${state}?date=${date}`,
    SEARCH_EVENTS: (state: string) => `/events/search/${state}`,
    GET_EVENT: (id:number) => `/event/${id}`,
    JOIN_EVENT: '/event/join',
    GET_JOINED_EVENTS: (id: number) => `/events/joined/${id}`,
    GET_HOSTED_EVENTS: (id: number) => `/events/hosted/${id}`,
    GET_CARBON_CATEGORIES: '/carbon/categories',
    CREATE_USER_EMISSION: (id: number) => `/carbon/emission/user/${id}`,
    GET_USER_EMISSION: (id: number) => `/carbon/emission/user/${id}`,
    GET_PARTICIPANTS: (id: number) => `/event/${id}/participants`,
    GET_USER_ACHIEVEMENTS: (id: number)=> `/achievements/${id}`,
    ACHIEVEMENT_SHOWN: (id: number) => `/achievement/${id}`,
    FIRST_LOGIN_UPDATE: (id: number) => `/user/login/update/${id}`,
    GET_USER: (id: number) => `/user/${id}`
}

export const ROUTERURL = {
    LOGIN: 'account/login',
    LOGOUT: 'account/logout',
    SIGNUP: 'account/signup',
    LANDING: '',
    LAWS: 'laws',
    EVENTS: 'events',
    EVENT_DETAILS: 'events/details',
    MY_EVENTS: 'events/my',
    RECYCLING: 'recycling',
    CARBON: 'carbondating',
}