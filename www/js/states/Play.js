var FlappyBirdReturns = FlappyBirdReturns || {};

//title screen
FlappyBirdReturns.Play = function(){};

FlappyBirdReturns.Play.prototype = {
  preload: function() {},
  
  create: function() {
    // set the game physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;
    
    // add the background sprite
    this.background = this.game.add.sprite(0,0,'background');
    
    // create and add a group to hold our pipeGroup prefabs
    this.pipes = this.game.add.group();
    
    // Create a new bird object
    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);
    
    // create and add a new Ground object
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);
    
    /** OBSTACLE GENERATOR **/
    //this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    //this.pipeGenerator.timer.start();
    
    /** PLAYER CONTROL **/
    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    // add keyboard controls
    this.flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.flapKey.onDown.addOnce(this.startGame, this);
    this.flapKey.onDown.add(this.bird.flap, this.bird);

    // add mouse/touch controls
    this.game.input.onDown.addOnce(this.startGame, this);
    this.game.input.onDown.add(this.bird.flap, this.bird);
    
    /** INSTRUCTIONS **/
    this.instructionGroup = this.game.add.group();
    this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100,'getReady'));
    this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 325,'instructions'));
    this.instructionGroup.setAll('anchor.x', 0.5);
    this.instructionGroup.setAll('anchor.y', 0.5);
    
    // game score
    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);
    this.scoreText.visible = false;
    
    // game sounds
    this.scoreSound = this.game.add.audio('score');
    this.pipeSound = this.game.add.audio('pipeHit');
    this.groundSound = this.game.add.audio('groundHit');
    
    this.gameover = false;
  },
  
  update: function() {
    // enable collisions between the bird and the ground
    this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
    
    // enable collisions between the bird and each group in the pipes group
    if(!this.gameover) {
      this.pipes.forEach(function(pipeGroup) {
          this.checkScore(pipeGroup);
          this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
      }, this);
    }
    //the line below is just in case you wanna have a jetpack control
    //if(this.input.activePointer.isDown) this.bird.flap(); 
  },
  
  startGame: function() {  
    this.bird.body.allowGravity = true;
    this.bird.alive = true;

    // start generator timer
    this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    this.pipeGenerator.timer.start();

    this.instructionGroup.destroy();
    this.scoreText.visible = true;
  },
  
  generatePipes: function() {
    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = this.pipes.getFirstExists(false);
    if(!pipeGroup) {
      pipeGroup = new PipeGroup(this.game, this.pipes);
    }
    pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
  },
  
  checkScore: function(pipeGroup) {  
    if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
      pipeGroup.hasScored = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
      this.scoreSound.play();
    }
  },
  
  deathHandler: function(bird,enemy) {
    if(enemy instanceof Ground && !this.bird.onGround) {
        this.groundSound.play();
        this.scoreboard = new Scoreboard(this.game);
        this.game.add.existing(this.scoreboard);
        this.scoreboard.show(this.score);
        this.bird.onGround = true;
    } else if (enemy instanceof Pipe){
        this.pipeSound.play();
    }
    stageMusic.pause();
    
    if(!this.gameover) {
        this.gameover = true;
        this.bird.kill();
        this.pipes.callAll('stop');
        this.pipeGenerator.timer.stop();
        this.ground.stopScroll();
    }
  },
  
  shutdown: function() {  
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
    this.scoreboard.destroy();
  }
  
};