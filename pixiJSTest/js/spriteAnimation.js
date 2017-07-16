function SpriteAnimation(pathName, width, height, totalFrames, indexVal) 
{
	var frames = []

	this.isActive = false;
	var mySprite;
	var index = indexVal;

	initFrames();
	
	function initFrames(){

		var spriteSheet = PIXI.BaseTexture.from(pathName);

		for(var i = 0; i < totalFrames; i++){
			frames[i] = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(i*width, 0, width, height));
		}
	
		mySprite = new  PIXI.extras.AnimatedSprite(frames);
		mySprite.renderable = false;
		mySprite.loop = false;
		mySprite.animationSpeed = 0.1;
		mySprite.anchor.set(0.5);

		app.stage.addChild(mySprite)
	}
	
	var onComplete = function(){
		listOfExplosionAnimations[index].isActive  = false;
		mySprite.stop();
		mySprite.renderable = false;
	}
	
	this.activateMe = function(x, y){
		mySprite.gotoAndPlay(0);
		listOfExplosionAnimations[index].isActive = true;
		mySprite.x = x;
		mySprite.y = y;

		mySprite.renderable = true;
		mySprite.onComplete = onComplete;		
	}
} 