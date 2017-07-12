function Hero()
{
	this.sprite = PIXI.Sprite.from('https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/Hero.png');
	this.sprite.anchor.set(0.5); //move origin to the center

	this.sprite.x = app.renderer.width / 2;//position hero to middle of screen
	this.sprite.y = app.renderer.height / 2;

}

function heroUpdate()
{
	
}