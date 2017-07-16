
var app = new PIXI.Application(1080, 720, {backgroundColor : 0x000000});

var b = new Bump(app);

document.body.appendChild(app.view);

var BGtexture = PIXI.Sprite.from('https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/Space.png');
app.stage.addChild(BGtexture);

var hero = new Hero(app);
var asteroidSpawner = new AsteroidSpawner(app);


var fpsText = document.querySelector("p");
app.ticker.add(function(){
		fpsText.innerHTML = "FPS :" + Math.ceil(app.ticker.FPS);
	})


