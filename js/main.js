const root = document.querySelector(':root');
const settingsBox = document.querySelector('.settings-box');
const gearBox = document.querySelector('.gear-box');
const gear = document.querySelector('.fa-gear');
const landingPage = document.querySelector('.landing-page');
const colorsList = document.querySelectorAll('.colors-list li');
const randomBgElements = document.querySelectorAll('.random-background span');
const yesRandomOption = document.querySelector('.random-background .yes');
const noRandomOption = document.querySelector('.random-background .no');
const ourSkills = document.querySelector('.skills');

// Random Bg Option
let backgroundOption = true;

// Variable to control the Interval
let bgInterval;

// check if there is localstorage options
const mainColors = localStorage.getItem('color_option');
const randomBg = localStorage.getItem('random_bg_option');

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
if (randomBg === 'true') {
	yesRandomOption.classList.add('active');
	randomizeImgs();
} else {
	noRandomOption.classList.add('active');
	clearInterval(bgInterval);
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

// Randomize Imgs Function
function randomizeImgs() {
	if (backgroundOption === true) {
		bgInterval = setInterval(() => {
			// get random number
			let randomNumber = Math.floor(Math.random() * imgsArray.length);

			// Ghange background img url
			landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
		}, 10000);
	}
}

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

// Random background option
randomBgElements.forEach((span) => {
	span.addEventListener('click', () => {
		// remove active class from others
		randomBgElements.forEach((el) => {
			el.classList.remove('active');
		});
		// add new active class
		span.classList.add('active');

		// control randomize function
		if (span.dataset.bg === 'yes') {
			backgroundOption = true;
			randomizeImgs();
			localStorage.setItem('random_bg_option', 'true');
		} else {
			backgroundOption = false;
			clearInterval(bgInterval);
			// back to img one
			// landingPage.style.backgroundImage = `url("imgs/01.jpg")`;
			localStorage.setItem('random_bg_option', 'false');
		}
	});
});

randomizeImgs();

window.onscroll = function () {
	// Skills Offset Top
	let skillsOffsetTop = ourSkills.offsetTop;
	// Skills Outer Height
	let skillsOuterHeight = ourSkills.offsetHeight;
	// Window Height
	let windowHeihgt = this.innerHeight;
	// window Scroll Top
	let windowScrollTop = this.pageYOffset;

	if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeihgt) {
		console.log('.skill section');

		let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
		allSkills.forEach((skill) => {
			skill.style.width = skill.dataset.progress;
		});
	}
};
