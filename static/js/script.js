let slider = document.querySelector('#line');
let imgs = [...document.querySelectorAll('.slider-img')]
let counter = 1;

document.querySelector('.open-box-button').onclick = () => {
	let timer = setInterval(startSlider, getRandomInt(90, 116));
	let time = getRandomInt(3900, 4100);
	setTimeout(() => {clearInterval(timer)}, time);
	setTimeout(() => {
	    for(let i = 0; i < imgs.length; i++) {
		    imgs[i].style.left = 0 + 'px';
	    }
	}, time - 10)
}

function getRandomInt(min, max) {
  	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min;
}

function startSlider() {
	for(let i = 0; i < imgs.length; i++) {
		imgs[i].style.left = -130 + 'px';
	}
	slider.removeChild(imgs[0]);

	if (counter == 5) {
		counter = 1;
	}

	let img = new Image();
	img.onload = () => {
		slider.appendChild(img);
	}

	img.src = '../static/img/phone_' + counter + '.png';
	img.className = 'slider-img';

	imgs.push(img);
	imgs.shift();

	counter += 1;
}
