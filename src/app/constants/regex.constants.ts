export const REGEX_CONSTANTS = {
    ALPHA: '^[a-zA-Z ]+$',
    NUMBERS: '^\d*$',
    PHONE_NUMBER_WITH_COUTRY_CODE: '^[+][0-9]{10,13}$',
    PHONE_NUMBER_WITHOUT_COUTRY_CODE: '^[0-9]{10,10}$',
    NUMBERS_WITH_DECIMALS: '^-?(\\d*)?\\.?(\\d*)$',
    EMAIL: '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',
}