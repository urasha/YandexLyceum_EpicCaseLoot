const costs = {
    'phones': 20,
    'elite': 30,
    'iphone': 55,
    'man': 100,
    'playstation': 550,
    'knife': 250
}

const gods = {
    'phones': {
        '1': 'SAMSUNG GALAXY Z FLIP 8 256 ГБ/25',
        '2': 'APPLE IPHONE 11 PRO MAX 256GB/20',
        '3': 'SAMSUNG GALAXY S20 ULTRA 8 128ГБ/15',
        '4': 'APPLE IPHONE XS MAX 256GB/90',
        '5': 'APPLE IPHONE XS 256GB/100',
    },
    'elite': {
        '1': 'TISSOT EVERYTIME MEDIUM/55',
        '2': 'ОЖЕРЕЛЬЕ TOMMY HILFIGER/100',
        '3': 'КОЛЬЦО ВСЕВЛАСТИЯ/30',
        '4': 'КУЛОН ПСИ (PSI)/35',
        '5': 'МЕДАЛЬОН АЦТЕКОВ/75'
    },
    'iphone': {
        '1': 'APPLE IPHONE XR 128GB/120',
        '2': 'IPHONE 8 PLUS 128GB/100',
        '3': 'APPLE IPHONE 7 128GB/80',
        '4': 'APPLE IPHONE 6 128GB/40',
        '5': 'APPLE IPHONE XS MAX 256GB/200'
    },
    'man': {
        '1': 'УМНЫЙ ФУТБОЛЬНЫЙ МЯЧ ADIDAS MICOACH/300',
        '2': 'NIKE HYPERVENOM PHANTOM III ELITE FG/200',
        '3': 'SONY PLAYSTATION 4 PRO/250',
        '4': 'FIFA 20 (PS4)/50',
        '5': 'ПИВНОЙ БОКАЛ/30'
    },
    'playstation': {
        '1': 'Игровая приставка Sony PlayStation 4 Pro 2 ТБ 500 Million Limited Edition/460',
        '2': 'Шлем PS VR/300',
        '3': 'Sony Гарнитура беспроводная черная Platinum для PS4/250',
        '4': 'Игра God of War/150',
        '5': 'Противоскользящий чехол/50'
    },
    'knife': {
        '1': 'Нож М9 мраморный/200',
        '2': 'Керамбит градиент/300',
        '3': 'Нож-бабочка Кровавая паутина/160',
        '4': 'Фальшион Убийство/80',
        '5': 'Нож бабочка градиент/120'
    }
}

if (document.cookie === '') {
    document.cookie = 'money=1000; path=/; secure';
}

let slider = document.querySelector('#line');
let imgs = [...document.querySelectorAll('.slider-img')];
let counter = 1;
let balance = document.querySelector('#cost');
balance.textContent = document.cookie.split('=')[1];

document.querySelector('#sell-btn').onclick = () => {
    let money = parseInt(document.cookie.split('=')[1]);
    money += parseInt(document.querySelector('#cost-win').textContent);
    balance.textContent = money.toString();
    document.cookie = `money=${money}; path=/; secure`;
}

document.querySelector('.active-button').onclick = () => {
    let money = document.cookie.split('=')[1];
    if (money >= costs[imgs[0].alt]) {
        money -= costs[imgs[0].alt];
        balance.textContent = money.toString();
        document.cookie = `money=${money}; path=/; secure`;
        let timer = setInterval(startSlider, getRandomInt(90, 116));
        let time = getRandomInt(3900, 4100);
        setTimeout(() => {
            clearInterval(timer);
            let win = document.querySelector('#line img:nth-child(3)').src.split('/');
            document.querySelector('#price-win').innerHTML = gods[win[5]][win[6]
                                                                    .split('.png')[0]]
                                                                    .split('/')[0];
            document.querySelector('#cost-win').innerHTML = gods[win[5]][win[6]
                                                                    .split('.png')[0]]
                                                                    .split('/')[1];
            $('.popup-bg-2').fadeIn(600);
        }, time);
        setTimeout(() => {
            for (let i = 0; i < imgs.length; i++) {
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
