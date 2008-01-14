outlets = 2;

function fnMakePie()
{
	outlet(0, - 3 / 2 * Math.PI);
	outlet(1, + 3 / 2 * Math.PI);
}

function loadbang()
{
	fnMakePie();
}

function bang()
{
	fnMakePie();
}	