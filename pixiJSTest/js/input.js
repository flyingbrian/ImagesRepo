var rightPressed;
var leftPressed;
var upPressed;
var downPressed;
var spaceBarPressed;

document.addEventListener('keydown', function(event)
{
	if(event.keyCode == 37)
	{
		leftPressed = true;
	}
	else if(event.keyCode == 39)
	{
		rightPressed = true;
	}

	if (event.keyCode == 38) 
	{
		upPressed = true;
	}
	else if (event.keyCode == 40) 
	{
		downPressed = true;
	}

	if(event.keyCode == 32)
	{
		spaceBarPressed = true;
	}

	if(event.keyCode == 78)   //N
	{
		setWeapon(weaponTypes.singleShot)
	}
	if(event.keyCode == 68) //B
	{
		setWeapon(weaponTypes.doubleShot)	
	}
	if(event.keyCode == 83)   //S
	{
		setWeapon(weaponTypes.spreadShot)
	}


})


document.addEventListener('keyup', function(event)
{
	if(event.keyCode == 37)
	{
		leftPressed = false;
	}
	else if(event.keyCode == 39)
	{
		rightPressed = false;
	}


	if (event.keyCode == 38) 
	{
		upPressed = false;
	}
	else if (event.keyCode == 40) 
	{
		downPressed = false;
	}

	if(event.keyCode == 32)
	{
		spaceBarPressed = false;
	}
})

