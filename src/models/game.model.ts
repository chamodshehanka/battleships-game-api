import { Ship } from './ship.model';

export class Game {
  id: number;
  grid: string[][];
  ships: Ship[];
  shots: string[];

  constructor() {
    this.grid = Array(10).fill(Array(10).fill(null));
    this.ships = [];
    this.shots = [];
  }
}
