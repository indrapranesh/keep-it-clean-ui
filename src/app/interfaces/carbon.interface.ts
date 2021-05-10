export interface UserEmissionReq {
    carbonEmission: number;
    date: Date;
}

export interface UserEmissionRes {
    id: number;
    userId: number;
    date: string;
    carbonEmission: number;
    disabled: boolean;
}