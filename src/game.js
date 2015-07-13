
var gameState = function (game) {
};

gameState.prototype = {
	init: function () {

		this.game.stage.backgroundColor = 0x69df89;
		this.game.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN]);
	},

	preload: function () {
		this.game.load.atlasJSONHash('ana', 'assets/gfx/Ana.png', 'assets/gfx/Ana.json');
		this.game.load.atlasJSONHash('objects', 'assets/gfx/Summer.png', 'assets/gfx/Summer.json');

		this.game.physics.arcade.gravity.y = 1000;
		game.world.setBounds(0, 0, 3000, 600);
	},

	create: function () {

		this.WALK_SPEED = 1000;
		this.JUMP_SPEED = -500;
		this.DRAG = 1000;
		this.MAX_SPEED = 400

		// bg
		this.bg = game.add.tileSprite(0, 0, game.world.width, 750, 'objects', "BG/BG.png");
		
		// Scenary
		this.ground = this.game.add.group();
		for (var x = 0; x < this.game.world.width; x += 64) {
			var groundBlock = this.game.add.sprite(x, this.game.height - 64, 'objects', "Tiles/2.png");
			groundBlock.scale.setTo(.5, .5);
			this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			groundBlock.body.immovable = true;
			groundBlock.body.allowGravity = false;
			this.ground.add(groundBlock);
		};

		// Ana
		this.ana = this.game.add.sprite(200, 250, 'ana', 'Idle/0001.png');
		this.ana.scale.setTo(.2, .2);
		this.ana.anchor.setTo(.5, .5)
		this.ana.animations.add("Idle", ['Idle/0001.png', 'Idle/0002.png', 'Idle/0003.png', 'Idle/0004.png', 'Idle/0005.png', 'Idle/0006.png', 'Idle/0007.png', 'Idle/0008.png', 'Idle/0009.png', 'Idle/0010.png'], 8, true);
		this.ana.animations.add("Jump", ['Jump/0001.png', 'Jump/0002.png', 'Jump/0003.png', 'Jump/0004.png', 'Jump/0005.png'], 8, false);
		this.ana.animations.add("Fall", ['Jump/0006.png', 'Jump/0007.png', 'Jump/0008.png', 'Jump/0009.png', 'Jump/0010.png'], 8, false);
		this.ana.animations.add("Run", ['Run/0001.png', 'Run/0002.png', 'Run/0003.png', 'Run/0004.png', 'Run/0005.png', 'Run/0006.png', 'Run/0007.png', 'Run/0008.png'], 10, true);
		this.ana.animations.play("Idle");

		this.game.physics.enable(this.ana, Phaser.Physics.ARCADE);
		this.ana.body.collideWorldBounds = true;
		this.ana.body.drag.setTo(this.DRAG, 0);
		this.ana.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
		this.ana.body.offset.setTo(0, -5);

		this.game.camera.follow(this.ana);

	},

	update: function () {

		this.game.physics.arcade.collide(this.ana, this.ground);

		if (this.rightPressed()) {
			this.ana.scale.x = Math.abs(this.ana.scale.x);
			this.ana.body.acceleration.x = this.WALK_SPEED;
			this.ana.animations.play("Run");
		};

		if (this.leftPressed()) {
			this.ana.scale.x = -Math.abs(this.ana.scale.x);
			this.ana.body.acceleration.x = -this.WALK_SPEED;
			this.ana.animations.play("Run");
		};

		if (!this.rightPressed() && !this.leftPressed()) {
			this.ana.body.acceleration.x = 0;
		}

		if (this.upPressed() && this.ana.body.velocity.y == 0) {
			this.ana.body.velocity.y = this.JUMP_SPEED;
		}

		if (this.ana.body.velocity.y == 0 && this.ana.body.velocity.x == 0) {
			this.ana.animations.play("Idle");
		}

		if (this.ana.body.velocity.y < 0) {
			this.ana.animations.play("Jump");
		};
		if (this.ana.body.velocity.y > 0) {
			this.ana.animations.play("Fall");
		};
	},

	rightPressed: function () {
		var isActive = false;

		isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

		isActive = isActive || (this.game.input.activePointer.isDown && this.game.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

		return isActive;
	},

	leftPressed: function () {
		var isActive = false;

		isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);

		isActive = isActive || (this.game.input.activePointer.isDown && this.game.input.activePointer.x < this.game.width / 4);


		return isActive;
	},

	upPressed: function (duration) {
		var isActive = false;
		isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);

		isActive = isActive || (this.game.input.activePointer.justPressed(duration + 1000 / 60) &&
			this.game.input.activePointer.x > this.game.width / 4 &&
			this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);

		return isActive;
	}

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
game.state.add('game', gameState, true);

