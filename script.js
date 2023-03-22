const objUi = {
    parallax: document.querySelector('.parallax'),
    clouds: document.querySelector('.images-parallax__clouds'),
    montains: document.querySelector('.images-parallax__mountains'),
    human: document.querySelector('.images-parallax__human'),
    video: document.querySelector('.video'),
};
const objOdds = {
    forClouds: 40,
    forMontains: 20,
    forHuman: 10,
    speed: 0.05,
}

window.onload = function () {
    if (objUi.parallax) {
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;
        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * objOdds.speed);
            positionY = positionY + (distY * objOdds.speed);

            objUi.clouds.style.cssText = `transform: translate(${positionX / objOdds.forClouds}%, ${positionY / objOdds.forClouds})`;
            objUi.montains.style.cssText = `transform: translate(${positionX / objOdds.forMontains}%, ${positionY / objOdds.forMontains})`;
            objUi.human.style.cssText = `transform: translate(${positionX / objOdds.forHuman}%, ${positionY / objOdds.forHuman})`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        objUi.parallax.addEventListener('mousemove', function (e) {
            const parallaxWidth = objUi.parallax.offsetWidth;

            const coordX = e.pageX - parallaxWidth / 2;

            coordXprocent = coordX / parallaxWidth * 100;
        })
    }
}
window.addEventListener('scroll', function () {

    if (window.pageYOffset < 790) {
        const totalImages = 234;
        const images = [];
        for (let i = 3; i < totalImages + 3; i++) {
            let filename = 'Tron_';
            if (i < 10) filename += '00';
            else if (i < 100) filename += '0';
            filename += i + '.jpg';
            let img = new Image;
            img.src = 'http://ekragency.com/demos/canvas-scroll/images/' + filename;

            images.push(img);
        }
        const canv = document.getElementById('background');
        let context = canv.getContext('2d');


        let currentLocation = 0;

        const setImage = function (newLocation) {
            context.drawImage(images[newLocation], 0, 0, 1280, 720);
        }
        const wheelDistance = function (evt) {
            if (!evt) evt = event;
            let w = evt.wheelDelta, d = evt.detail;
            if (d) {
                if (w) return w / d / 40 * d > 0 ? 1 : -1;
            } else return w / 120;
        };
        const wheelDirection = function (evt) {
            if (!evt) evt = event;
            return (evt.detail < 0) ? 1 : (evt.wheelDelta > 0) ? 1 : -1;
        };

        const MouseWheelHandler = function (e) {

            let distance = wheelDistance(e);
            let direction = wheelDirection(e);

            currentLocation -= Math.round(distance * 3);
            if (currentLocation < 0) currentLocation = 0;
            if (currentLocation >= images.length)
                currentLocation = images.length - 1;

            setImage(currentLocation);
        };

        window.addEventListener("mousewheel", MouseWheelHandler, false);
        setImage(4);
    }
})
