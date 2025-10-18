import { Coordonate } from "./coordonate.interface";

export interface Windows {
    id?: number;
    name: string;
    location: Coordonate;
    width: number;
    height: number;
    //wallId: number;
}