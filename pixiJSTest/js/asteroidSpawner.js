const SPAWN_DELAY = 4;

function AsteroidSpawner(app)
{
	var smallAsteroids = [];
	var mediumAsteroids = [];
	var largeAsteroids = [];

	var app = app;

	var numOfSmalls = 25;
	var numOfMediums = 10;
	var numOfLarges = 5;

	var inSpawnPhase = true;
	var spawnTimer = 0;

	

	initAsteroids();

	function initAsteroids()
	{		
		//SMALLS
		for(var i = 0; i < numOfSmalls; i++)
		{

			var indexToString = (i % 2 == 1) ? "1" : "2";
			
			var sprite = PIXI.Sprite.from("https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/AsteroidSM" + indexToString + ".png");
			smallAsteroids[i] = new Asteroid(app, asteroidSize.small, sprite);

			if(indexToString == "2") 
			{
				smallAsteroids[i].maxScale = 0.25;
			}
			else
			{
				smallAsteroids[i].maxScale = 1;
			}
		}
		//MEDIUMS
		for(var i = 0; i < numOfMediums; i++)
		{
			var indexToString = (i % 2 == 1) ? "1" : "2";
			var sprite = PIXI.Sprite.from("https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/AsteroidMD" + indexToString + ".png");
			mediumAsteroids[i] = new Asteroid(app, asteroidSize.medium, sprite);
		}
		
		for(var i = 0; i < numOfLarges; i++)
		{
			var indexToString = (i % 2 == 1) ? "1" : "2";
			var sprite = PIXI.Sprite.from("https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/AsteroidLG" + indexToString + ".png");
			largeAsteroids[i] = new Asteroid(app, asteroidSize.large, sprite);
		}			
	}

	var updateSpawnCheck = function()
	{
		spawnTimer += timeStep / 40;//seems to get a more accurate value per cpu cycle *hardcoded*
		if(spawnTimer > SPAWN_DELAY)
		{
			spawnTimer = 0;

			var nextItemToSpawn = getFirstInactiveAsteroid(asteroidSize.small);
			nextItemToSpawn.activateMe(nextItemToSpawn.maxScale);
		}

	}

	//update loop init
	app.ticker.add(updateSpawnCheck);

	function getFirstInactiveAsteroid(size)
	{
		switch (size) {
			case asteroidSize.small:

				for (var i = 0; i < numOfSmalls; i++) 
				{
					if(smallAsteroids[i].isActive == false)
					{
						return smallAsteroids[i];
					}
				}		
				break;
			case asteroidSize.medium:
				
				break;
			case asteroidSize.large:
				
				break;
		}
	}
}




