const costs = {
	'phone': 20,
	'elite': 30,
	'iphone': 55,
	'man': 100,
	'playstation': 550,
	'knife': 250
}

if (document.cookie === '') {
	document.cookie = 'money=100; path=/; secure';
}

let slider = document.querySelector('#line');
let imgs = [...document.querySelectorAll('.slider-img')];
let counter = 1;
let balance = document.querySelector('#cost');
balance.textContent = document.cookie.split('=')[1];


document.querySelector('.active-button').onclick = () => {
	let money = document.cookie.split('=')[1];
	if(money >= costs[imgs[0].alt]) {
		money -= costs[imgs[0].alt];
		balance.textContent = money.toString();
		document.cookie = `money=${money}; path=/; secure`;
		let timer = setInterval(startSlider, getRandomInt(90, 116));
		let time = getRandomInt(3900, 4100);
		setTimeout(() => {
			clearInterval(timer);
			document.querySelector('#price-win').innerHTML = 'Iphone 13S';
			$('.popup-bg-2').fadeIn(600);
		}, time);
		setTimeout(() => {
			for(let i = 0; i < imgs.length; i++) {
				imgs[i].style.left = 0 + 'px';
			}
		}, time - 10)
	}
};

function getRandomInt(min, max) {
  	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min;
}

function startSlider() {
	for (let i = 0; i < imgs.length; i++) {
		imgs[i].style.left = -130 + 'px';
	}
	slider.removeChild(imgs[0]);

	if (counter === imgs.length) {
		counter = 1;
	}

	let img = new Image();
	img.onload = () => {
		slider.appendChild(img);
	}

	img.src = '../static/img/' + imgs[0].alt + '/' + counter + '.png';
	img.className = 'slider-img';
	img.alt = imgs[0].alt;

	imgs.push(img);
	imgs.shift();

	counter += 1;
}
