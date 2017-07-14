var asteroidSize = 
{
	small : 0,
	medium : 1,
	large : 2,
};

const ASTEROID_SM_HEALTH = 10;
const ASTEROID_MD_HEALTH = 20;
const ASTEROID_LG_HEALTH = 30;

function Asteroid(app, size, sprite)
{
	var app = app;;
	var health;
	var velocity = { x : 0, y : 0 };
	var rotationSpeed = 10;
	var sprite = sprite;
	
	var scaleTimer = 0;
	this.isActive = false;

	if(size == asteroidSize.small) { health = ASTEROID_SM_HEALTH; }
	else if(size == asteroidSize.medium) { health = ASTEROID_MD_HEALTH; }
	else if(size == asteroidSize.large) { health = ASTEROID_LG_HEALTH; }
	
	app.stage.addChild(sprite);
	sprite.renderable = false;
	
	//method is called by a ticker added when activateMe is called
	var updateMe = function(){
		sprite.rotation += rotationSpeed * timeStep / 1000;
		sprite.x += velocity.x * timeStep;
		sprite.y += velocity.y * timeStep;
		
	};
	
	var scaleMe = function(){
		scaleTimer += timeStep / 40;
		
		var scaleLerpValue = lerp(0, 1, scaleTimer);
		
		sprite.scale.x = scaleLerpValue;
		sprite.scale.y = scaleLerpValue;
		
		if(scaleTimer > 1){
			app.ticker.remove(scaleMe);
		}
	}

	this.destroyMe = function()
	{
		app.ticker.remove(updateMe);
	}

	this.activateMe = function(maxScaleValue)
	{
		this.isActive = true;
		sprite.renderable = true;
		sprite.anchor.set(0.5); //move origin to the center

		// a number > 0 + sprite.width
		var minX = sprite.width / 2;
		var maxX = app.renderer.width - sprite.width / 2;

		var minY = sprite.height / 2;
		var maxY = app.renderer.height - sprite.height / 2;

		var randomX = Math.floor(minX  + Math.random() * maxX);
		var randomY = Math.floor(minY  + Math.random() * maxY);

		var randomRotation = Math.floor(Math.random() * 360);
		randomRotation *= Math.PI / 180;
		
		sprite.rotation = randomRotation;

		sprite.x = randomX; 
		sprite.y = randomY;
		
		sprite.scale.x = 0;
		sprite.scale.y = 0;

		app.ticker.add(updateMe);
		app.ticker.add(scaleMe);
	};
}
