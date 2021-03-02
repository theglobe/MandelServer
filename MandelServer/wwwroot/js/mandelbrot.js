var loadFractal = function (centerX, centerY, pixelToWorldScale, numIterations) {
	const containerElement = $('#imageContainer');
	const url = new URL('/Fractal/Mandelbrot', 'http://localhost:62951/');
	url.searchParams.append('centerX', centerX);
	url.searchParams.append('centerY', centerY);
	url.searchParams.append('pixelToWorldScale', pixelToWorldScale);
	url.searchParams.append('numIterations', numIterations);
	containerElement.html(`<img id= 'fractalImage' src="${url.href}"></img>`);
}

var centerX = 1,
	centerY = 0,
	pixelToWorldScale = 4 / 512,
	numIterations = 256;

var keyHandler = function (event) {
	switch (event.key){
		case "q":
			pixelToWorldScale = pixelToWorldScale / 2;
			loadFractal(centerX, centerY, pixelToWorldScale, numIterations);
			break;
		case "a":
			pixelToWorldScale = pixelToWorldScale * 2;
			loadFractal(centerX, centerY, pixelToWorldScale, numIterations);
			break;
		case "w":
			numIterations = numIterations * 2;
			loadFractal(centerX, centerY, pixelToWorldScale, numIterations);
			break;
		case "s":
			numIterations = numIterations / 2;
			loadFractal(centerX, centerY, pixelToWorldScale, numIterations);
			break;
	}
}

var clickHandler = function (event) {
	const imageElement = $('#fractalImage');
	var width = imageElement.width();
	var height = imageElement.height();

	centerX = event.offsetX * pixelToWorldScale + centerX - width * pixelToWorldScale / 2;
	centerY = event.offsetY * pixelToWorldScale + centerY - height * pixelToWorldScale / 2;

	loadFractal(centerX, centerY, pixelToWorldScale, numIterations);
}

window.addEventListener('keypress', keyHandler);
window.onload = function () {
	const containerElement = $('#imageContainer');
	containerElement.click(clickHandler);
	loadFractal(centerX, centerY, pixelToWorldScale, numIterations);
}