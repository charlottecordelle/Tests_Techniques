import { Floors } from "./floors.interface";
import { Walls } from "./walls.interface";

export interface Levels {
    id?: number;
    name: string;
    hsp: number;
    walls: Walls[];
    floor: Floors;
    //houseId: number;
}