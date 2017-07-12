var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});

document.body.appendChild(app.view);

var hero = new Hero();

app.stage.addChild(hero.sprite);


app.ticker.add(function(delta){
	if(leftPressed == true)
	{
		hero.sprite.position.x += 10 * delta;
	}
	else if(rightPressed == true)
	{
		hero.sprite.position.x -= 10 * delta;
	}	
})

function moveHorizontal(dir)
{

}

function moveVertical(dir)
{

}
