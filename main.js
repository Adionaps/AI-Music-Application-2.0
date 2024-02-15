song1=""
song2=""
function preload(){
    song1=loadSound("Tu-Hai-Kahan.mp3")
    song2=loadSound("Fighter Song-2.0.mp3")
}

scorerightWrist=0
scoreleftWrist=0

rightWristX=0
rightWristY=0
leftWristX=0
leftWristY=0

function setup(){
    canvas=createCanvas(600,500)
    canvas.center()

    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function modelLoaded(){
    console.log("poseNet is initialized")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        rightWristX=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
    
        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
    
        scorerightWrist=results[0].pose.keypoints[10].score
        scoreleftWrist=results[0].pose.keypoints[9].score
    }
}

function draw(){
    image(video,0,0,600,500)
    fill("#FF0000")
    stroke("#FF0000")
    if(scorerightWrist>0.2){
        circle(rightWristX,rightWristY,20)
        song1.stop()
        song2.play()
        document.getElementById("song").innerHTML="playing- Fighter Song-2.0"
    }
    if(scoreleftWrist>0.2){
circle(leftWristX,leftWristY,20)
song2.stop()
song1.play()
document.getElementById("song").innerHTML="playing- Tu-Hai-Kahan"
    }
}

function play(){
    song1.play()
}

function stop1(){
    song1.stop()
    song2.stop()
}