const root = document.querySelector(':root');
const settingsBox = document.querySelector('.settings-box');
const gearBox = document.querySelector('.gear-box');
const gear = document.querySelector('.fa-gear');
const landingPage = document.querySelector('.landing-page');
const colorsList = document.querySelectorAll('.colors-list li');

// check if there is localstorage color option
const mainColors = localStorage.getItem('color_option');

if (mainColors !== null) {
	// set color from localstorage
	root.style.setProperty('--main-color', mainColors);
	//  add active class to the current color
	colorsList.forEach((color) => {
		if (color.dataset.color === mainColors) {
			color.classList.add('active');
		}
	});
}

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

	// Ghange background img url
	landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
}, 10000);

gearBox.addEventListener('click', () => {
	settingsBox.classList.toggle('open');
	gear.classList.toggle('fa-spin');
});

// Switch colors
colorsList.forEach((color) => {
	color.addEventListener('click', () => {
		// remove active class from others
		colorsList.forEach((color) => {
			color.classList.remove('active');
		});
		// add new active class
		color.classList.toggle('active');
		root.style.setProperty('--main-color', color.dataset.color);
		// save the color to localstorage
		localStorage.setItem('color_option', color.dataset.color);
	});
});

// Elzero way //////////
// Switch colors
// const colorsLi = document.querySelectorAll('.colors-list li');
// // loop on all list items
// colorsLi.forEach((li) => {
// 	// click on every list item
// 	li.addEventListener('click', (e) => {
// 		//set color on root
// 		document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
//       localStorage.setItem('color_option', e.target.dataset.color);

// 	});
// });
