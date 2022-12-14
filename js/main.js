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
const ourGallery = document.querySelectorAll('.gallery img');
const allBullets = document.querySelectorAll('.nav-bullets .bullets');
const bulletsSpan = document.querySelectorAll('.bullets-option span');
const bulletsContainer = document.querySelector('.nav-bullets');

const scrollOoption = document.querySelectorAll('.scroll-option span');
const yesScrollOption = document.querySelector('.scroll-option .yes');
const noScrollOption = document.querySelector('.scroll-option .no');

const toggleMenu = document.querySelector('.toggle-menu');
const menuLinks = document.querySelector('.landing-page .links');

// Random Bg Option
let backgroundOption = true;

// Variable to control the Interval
let bgInterval;

// check if there is localstorage options
const mainColors = localStorage.getItem('color_option');
const randomBg = localStorage.getItem('random_bg_option');
const bulletOption = localStorage.getItem('bullets_option');
const localScrollOption = localStorage.getItem('scroll_option');

if (mainColors !== null) {
	// set color from localstorage
	root.style.setProperty('--main-color', mainColors);
	//  add active class to the current color
	colorsList.forEach((color) => {
		if (color.dataset.color === mainColors) {
			color.classList.add('active');
		}
	});
} else {
	colorsList.forEach((color) => {
		if (color.dataset.color === '#ff9800') {
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

if (bulletOption !== null) {
	bulletsSpan.forEach((span) => {
		span.classList.remove('active');
	});

	if (bulletOption === 'block') {
		bulletsContainer.style.display = 'block';
		document.querySelector('.bullets-option .yes').classList.add('active');
	} else {
		bulletsContainer.style.display = 'none';
		document.querySelector('.bullets-option .no').classList.add('active');
	}
}

if (localScrollOption !== null) {
	scrollOoption.forEach((span) => {
		span.classList.remove('active');
	});

	if (localScrollOption === 'yes') {
		document.querySelector('.header-area').classList.add('scroll');
		yesScrollOption.classList.add('active');
	} else {
		document.querySelector('.header-area').classList.remove('scroll');
		noScrollOption.classList.add('active');
	}
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

// Control setting box
gearBox.addEventListener('click', () => {
	settingsBox.classList.toggle('open');
	gear.classList.toggle('fa-spin');
	document.querySelector('.overlay-setting').classList.toggle('active');
	// Close setting box on click outside
	document.querySelector('.overlay-setting.active').onclick = () => {
		document.querySelector('.overlay-setting.active').classList.remove('active');
		settingsBox.classList.remove('open');
		gear.classList.toggle('fa-spin');
	};
});

// Switch colors
colorsList.forEach((color) => {
	color.addEventListener('click', (e) => {
		// remove active class from others & add new active class
		handleActive(e);
		root.style.setProperty('--main-color', color.dataset.color);
		// save the color to localstorage
		localStorage.setItem('color_option', color.dataset.color);
	});
});

// Random background option
randomBgElements.forEach((span) => {
	span.addEventListener('click', (e) => {
		// remove active class from others & add new active class
		handleActive(e);

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

// Scroll Nav Bar Option
scrollOoption.forEach((span) => {
	span.addEventListener('click', (e) => {
		handleActive(e);

		// Functionality
		if (span.dataset.scroll === 'yes') {
			document.querySelector('.header-area').classList.add('scroll');
			localStorage.setItem('scroll_option', 'yes');
		} else {
			document.querySelector('.header-area').classList.toggle('scroll');
			localStorage.setItem('scroll_option', 'no');
		}
	});
});

// Increase Skills Level on Scroll
window.onscroll = function () {
	// Skills Offset Top
	let skillsOffsetTop = ourSkills.offsetTop;
	// console.log(skillsOffsetTop)
	// Skills Outer Height
	let skillsOuterHeight = ourSkills.offsetHeight;
	// console.log(skillsOuterHeight);
	// Window Height
	let windowHeight = this.innerHeight;
	// console.log(windowHeight);
	// window Scroll Top
	let windowScrollTop = this.pageYOffset;
	// console.log(windowScrollTop);

	if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
		let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
		allSkills.forEach((skill) => {
			skill.style.width = skill.dataset.progress;
		});
	}
};

// Create PopUp For The Images
ourGallery.forEach((img) => {
	img.addEventListener('click', (e) => {
		// create overlay element
		let overlay = document.createElement('div');
		overlay.className = 'popup-overlay';
		document.body.appendChild(overlay);

		// Create popup box
		const popupBox = document.createElement('div');
		popupBox.className = 'popup-box';

		// Create Image Heading
		let imgHeading = document.createElement('h3');
		if (img.alt === '') {
			imgHeading.textContent = `Unknown Image`;
		} else {
			imgHeading.textContent = `${img.alt}`;
		}
		popupBox.appendChild(imgHeading);

		// Create Image
		let popupImg = document.createElement('img');
		popupImg.setAttribute('src', img.src);

		popupBox.appendChild(popupImg);
		overlay.appendChild(popupBox);

		// Create Close Btn
		let closeBtn = document.createElement('span');
		closeBtn.textContent = 'X';

		popupBox.appendChild(closeBtn);
		// Close Options
		closeBtn.addEventListener('click', () => {
			popupBox.remove();
			overlay.remove();
		});
		overlay.addEventListener('click', () => {
			popupBox.remove();
			overlay.remove();
		});
	});
});

// Nav Bullets Functionality
allBullets.forEach((bullet) => {
	bullet.addEventListener('click', (e) => {
		document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
			behavior: 'smooth',
		});
	});
});

// Hnadle active status Function
function handleActive(ev) {
	// Remove active class from all childrens
	ev.target.parentElement.querySelectorAll('.active').forEach((element) => {
		element.classList.remove('active');
	});
	// Add active class on self
	ev.target.classList.add('active');
}

// Nav Bullets Option
bulletsSpan.forEach((span) => {
	span.addEventListener('click', (e) => {
		if (span.dataset.display === 'show') {
			bulletsContainer.style.display = 'block';
			localStorage.setItem('bullets_option', 'block');
		} else {
			bulletsContainer.style.display = 'none';
			localStorage.setItem('bullets_option', 'none');
		}
		handleActive(e);
	});
});

document.querySelector('.reset-options').onclick = function () {
	// localStorage.clear(); not good if ther is something else in localstorge

	localStorage.removeItem('color_option');
	localStorage.removeItem('random_bg_option');
	localStorage.removeItem('bullets_option');
	localStorage.removeItem('scroll_option');

	window.location.reload();
};

// Toggle Menu Links with Burger icon
toggleMenu.onclick = function (e) {
	// Stop Propagation
	e.stopPropagation();

	this.classList.toggle('active');
	menuLinks.classList.toggle('active');
};

// Click anywhere to close the menu
document.addEventListener('click', (e) => {
	if (e.target !== toggleMenu && e.target !== menuLinks) {
		// check if menu is active or open
		if (menuLinks.classList.contains('active')) {
			// Remove active class from menu and burger icon
			menuLinks.classList.remove('active');
			toggleMenu.classList.remove('active');
		}
	}
});

// Stop Propagation on Menu
menuLinks.onclick = function (e) {
	e.stopPropagation();
};
