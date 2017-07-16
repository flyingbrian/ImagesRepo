var asteroidSize = 
{
	small : 0,
	medium : 1,
	large : 2,
};

const ASTEROID_SM_HEALTH = 10;
const ASTEROID_MD_HEALTH = 20;
const ASTEROID_LG_HEALTH = 30;

const ASTEROID_MAX_SPEED = { x : 20,  y : 20 };
const ASTEROID_MIN_SPEED = { x : 6,  y : 6 };

function Asteroid(app, sprite)
{
	var tier = 3;
	var app = app;;
	var health;
	var velocity = { x : 0, y : 0 };
	var rotationSpeed = 10;
	var size;
	var maxSize;
	var turnWhiteTimer; //stores the setinterval returned var to cancel it

	sprite = sprite;
	this.Sprite = sprite;
	
	this.bounds = new rect(0,0,0,0);	
	this.isActive = false;	

	this.id = 0;
	var scaleTimer = 0;
	
	app.stage.addChild(sprite);
	sprite.renderable = false;
	
	//method is called by a ticker added when activateMe is called
	var updateMe = function(){
		sprite.rotation += rotationSpeed * timeStep / 1000;
		sprite.x += velocity.x * timeStep / 40;
		sprite.y += velocity.y * timeStep / 40;

		OutOfBoundsCheck();			
		CollisionDetectionVSAsteroids();
	};
	
	var scaleMe = function(){
		scaleTimer += timeStep / 40;
		
		var scaleLerpValue = lerp(0, maxSize, scaleTimer);
		
		sprite.scale.x = scaleLerpValue;
		sprite.scale.y = scaleLerpValue;
		
		if(scaleTimer > 1){
			app.ticker.remove(scaleMe);
			hitBoxActive = true;
		}
	}

	function CollisionDetectionVSAsteroids()
	{
		// if(b.hit(sprite, hero.Sprite))
		// {
		// 	sprite.x -= velocity.x * timeStep / 40;
		// 	sprite.y -= velocity.y * timeStep / 40;

		// 	velocity.x *= -1;
		// 	velocity.y *= -1;
		// }

		for(var i = 0; i < listOfSpawnedAsteroids.length; i++)
		{
			if(sprite == listOfSpawnedAsteroids[i].Sprite)
			{
				continue;//skips self
			}
			else if(b.hit(sprite, listOfSpawnedAsteroids[i].Sprite))
			{
				sprite.x -= velocity.x * timeStep / 40;
				sprite.y -= velocity.y * timeStep / 40;

				velocity.x *= -1;
				velocity.y *= -1;
			}			
		}
	}

	function OutOfBoundsCheck()
	{
		var dir = { x : 0, y : 0};

		if(sprite.x - sprite.width / 2 < 0)
		{			
			dir.x += 1;			
		}
		else if(sprite.x > app.renderer.width - sprite.width / 2)
		{
			dir.x -= 1;
		}

		if(sprite.y - sprite.height / 2 < 0)
		{
			dir.y += 1;	
		}
		else if(sprite.y > app.renderer.height - sprite.height / 2)
		{
			dir.y -= 1;
		}

		if(dir.x != 0 || dir.y != 0)
		{
			if (dir.x != 0)
			{
				velocity.x *= -1;
				sprite.x = (Math.sign(dir.x) == -1 ? app.renderer.width - sprite.width / 2 : sprite.width / 2);		
				rotationSpeed *= -1;
			}
			if (dir.y != 0)
			{
				velocity.y *= -1;
				sprite.y = (Math.sign(dir.y) == -1 ? app.renderer.height - sprite.height / 2 : sprite.height / 2);
				rotationSpeed *= -1;
			}			
		}
	}

	this.turnBackToWhite = function(){
		sprite.tint = 0xFFFFFF
	}

	this.damageMe = function(dmg = 1)
	{
		health -= dmg;
		sprite.tint = 0xFF0000;
		clearTimeout((turnWhiteTimer));
		turnWhiteTimer = setTimeout(this.turnBackToWhite, 0.15);
		if(health <= 0)
		{
			this.destroyMe();
		}
	}

	this.destroyMe = function()
	{
		this.isActive = false;
		sprite.renderable = false;
		
		var index = listOfSpawnedAsteroids.indexOf(this)
		listOfSpawnedAsteroids.splice(index, 1);
				
		app.ticker.remove(updateMe);
		app.ticker.remove(scaleMe);
		
		spawnExplosion(sprite.x, sprite.y);

		if(size = asteroidSize.large)
		{
			spawnChildrenAsteroids(sprite, size);
		}
	}

	this.activateMe = function(sizeValue) 
	{
		this.isActive = true;
		sprite.renderable = true;
		sprite.anchor.set(0.5); //move origin to the center
		
		size = sizeValue;
		
		if(size == asteroidSize.large)
		{
			health = 50;
			maxSize = 1.5;
		}
		if(size == asteroidSize.medium)
		{
			health = 50;
			maxSize = 1;
		}
		if(size == asteroidSize.small)
		{
			health = 50;
			maxSize = 0.5;
		}
		
		sprite.scale.x = maxSize;
		sprite.scale.y = maxSize;

		var safetyCounter = 0; //to avoid infiniteLoop
		var MaxChecks = 30;//how many it attempts


		while (true) {
			safetyCounter++;

			if(safetyCounter > MaxChecks)
			{
				this.isActive = false;
				sprite.renderable = false;
				console.log("Error wasnt able to spawn");
				return;
			}

			// a number > 0 + sprite.width
			var minX = sprite.width / 2;
			var maxX = app.renderer.width - sprite.width / 2;

			var minY = sprite.height / 2;
			var maxY = app.renderer.height - sprite.height / 2;

			var randomX = Math.floor(minX  + Math.random() * maxX);
			var randomY = Math.floor(minY  + Math.random() * maxY);

			sprite.x = randomX; 
			sprite.y = randomY;

			var collided = false;
			//VS other asteroids
			for(var i = 0; i < listOfSpawnedAsteroids.length; i++){
				if(listOfSpawnedAsteroids[i] == this) continue; //skip if its about to check itself
				collided = b.hit(sprite, listOfSpawnedAsteroids[i].Sprite) == true; //check against other asteroids
				if(collided) break;
			}
			if(collided) continue;  //start over if its overlapping

			//VS hero ship
			collided = b.hit(sprite, hero.Sprite);
			if(collided) continue;

			break;
		}
		
		velocity.x = ASTEROID_MAX_SPEED.x + Math.random() * ASTEROID_MIN_SPEED.x;
		velocity.y = ASTEROID_MAX_SPEED.y + Math.random() * ASTEROID_MIN_SPEED.y;
 
		var randomDirX = Math.floor(Math.random() * 2);
		var randomDirY = Math.floor(Math.random() * 2);
		
		velocity.x *= (randomDirX == 0) ? -1 : 1;
		velocity.y *= (randomDirY == 0) ? -1 : 1;

		//get random rotation for spawning
		var randomRotation = Math.floor(Math.random() * 360);
		randomRotation *= Math.PI / 180;
		sprite.rotation = randomRotation;

		//set direction of rotation based on random
		var randomForRotateDirection = Math.floor(Math.random() * 2);
		rotationSpeed *= (randomForRotateDirection == 0) ? -1 : 1;
		
		                                                                         
		sprite.scale.x = 0;
		sprite.scale.y = 0;
		scaleTimer = 0;

		app.ticker.add(updateMe);
		app.ticker.add(scaleMe);
	};
}

function spawnExplosion(x, y)
{
	for(var i = 0; i < listOfExplosionAnimations.length; i++)
	{
		if(listOfExplosionAnimations[i].isActive == false)
		{
			listOfExplosionAnimations[i].activateMe(x, y);
			break;
		}
	}			
}