/**
 * This template was created following the tutorial in the link below:
 * http://www.gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
 *
 * Remember to give credit to Pablo Farias Navarro - Zenva
 */

var FlappyBirdReturns = FlappyBirdReturns || {};

window.onload = function () {
  FlappyBirdReturns.game = new Phaser.Game(288, 505, Phaser.AUTO, '');

  FlappyBirdReturns.game.state.add('Boot', FlappyBirdReturns.Boot);
  FlappyBirdReturns.game.state.add('Preload', FlappyBirdReturns.Preload);
  FlappyBirdReturns.game.state.add('Menu', FlappyBirdReturns.Menu);
  FlappyBirdReturns.game.state.add('Play', FlappyBirdReturns.Play);
  FlappyBirdReturns.game.state.add('Gameover', FlappyBirdReturns.Gameover);

  FlappyBirdReturns.game.state.start('Boot');
}