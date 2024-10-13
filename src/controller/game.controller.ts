import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FireShotDto } from '../dto/common.dto';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  startGame(): Game {
    return this.gameService.createGame();
  }

  @Post('shot')
  fireShot(@Body() body: FireShotDto): string {
    return this.gameService.fireShot(body.gameId, body.coordinate);
  }

  @Get(':id')
  getGameState(@Param('id') gameId: number): Game {
    return this.gameService.getGameState(gameId);
  }
}
