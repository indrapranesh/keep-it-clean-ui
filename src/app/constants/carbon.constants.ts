export const units = {
    electricity: {
        units: ['kWh'],
        baseUnit: 'kWh'
    },
    gas: {
        units: ['therms'],
        baseUnit: 'therms'
    },
    liquid: {
        units: ['gallon', 'litre'],
        baseUnit: 'gallon',
        litreToGallon: (litre: number) => {
            return (litre*0.264172)
        } 
    },
    solid: {
        units: ['pound', 'kg'],
        baseUnit: 'pound',
        kgToPound: (kg: number) => {
            return (kg*2.20462)
        }
    },
    distance: {
        units: ['mile', 'km'],
        baseUnit: 'mile',
        kmToMile: (km: number) => {
            return (km * 0.621371)
        }
    }
}