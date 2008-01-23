outlets = 2;
var possOutputs = new Array();

var existingTheta = 0;
var existingThi = 0;

function possOutput (theta, thi)
{
	this.theta = theta;
	this.thi = thi;
}

function rateOutputs(A,B)
{
	var thetaDistanceA;
	var thiDistanceA;
	var thetaDistanceB;
	var thiDistanceB;
	
	thetaDistanceA = Math.pow(A.theta - existingTheta,2);
	thiDistanceA = Math.pow(A.thi - existingThi,2);
	
	thetaDistanceB = Math.pow(B.theta - existingTheta,2);
	thiDistanceB = Math.pow(B.thi - existingThi,2);
	
	return (thetaDistanceA - thetaDistanceB);
}

function fnThetaGoAround (theta)
{
	if (theta > 3 * (Math.PI/2))
		theta = theta - (Math.PI*2);
	if (theta < -3 * (Math.PI/2))
		theta = theta + (Math.PI*2);
	return theta;
}

function list(inList)
{
	if (arguments[1] < - 0.6720)
	{
		// this light should be off because it cant point at this phantom
	} else {
		possOutputs[0] = new possOutput(arguments[0], arguments[1]);
		possOutputs[1] = new possOutput(fnThetaGoAround(arguments[0] + Math.PI), -arguments[1]);
		possOutputs[2] = new possOutput(fnThetaGoAround(arguments[0] - Math.PI), -arguments[1]);
		possOutputs[3] = new possOutput(fnThetaGoAround(arguments[0] - (2*Math.PI)), arguments[1]);
		
		possOutputs.sort(rateOutputs); // uses the sort function above to give a rating for each
		outlet(0,possOutputs[0].theta);
		outlet(1,possOutputs[0].thi);
	}
}

function bang()
{
	outlet(0, 2);
}
	