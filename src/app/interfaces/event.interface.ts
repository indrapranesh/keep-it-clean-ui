export interface ICreateEvent {
    name: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
    eventType: number;
    creator: number;
    startTime: Date;
    endTime: Date;
}