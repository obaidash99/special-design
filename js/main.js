let settingsBox = document.querySelector('.settings-box');
let gearBox = document.querySelector('.gear-box');
let gear = document.querySelector('.fa-gear');
let landingPage = document.querySelector('.landing-page');
let colorsList = document.querySelectorAll('.colors-list li');

// Get array of imgs
let imgsArray = [
	'01.jpg',
	'02.jpg',
	'03.jpg',
	'04.jpg',
	'05.jpg',
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
}, 10000);

gearBox.addEventListener('click', () => {
	settingsBox.classList.toggle('open');
	gear.classList.toggle('fa-spin');
});

// Switch colors
colorsList.forEach((color) => {
	color.addEventListener('click', () => {
		colorsList.forEach((color) => {
			color.classList.remove('active');
		});
		color.classList.toggle('active');
		var root = document.querySelector(':root');
		root.style.setProperty('--main-color', color.dataset.color);
	});
});
