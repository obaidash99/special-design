// Select Landing page element
let landingPage = document.querySelector('.landing-page');

// Get array of imgs
let imgsArray = [
	'01.jpg',
	'02.jpg',
	'03.jpg',
	'04.jpg',
	'05.jpg',
	'06.png',
	'07.jpg',
	'08.jpg',
	'09.jpg',
	'10.jpg',
];

setInterval(() => {
	// get random number
	let randomNumber = Math.floor(Math.random() * imgsArray.length);

	// Ghenge background img url
	landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
}, 2000);
