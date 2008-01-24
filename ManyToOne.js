outlets = 3;
inlets = 2; // 1 = list of positions, 2 = method

var method = 0;
var dimmer = 255;

var possOutputs = new Array();

var currentTheta = 0;
var currentThi = 0;
var aimTheta = 0;
var aimThi = 0;

var lasttime = 0; // absolute time of last update (ms)
var dt = 10; // time since last update (ms)

const speedTheta = 1;
const speedThi = 1;

function loadbang()
{
	dat = new Date();
	lasttime = dat.getTime();
}

function updatePosition()
{
	currentTheta += speedTheta * (aimTheta - currentTheta);
	currentThi += speedThi * (aimThi - currentThi);
	
	// these two if statements kill off any oscillations in estimating current position.
	if (Math.abs(currentTheta - aimTheta) <= speedTheta)
		currentTheta = aimTheta;
	
	if (Math.abs(currentThi - aimThi) <= speedThi)
		currentThi = aimThi;
}

function msg_int(a)
{
	switch (inlet)
	{
		case 0:
			break;
			
		case 1:
			method = a;
			break;
	}
}
function updateTime()
{
	dat = new Date();
	dt = dat.getTime() - lasttime;
	lasttime = dat.getTime();
}

function distanceToAim()
{
	return Math.sqrt(Math.pow(aimThi - currentThi, 2) + Math.pow(aimTheta - currentTheta, 2));
}
function rateOutputs(A,B)
{
	var thetaDistanceA;
	var thiDistanceA;
	
	var thiDistanceB;
	var thetaDistanceB;
	
	thetaDistanceA = Math.abs(currentTheta - A[0]) / speedTheta;
	thetaDistanceB = Math.abs(currentTheta - B[0]) / speedTheta;
	
	thiDistanceA = Math.abs(currentThi - B[1]) / speedThi;
	thiDistanceA = Math.abs(currentThi - B[1]) / speedThi;
	
	return (Math.max(thetaDistanceA - thetaDistanceB, thiDistanceA - thiDistanceB)); // maybe this should be the other way around? i.e. B - A
}

function fnThetaGoAround (theta)
{
	if (theta > 3 * (Math.PI/2))
		theta = theta - (Math.PI*2);
	if (theta < -3 * (Math.PI/2))
		theta = theta + (Math.PI*2);
	return theta;
}

function possOutputMethods(nMethod, theta, thi) // we use nMethod here to use the method which is passed rather than the global method, even though they are likely to be the same
{
	var retval = new Array();
	switch(nMethod)
	{
		case 1:
			retval[0] = theta;
			retval[1] = thi;
			break;
		
		case 2:
			retval[0] = fnThetaGoAround(theta + Math.PI);
			retval[1] = -thi;
			break;
			
		case 3:
			retval[0] = fnThetaGoAround(theta - Math.PI);
			retval[1] = -thi;
			break;
			
		case 4:
			retval[0] = fnThetaGoAround(theta - (2*Math.PI));
			retval[1] = thi;
			break;
	}
	
	return retval;
}

function list(inList)
{
	aimTheta = arguments[0];
	aimThi = arguments[1];
	
	
	if (arguments[1] < - 0.6720) // this light should be off because it cant point at this phantom (the phantom is below the viewable area of the mac light)
	{
		
	} else {
		switch(method)
		{
			case 0:
			
				var possOutputs = new Array();				
				
				possOutputs[0] = possOutputMethods(1, arguments[0], arguments[1]);
				possOutputs[1] = possOutputMethods(2, arguments[0], arguments[1]);
				possOutputs[2] = possOutputMethods(3, arguments[0], arguments[1]);
				possOutputs[3] = possOutputMethods(4, arguments[0], arguments[1]);
				
				possOutputs.sort(rateOutputs); // uses the sort function above to give a rating for each
				output = possOutputs[0];
				break;
			
			default:
				output = possOutputMethods(arguments[0], arguments[1], method)
				break;
		}
		
		outlet(0,output.theta);
		outlet(1,output.thi);
		
		aimTheta = output.theta;
		aimThi = output.thi;
	}
	
	updateTime();
	offTargetOutput();
}

function offTargetOutput()
{
	//6 = 0
	//0 = 1
	outlet(2, distanceToAim());
}