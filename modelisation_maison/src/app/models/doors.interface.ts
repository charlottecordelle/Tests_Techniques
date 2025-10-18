import { Coordonate } from "./coordonate.interface";

export interface Doors {
    id?: number;
    name?: string;
    location: Coordonate;
    width: number;
    height: number;
    wallId: number;
}