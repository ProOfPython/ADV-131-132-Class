img = ''
label = 0
stat = false
data = [] /* 2D */
paints = ['00', '77', 'FF']

function modelLoaded(){console.log('Model is loaded.'); stat = true; objDetect.detect(img, gotResult)}
function gotResult(error, results){if (error){console.log(error)}; console.log(results); data = results}
function preload(){img = loadImage('catNdog.jpg')}
function setup(){canvas = createCanvas(640, 420); canvas.center(); objDetect = ml5.objectDetector('cocossd', modelLoaded);}

function getPaint(){
    paint = '#'
    for (i = 0; i < 3; i++){
        part = paints[round(Math.random() * 100 / 33)]
        paint += part
        console.log(part)
    }
    return paint
}

function draw(){
    image(img, 0, 0, 640, 420)
    if (stat == true) {
        for (i = 0; i < data.length; i++){
            paint = getPaint()
            fill(paint)
            stroke(paint)
            noFill()
            rect(data[i].x, data[i].y, data[i].width, data[i].height)
            text(data[i].label + ' (' + (floor(data[i].confidence * 100)) + '%)', data[i].x + 15, data[i].y + 20)
        }
    }
}