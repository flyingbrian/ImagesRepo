
const MAX_VELOCITY_X = 8
const MAX_VELOCITY_Y = 8
var app;
var sprite;
var velocity = { x : 0, y : 0 };
var speed = 10;
var friction = 0.95;
var timeStep;

function Hero(app)
{
	this.app = app;
	sprite = PIXI.Sprite.from('https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/Hero2.png');

	sprite.anchor.set(0.5); //move origin to the center

	sprite.x = app.renderer.width / 2;//position hero to middle of screen
	sprite.y = app.renderer.height / 2;
	
	app.ticker.add(function(delta){
		update(delta);
	})

	app.stage.addChild(sprite);
}

function update(delta)
{
	updateInput(delta);

	this.sprite.position.x += velocity.x; 
	this.sprite.position.y += velocity.y; 
	
	
	var dir = { x : 0, y : 0};

	if(this.sprite.position.x - this.sprite.width / 2 < 0)
	{
		
		dir.x += 1;
		
	}
	else if(this.sprite.position.x > app.renderer.width - this.sprite.width / 2)
	{
		dir.x -= 1;
	}

	if(this.sprite.position.y - this.sprite.height / 2 < 0)
	{
		dir.y += 1;	
	}
	else if(this.sprite.position.y > app.renderer.height - this.sprite.height / 2)
	{
		dir.y -= 1;
	}

	if(dir.x != 0 || dir.y != 0)
	{
		ApplyBounceOffImpulse(dir);
	}

	velocity.x = (velocity.x > MAX_VELOCITY_X) ? MAX_VELOCITY_X : velocity.x;
	velocity.y = (velocity.y > MAX_VELOCITY_Y) ? MAX_VELOCITY_Y : velocity.y;


	velocity.x *= 0.95;
	velocity.y *= 0.95;
}

function updateInput(delta)
{
	timeStep = delta;
	if(leftPressed)
	{
		turnHero(-0.1);//turn left
	}
	else if(rightPressed)
	{
		turnHero(0.1); //turn right
	}

	if(upPressed)
	{
		ApplyForceForward(0.1);
	}
	else if(downPressed)
	{
		ApplyForceForward(-0.1);
	}
}

function ApplyForceForward(direction)
{
	//offset Rads to look forward by 90 degrees converted to rads. 
	var rotInDegrees = this.sprite.rotation - (90 * (Math.PI/180));

	var accelX = Math.cos(rotInDegrees);
	var accelY = Math.sin(rotInDegrees);

	velocity.x += direction * accelX * speed * timeStep;
	velocity.y += direction * accelY * speed * timeStep;
}

function ApplyBounceOffImpulse(direction)
{
	var impulseForce = { x :MAX_VELOCITY_X* 0.2, y : MAX_VELOCITY_Y * 0.2 };


	velocity.x += direction.x * 10 * timeStep * impulseForce.x;
	velocity.y += direction.y * 10 * timeStep * impulseForce.y;
}

function turnHero(turn)
{
	this.sprite.rotation += turn;
}