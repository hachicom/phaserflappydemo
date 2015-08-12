var FlappyBirdReturns = {
	_WIDTH: 288,
	_HEIGHT: 505
};

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
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

    //physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
    this.game.plugin=this.game.plugins.add(Phaser.Plugin.FadePlugin);
  }
};