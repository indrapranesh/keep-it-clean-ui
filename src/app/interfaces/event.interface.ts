export interface ICreateEvent {
    name: string;
    description: string;
    address: string;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
    eventType: number;
    creator: number;
    phoneNumber: string;
    startTime: Date;
    endTime: Date;
}

export interface IJoinEvent {
    userId: number;
    eventId: number;
}