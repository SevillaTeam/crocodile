import { PLAYER_ROLE } from '../services/game-engine/constants';

export const disableCanvas = (gameRole: string) => {
  if (gameRole === PLAYER_ROLE.artist) {
    console.log('gameRole = ARTIST, слушатели canvas включены');
    return false;
  }
  console.log('gameRole = GUESSER || undefined, слушатели canvas ОТКЛЮЧЕНЫ');
  return true;
};
