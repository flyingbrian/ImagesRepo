const SPAWN_DELAY = 4;

var listOfSpawnedAsteroids = []
var listOfExplosionAnimations = []

function AsteroidSpawner(app)
{	
	var app = app;

	var numOfObjectPool = 25;

	var inSpawnPhase = true;
	var spawnTimer = 0;

	var numToSpawn = 15;
	var currentlySpawned = 0;

	var listOfAsteroids = [];
	
	initAsteroids();
	initExplosionSprites();

	function initAsteroids()
	{				
		for(var i =0; i < numOfObjectPool; i++)
		{
			var randomNum = Math.floor(Math.random() * 5);
			var sprite = PIXI.Sprite.from("https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/Asteroid" + randomNum +".png");
			listOfAsteroids[i] = new Asteroid(app, sprite);	
		}		
		spawnAsteroid(asteroidSize.large);
	}

	function initExplosionSprites()
	{
		for(var i = 0; i < 10; i++)
		{
			var pathName = "https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/ExplosionSpriteAnimation.png";
			
			var spriteOBJ = new SpriteAnimation(pathName, 64, 64, 5, i) 
			listOfExplosionAnimations.push(spriteOBJ);
		}	
	}

	function initAsteroidsDuringRuntime()
	{
			var randomNum = Math.floor(Math.random() * 5);
			var sprite = PIXI.Sprite.from("https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/Asteroid" + randomNum +".png");
			
			var newAsteroid = new Asteroid(app, sprite)
			
			listOfAsteroids.push(newAsteroid);	
			
			return listOfAsteroids[listOfAsteroids.length - 1];
	}

	var updateSpawnCheck = function()
	{
		spawnTimer += timeStep / 40;//seems to get a more accurate value per cpu cycle *hardcoded*
		if(spawnTimer > SPAWN_DELAY)
		{
			spawnTimer = 0;

			spawnAsteroid(asteroidSize.large);
		}
	}

	function spawnAsteroid(size)
	{	
		var nextItemToSpawn = getFirstInactiveAsteroid();
		nextItemToSpawn.activateMe(size);

		if(nextItemToSpawn.isActive == false) 
		{
			app.ticker.remove(updateSpawnCheck); //remove loop ticker
			return; //checks if it was able to spawn, may fail if there is no room
		}

		listOfSpawnedAsteroids.push(nextItemToSpawn);
		nextItemToSpawn.id = listOfSpawnedAsteroids.length - 1; 

		currentlySpawned++;
		if(currentlySpawned == numToSpawn)
		{
			app.ticker.remove(updateSpawnCheck); //remove loop ticker
		}
	}
	//update loop init
	app.ticker.add(updateSpawnCheck);
	
	function getFirstInactiveAsteroid()
	{
		for(var i = 0; i < listOfAsteroids.length; i++)
		{
			if(listOfAsteroids[i].isActive == false)
			{

				return listOfAsteroids[i];
			}
		}		
		
		return initAsteroidsDuringRuntime();
	}
}

function spawnChildrenAsteroids(sprite, size)
{	
	
/*	var nextItemToSpawn = getFirstInactiveAsteroid();
	nextItemToSpawn.activateMe(size);

	if(nextItemToSpawn.isActive == false) 
	{
		app.ticker.remove(updateSpawnCheck); //remove loop ticker
		return; //checks if it was able to spawn, may fail if there is no room
	}

	listOfSpawnedAsteroids.push(nextItemToSpawn);
	nextItemToSpawn.id = listOfSpawnedAsteroids.length - 1; 

	currentlySpawned++;
	if(currentlySpawned == numToSpawn)
	{
		app.ticker.remove(updateSpawnCheck); //remove loop ticker
	}*/
}