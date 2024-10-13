export class Ship {
  id: number;
  type: string;
  size: number;
  coordinates: string[];
  hits: number;

  constructor(type: string, size: number, coordinates: string[]) {
    this.type = type;
    this.size = size;
    this.coordinates = coordinates;
    this.hits = 0;
  }
}
