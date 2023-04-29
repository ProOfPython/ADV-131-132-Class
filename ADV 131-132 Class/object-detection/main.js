data = []
img = ''
label = 0
paints = []
secs = ['00', '77', 'FF']
stat = false
Xs = []

function modelLoaded(){console.log('Model is loaded.'); stat = true;}
function gotResult(error, results){if (error){console.log(error)}; console.log(results); data = results}
function preload(){}

function setup(){
    canvas = createCanvas(380, 380)
    canvas.center();
    
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}

function start(){
    objDetect = ml5.objectDetector('cocossd', modelLoaded)
}

function getPaint(){
    paint = '#'
    for (i = 0; i < 3; i++){
        part = secs[round(Math.random() * 100 / 33)]
        paint += part
    }
    return paint
}

function draw(){
    image(video, 0, 0, 380, 380)
    if (stat == true) {
        objDetect.detect(video, gotResult)
        for (i = 0; i < data.length; i++){
            x = data[i].x
            y = data[i].y
            w = data[i].width
            h = data[i].height * 0.875
            c = data[i].confidence
            l = data[i].label

            r, g, b = random(255)
            
            if (Xs.includes(x)){
                paint = paints[Xs.indexOf(x)]
            } else {
                Xs.push(x)
                paint = getPaint()
                paints.push(paint)
            }
            
            fill(r, g, b)
            stroke(r, g, b)
            noFill()
            rect(x, y, w, h)
            text(l + ' (' + (floor(c * 100)) + '%)', x + 15, y + 20)
        }
    }
}