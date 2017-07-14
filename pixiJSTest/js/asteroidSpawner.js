const SPAWN_DELAY = 4;

function AsteroidSpawner(app)
{
	var smallAsteroids = [];
	var mediumAsteroids = [];
	var largeAsteroids = [];

	var listOfAsteroids = [];
	var app = app;

	var numOfObjectPool = 25;
	var numOfSmalls = 25;
	var numOfMediums = 10;
	var numOfLarges = 5;

	var inSpawnPhase = true;
	var spawnTimer = 0;

	

	initAsteroids();

	function initAsteroids()
	{				
		for(var i =0; i < numOfObjectPool; i++)
		{
			var randomNum = Math.floor(Math.random() * 5);
			var sprite = PIXI.Sprite.from("https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/Asteroid" + randomNum +".png");
			listOfAsteroids[i] = new Asteroid(app, asteroidSize.small, sprite);	
		}
		
		//SMALLS
		// for(var i = 0; i < numOfSmalls; i++)
		// {
		// 	smallAsteroids[i] = new Asteroid(app, asteroidSize.small, sprite);
		// }
		// //MEDIUMS
		// for(var i = 0; i < numOfMediums; i++)
		// {
		// 	mediumAsteroids[i] = new Asteroid(app, asteroidSize.medium, sprite);
		// }
		
		// for(var i = 0; i < numOfLarges; i++)
		// {			
		// 	largeAsteroids[i] = new Asteroid(app, asteroidSize.large, sprite);
		// }			
	}

	var updateSpawnCheck = function()
	{
		spawnTimer += timeStep / 40;//seems to get a more accurate value per cpu cycle *hardcoded*
		if(spawnTimer > SPAWN_DELAY)
		{
			spawnTimer = 0;

			var nextItemToSpawn = getFirstInactiveAsteroid();
			nextItemToSpawn.activateMe();
		}

	}

	//update loop init
	app.ticker.add(updateSpawnCheck);

	function getFirstInactiveAsteroid(size)
	{
		for(var i = 0; i < listOfAsteroids.length; i++)
		{
			if(listOfAsteroids[i].isActive == false)
			{
				return listOfAsteroids[i];
			}
		}
		// switch (size) {
		// 	case asteroidSize.small:

		// 		for (var i = 0; i < numOfSmalls; i++) 
		// 		{
		// 			if(smallAsteroids[i].isActive == false)
		// 			{
		// 				return smallAsteroids[i];
		// 			}
		// 		}		
		// 		break;
		// 	case asteroidSize.medium:
				
		// 		break;
		// 	case asteroidSize.large:
				
		// 		break;
		// }
	}
}




