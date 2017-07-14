
var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});

document.body.appendChild(app.view);

var hero = new Hero(app);
var asteroidSpawner = new AsteroidSpawner(app);

var fpsText = document.querySelector("p");
app.ticker.add(function(){
		fpsText.innerHTML = "FPS :" + Math.ceil(app.ticker.FPS);
	})


