outlets = 4;

function fnMakePie()
{
	outlet(0, - 3 / 2 * Math.PI);
	outlet(1, 3 / 2 * Math.PI);
	outlet(2, -128.5 / 180 * Math.PI);
	outlet(3, (128.5 / 180) * Math.PI);
}

function loadbang()
{
	fnMakePie();
}

function bang()
{
	fnMakePie();
}	