import { Houses } from '../models/houses.interface';
import { Levels } from '../models/levels.interface';
import { Walls } from '../models/walls.interface';
import { Floors } from '../models/floors.interface';
import { Doors } from '../models/doors.interface';
import { Windows } from '../models/windows.interface';
import { Coordonate } from '../models/coordonate.interface';

export const testHouse: Houses = {
  id: 1,
  name: 'Maison Test',
  numberOfLevels: 1,
  numberOfCommonWall: 0,
  projectId: 1,
  levels: [
    {
      id: 1,
      name: 'Niveau 1',
      hsp: 3,

      floor: {
        id: 1,
        name: 'Sol',
        ep: 0.2,
        zAlt: 0,
        area: 80
      } as Floors,

      walls: [
        {
          id: 1,
          name: 'Mur Sud',
          length: 10,
          ep: 0.2,
          startCoordonates: { x: 0, y: 0, z: 0 } as Coordonate,
          endCoordonates: { x: 10, y: 0, z: 0 } as Coordonate,
          doors: [
            {
              id: 1,
              name: 'Porte principale',
              location: { x: 2.5, y: 0, z: 0 } as Coordonate,
              width: 1,
              height: 2.1,
              wallId: 1
            } as Doors
          ],
          windows: [
            {
              id: 1,
              name: 'Fenêtre Sud',
              location: { x: 6.5, y: 0.9, z: 0 } as Coordonate,
              width: 1,
              height: 1.2
            } as Windows
          ]
        } as Walls,
        {
          id: 2,
          name: 'Mur Est',
          length: 8,
          ep: 0.2,
          startCoordonates: { x: 10, y: 0, z: 0 } as Coordonate,
          endCoordonates: { x: 10, y: 0, z: 8 } as Coordonate,
          doors: [],
          windows: []
        } as Walls,
        {
          id: 3,
          name: 'Mur Nord',
          length: 10,
          ep: 0.2,
          startCoordonates: { x: 10, y: 0, z: 8 } as Coordonate,
          endCoordonates: { x: 0, y: 0, z: 8 } as Coordonate,
          doors: [],
          windows: []
        } as Walls,
        {
          id: 4,
          name: 'Mur Ouest',
          length: 8,
          ep: 0.2,
          startCoordonates: { x: 0, y: 0, z: 8 } as Coordonate,
          endCoordonates: { x: 0, y: 0, z: 0 } as Coordonate,
          doors: [],
          windows: []
        } as Walls
      ] as Walls[]
    } as Levels
  ] as Levels[],
  roof: {
    id: 1,
    ep: 0.2,
    zAlt: 3.2,
    area: (10 + 2 * 0.5) * (8 + 2 * 0.5)
  }
};
