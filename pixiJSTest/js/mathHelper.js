function lerp(start, end, t)
{
	return start + t * (end - start)
}

function rect(xVal, yVal, widthVal, heightVal) //all rects will have origins in the middle
{
	this.x = xVal - (widthVal / 2);
	this. y = yVal - (heightVal / 2);
	this.width = widthVal;
	this.height = heightVal;


}