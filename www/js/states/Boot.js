var FlappyBirdReturns = FlappyBirdReturns || {};

FlappyBirdReturns.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
FlappyBirdReturns.Boot.prototype = {
  preload: function() {
  	//assets we'll use in the loading screen
    this.load.image('logo', 'assets/images/hachilogo.png');
    this.load.image('preloadbar', 'assets/images/preloader.gif');
  },
  create: function() {
  	//loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 240;
    this.scale.minHeight = 170;
    this.scale.maxWidth = 480;
    this.scale.maxHeight = 640;
    
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;

    //screen size will be set automatically
    // DEPRECATED this.scale.setScreenSize(true);

    //physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
    this.game.plugin=this.game.plugins.add(Phaser.Plugin.FadePlugin);
  }
};