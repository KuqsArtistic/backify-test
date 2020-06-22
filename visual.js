var canvas = document.getElementsByTagName('canvas')[0];
var canvasContext = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;

var audioContext = new (window.AudioContext || window.webkitAudioContext);
var audio = document.getElementsByTagName('audio')[0];

var source = audioContext.createMediaElementSource(audio);
var analyser = audioContext.createAnalyser();

source.connect(analyser);
analyser.connect(audioContext.destination);

var bufferLength = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(bufferLength);

function Render() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);

    var frequencyWidth = (canvas.width / bufferLength), frequencyHeight = 0, x = 0;

    for (var increment = 0; increment < bufferLength; increment++) {
        frequencyHeight = frequencyData[increment] * (canvas.height * 0.003);
        canvasContext.fillStyle = 'rgb(0, 0, 0)';
        canvasContext.fillRect(x, canvas.height - frequencyHeight, frequencyWidth, frequencyHeight);
        x += frequencyWidth + 4;
    }

    requestAnimationFrame(Render);
}

audio.play();
Render();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
});
