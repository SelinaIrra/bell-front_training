var doc = document;
var pages = ['pages/first_page.html', 'pages/second_page.html', 'pages/third_page.html', 'pages/fourth_page.html', 'pages/fifth_page.html'];
var minutes, seconds;
var counter, timer;
var isStop = false;
var isPlay = true;
var buttons = doc.getElementById('actions');
var iframe = doc.getElementsByTagName('iframe')[0];
var currentSlide = 0;

buttons.addEventListener('click', selectActions);
doc.getElementById('lock_block').addEventListener('click', closeOrRepeat);

window.addEventListener('message', function () {
    seconds = 10;
    minutes = 0;
    iframe.contentWindow.postMessage("(" + minutes + " : " + seconds + ")", '*');
    timer = setTimeout(nextSlide, seconds * 1000 + minutes * 60 * 1000 + 500);
    counter = setTimeout(timeCounter, 1000);
});

function timeCounter() {
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }
    iframe.contentWindow.postMessage("(" + minutes + " : " + seconds + ")", '*');
    if (minutes === 0 && seconds === 0) {
        clearTimeout(counter);
        return;
    }
    counter = setTimeout(timeCounter, 1000);
}

function selectActions(event) {
    var target = event.target;
    if (target.getAttribute('id') === 'stop')
        stopSlider();
    else if (target.getAttribute('id') === 'play')
        playSlider();
    else if (target.getAttribute('id') === 'prev')
        previousSlide();
    else if (target.getAttribute('id') === 'next')
        nextSlide();
}

function stopSlider() {
    if (isStop)
        return;
    clearTimeout(counter);
    clearTimeout(timer);
    isStop = true;
    isPlay = false;
}

function playSlider() {
    if (isPlay)
        return;
    counter = setTimeout(timeCounter, 1000);
    timer = setTimeout(nextSlide, seconds * 1000 + minutes * 60 * 1000 + 500);
    isPlay = true;
    isStop = false;
}

function previousSlide() {
    clearTimeout(counter);
    clearTimeout(timer);
    if (currentSlide === 0) {
        stopSlider();
        alert('error');
        return;
    }
    currentSlide = currentSlide - 1;
    iframe.setAttribute('src', pages[currentSlide]);
}

function nextSlide() {
    clearTimeout(counter);
    clearTimeout(timer);
    if (currentSlide < pages.length - 1) {
        currentSlide = currentSlide + 1;
        iframe.setAttribute('src', pages[currentSlide]);
    }
    else {
        doc.getElementById('lock_block').style = 'display: block;';
    }
}

function closeOrRepeat(event) {
    var target = event.target;
    if (target.id === 'repeat') {
        doc.getElementById('lock_block').style = 'display: none;';
        currentSlide = 0;
        iframe.setAttribute('src', pages[currentSlide]);
    }
    else {
        window.close();
    }
}
