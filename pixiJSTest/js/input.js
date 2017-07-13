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

