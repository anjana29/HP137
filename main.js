Status="";
object="";
video="";
objects=[];
function setup(){
    canvas=createCanvas(480,320);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,320);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object=document.getElementById("objectname").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    Status=true;
}
function draw(){
    image(video,0,0,480,320);
    if(Status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status: object detected";
            console.log(objects.length);
            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label==object){
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("object").innerHTML=object+"Found";
        var synth=window.speechSynthesis;
        var utterThis=new SpeechSynthesisUtterance(object+"Found");
        synth.speak(utterThis);

    }
    else{
        document.getElementById("object").innerHTML=object+"Not Found";
    }

        }
    }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}