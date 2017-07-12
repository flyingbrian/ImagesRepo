var rightPressed;
var leftPressed;
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

	if(event.keyCode == 32)
	{
		spaceBarPressed = false;
	}
})

