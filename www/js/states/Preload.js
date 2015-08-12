var FlappyBirdReturns = FlappyBirdReturns || {};
var style = { font: "20px Arial", fill: "#55ffff", stroke: "#000000", strokeThickness: 3, align: "center", wordWrap: true, wordWrapWidth: 212 };
var titleMusic,stageMusic;

FlappyBirdReturns.Preload = function() {
  this.asset = null;
  this.ready = false;
}

FlappyBirdReturns.Preload.prototype = {
  preload: function() {
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);
    
    this.loadingText = this.game.add.text(this.game.width/4, this.game.world.centerY + 160, "", style);
    //this.loadingText.anchor.setTo(0.5,0.5);

  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    
    this.load.image('background', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('title', 'assets/images/title.png');
    this.load.image('startButton', 'assets/images/start-button.png');

    this.load.spritesheet('bird', 'assets/images/bird.png', 34, 24, 3);
    this.load.spritesheet('pipe', 'assets/images/pipes.png', 54, 320, 2);
    this.load.spritesheet('medals', 'assets/images/medals.png', 44, 46, 2);
    
    this.load.image('instructions', 'assets/images/instructions.png');  
    this.load.image('getReady', 'assets/images/get-ready.png');
    
    this.load.image('scoreboard', 'assets/images/scoreboard.png');
    this.load.image('gameover', 'assets/images/gameover.png');
    this.load.image('particle', 'assets/images/particle.png');
    
    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');
    
    this.load.audio('score', 'assets/audio/score.wav');
    this.load.audio('flap', 'assets/audio/flap.wav');
    this.load.audio('pipeHit', 'assets/audio/pipe-hit.wav');
    this.load.audio('groundHit', 'assets/audio/ground-hit.wav');
    // this.load.audio('bgm1', 'assets/audio/bgm.ogg');
    // this.load.audio('bgm2', 'assets/audio/stage1.ogg');
    // this.load.audio('bgm3', 'assets/audio/stage3.ogg');
  },
  
  create: function() {
    //this.asset.cropEnabled = false;
    this.loadingText.setText('Decoding BGM... Please Wait...');
    //titleMusic = this.game.add.audio('bgm1', 1, true);
    //stageMusic = this.game.add.audio('bgm2', 1, true);
  },
  
  update: function() {
    if(!!this.ready) {
      //this.state.start('Menu');
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Menu");
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

//module.exports = Preload  