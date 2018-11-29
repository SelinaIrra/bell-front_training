window.addEventListener('message', function(event) {
    document.getElementById('time').innerText = event.data;
});

window.parent.postMessage(true, '*');