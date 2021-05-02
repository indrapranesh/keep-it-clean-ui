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
    GET_EVENTS: '/events',
    GET_EVENT: (id:number) => `/event/${id}`,
    JOIN_EVENT: '/event/join',
    GET_JOINED_EVENTS: (id: number) => `/events/joined/${id}`,
    GET_HOSTED_EVENTS: (id: number) => `/events/hosted/${id}`
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