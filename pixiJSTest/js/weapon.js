var weaponTypes = 
{
	singleShot : 0,
	doubleShot : 1,
	spreadShot : 2,
};

function Weapon(){	
	var projectilePool = [];
	var objPoolAmount = 40;
	var fireRate = 0.5 ;
	var rateTimer = 0;
	var fireSpeed = 8;
	var weaponType;

	this.init = function(app){
		for(var i = 0; i < objPoolAmount; i ++){
			projectilePool[i] = new poolObj();	
		}
	}

	this.updateWeapon = function(){
		rateTimer += timeStep / 10; 
		
		for (var i = 0; i < projectilePool.length; i++){
			if(projectilePool[i].isActive){
				projectilePool[i].timer += timeStep / 10;				
				
				projectilePool[i].sprite.position.x += projectilePool[i].velocity.x; 
				projectilePool[i].sprite.position.y += projectilePool[i].velocity.y; 
				
				if(projectilePool[i].timer > projectilePool[i].lifeTimer){
					projectilePool[i].timer = 0;
					projectilePool[i].isActive = false;
					projectilePool[i].sprite.renderable = false;
				}
			}	
		}
	}	

	this.fireProjectile = function(angle, position, heroVelocity){		
		var accelX = Math.cos(angle);
		var accelY = Math.sin(angle);

		var projectileVel =	{ x : accelX * timeStep, y : accelY * timeStep };
		switch(weaponType){
		 	case weaponTypes.singleShot:
				var bullet = getFirstInactiveProjectile();
				
				bullet.velocity.x = projectileVel.x * fireSpeed;
				bullet.velocity.y = projectileVel.y * fireSpeed;

				bullet.sprite.x = position.x;
				bullet.sprite.y = position.y;

		 		break;
		 	
		 	case weaponTypes.doubleShot:
	 			var bullets = []
	 			for(var i = 0; i < 2; i++)
	 			{
	 				bullets[i] = getFirstInactiveProjectile();
					bullets[i].velocity.x = projectileVel.x * fireSpeed;
					bullets[i].velocity.y = projectileVel.y * fireSpeed;
				}

	 			var offsetX = Math.cos(angle + (90 * Math.PI / 180));
	 			var offsetY = Math.sin(angle + (90 * Math.PI / 180));

				bullets[0].sprite.x = position.x + (offsetX) * 5;
				bullets[0].sprite.y = position.y + (offsetY) * 5;

				bullets[1].sprite.x = position.x + (-offsetX) * 5;
				bullets[1].sprite.y = position.y + (-offsetY) * 5;	 			

		 		break;
		 	
		 	case weaponTypes.spreadShot:
		 		var bullets = [];
		 		var anglesPerBullet = [ -30, -15, 0, 15, 30];

		 		for(var i = 0; i < 5; i++)
		 		{
		 			bullets[i] = getFirstInactiveProjectile();
		 			bullets[i].sprite.x = position.x;
		 			bullets[i].sprite.y = position.y;

		 			var spreadShotX = Math.cos(angle + (anglesPerBullet[i] * Math.PI / 180));
		 			var spreadShotY = Math.sin(angle + (anglesPerBullet[i] * Math.PI / 180));

		 			bullets[i].velocity.x = spreadShotX * fireSpeed + heroVelocity.x;
		 			bullets[i].velocity.y = spreadShotY * fireSpeed + heroVelocity.y;
		 		} 		
		 		break;
		}
	}

	setWeapon = function(typeOfWeapon)
	{
		weaponType = typeOfWeapon;
	}

	this.readyToFire = function(){
		if(rateTimer > fireRate){
			rateTimer = 0;
			return true;	
		}
		
		return false;
	}

	function poolObj(){
			var spriteName = 'Projectile.png';

			
			this.isActive = false;
			
			this.sprite = PIXI.Sprite.from('https://raw.githubusercontent.com/flyingbrian/ImagesRepo/master/resources/images/' + spriteName);	
			this.sprite.scale.x = 0.1;
			this.sprite.scale.y = 0.1;
			
			this.sprite.anchor.set(0.5); //move origin to the center
			this.sprite.x = app.renderer.width / 2;
			this.sprite.y = app.renderer.height / 2;
			this.sprite.renderable = false;

			this.position = { x : 0, y : 0};
			this.velocity = { x : 0, y : 0};
			this.radius = 2;	
			this.lifeTimer = 4;
			this.timer = 0;

			app.stage.addChild(this.sprite);
	}

	function getFirstInactiveProjectile(){
		for(var i = 0; i < projectilePool.length; i ++){
			if(!projectilePool[i].isActive){
				projectilePool[i].isActive = true;
				projectilePool[i].sprite.renderable = true;
				
				return projectilePool[i];
			}
		}	
		//If there are no bullets in the pool left over. create a new one and store it within the list
		projectilePool[projectilePool.length] = new poolObj();
		return projectilePool[projectilePool.length];
	}
}