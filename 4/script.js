var doc = document;
var pages = ['first_page.html', 'second_page.html', 'third_page.html', 'fourth_page.html', 'fifth_page.html'];
var seconds = 10;
var minutes = 0;
var counter;
var isStop = false;
var isPlay = true;
var buttons = doc.getElementById('actions');

function check_window(url) {
    var test_page = window.open(url);
    if(test_page) {
        return true
    }
    else {
        alert("В вашем браузере отключены всплывающие окна.\n\nВключите данную функцию. ");
        setTimeout(window.location.reload(), 5000);
        return false
    }
}

for (var i = 0; i < pages.length; i++) {
    if (window.location.href.search(new RegExp('.*' + pages[i])) === 0)
        var currentSlide = i;
}
doc.getElementById('time').innerText = "(" + minutes + " : " + seconds + ")";

buttons.addEventListener('click', selectActions);
addEventListener('load', timeCounter);
var timer = setInterval(nextSlide, seconds * 1000 + minutes * 60 * 1000);

function timeCounter() {
    var time_str = doc.getElementById('time').innerText.split(':');
    minutes = +(time_str[0].substr(1));
    seconds = +(time_str[1].substr(0, time_str[1].length - 1));
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }
    doc.getElementById('time').innerText = "(" + minutes + " : " + seconds + ")";
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
    if (!isStop)
    {
        clearInterval(timer);
        clearTimeout(counter);
        isStop = true;
        isPlay = false;
    }
}

function playSlider() {
    if (!isPlay)
    {
        timeCounter();
        timer = setInterval(nextSlide, seconds * 1000 + minutes * 60 * 1000);
        isPlay = true;
        isStop = false;
    }
}

function previousSlide() {
    if (currentSlide === 0)
    {
        stopSlider();
        alert('error');
        return;
    }
    currentSlide = currentSlide - 1;
    if (check_window(pages[currentSlide]))
        window.close();
}

function nextSlide() {
    if (currentSlide < pages.length - 1) {
        currentSlide = currentSlide + 1;
        if (check_window(pages[currentSlide]))
            window.close();
    }
    else {
        clearInterval(timer);
        var div = doc.createElement('div');
        div.className = 'lock_block';
        var block = doc.createElement('div');
        block.className = 'block';
        var close = doc.createElement('button');
        close.innerText = 'Х';
        close.className = 'close';
        var repeat = doc.createElement('button');
        repeat.className = 'repeat';
        block.appendChild(close);
        block.appendChild(repeat);
        div.appendChild(block);
        doc.body.appendChild(div);
        div.addEventListener('click', closeOrRepeat);
    }
}

function closeOrRepeat(event) {
    var target = event.target;
    if (target.className === 'repeat') {
        currentSlide = 0;
        if (check_window(pages[currentSlide]))
            window.close();
    }
    else
        window.close();
}
