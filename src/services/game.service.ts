import { Injectable } from '@nestjs/common';
import { Game } from '../models/game.model';
import { Ship } from '../models/ship.model';

@Injectable()
export class GameService {
  private games: Game[] = [];

  createGame(): Game {
    const game = new Game();
    game.ships.push(new Ship('Battleship', 5, this.randomCoordinates(5)));
    game.ships.push(new Ship('Destroyer', 4, this.randomCoordinates(4)));
    game.ships.push(new Ship('Destroyer', 4, this.randomCoordinates(4)));
    this.games.push(game);
    return game;
  }

  fireShot(gameId: number, coordinate: string): string {
    const game = this.games.find((g) => g.id === gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    game.shots.push(coordinate);
    for (const ship of game.ships) {
      if (ship.coordinates.includes(coordinate)) {
        ship.hits++;
        if (ship.hits === ship.size) {
          return `Hit and sunk ${ship.type}!`;
        }
        return 'Hit!';
      }
    }
    return 'Miss!';
  }

  randomCoordinates(size: number): string[] {
    const directions = ['horizontal', 'vertical'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const coordinates: string[] = [];
    let startRow: number;
    let startCol: number;

    if (direction === 'horizontal') {
      startRow = Math.floor(Math.random() * 10);
      startCol = Math.floor(Math.random() * (10 - size));
      for (let i = 0; i < size; i++) {
        coordinates.push(
          String.fromCharCode(65 + startRow) + (startCol + i + 1),
        );
      }
    } else {
      startRow = Math.floor(Math.random() * (10 - size));
      startCol = Math.floor(Math.random() * 10);
      for (let i = 0; i < size; i++) {
        coordinates.push(
          String.fromCharCode(65 + startRow + i) + (startCol + 1),
        );
      }
    }

    return coordinates;
  }

  getGameState(gameId: number): Game {
    return this.games.find((g) => g.id === gameId);
  }
}
