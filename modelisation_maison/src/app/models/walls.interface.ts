import { Coordonate } from "./coordonate.interface";
import { Doors } from "./doors.interface";
import { Windows as WindowsModel } from "./windows.interface";

export interface Walls {
    id?: number;
    name: string;
    length: number;
    ep: number;
    startCoordonates: Coordonate;
    endCoordonates: Coordonate;
    windows: WindowsModel[];
    doors: Doors[];
    // isCommonWall: boolean;
    // levelId: number;
}