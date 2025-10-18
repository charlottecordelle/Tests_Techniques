import { Levels } from "./levels.interface";
import { Roofs } from "./roofs.interface";

export interface Houses {
    id?: number;
    name: string;
    numberOfLevels: number;
    numberOfCommonWall: number;
    levels: Levels[];
    roof: Roofs;

    projectId: number;
}