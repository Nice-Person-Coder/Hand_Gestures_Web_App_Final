prediction="";

Webcam.set({
    width:350,
    height:300,
    image_format: 'png', 
    png_quality:100
})

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ml5.version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/r-ld1HOXX/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function gotResults(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    prediction = results[0].label;
    speak();
    if (results[0].label == "Ok") {
        document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if (results[0].label == "Peace") {
        document.getElementById("update_emoji").innerHTML = "&#9996";
    }
    if (results[0].label == "Thumbs Up") {
        document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
    if (results[0].label == "Thumbs Down") {
        document.getElementById("update_emoji2").innerHTML = "&#128078";
    }
   }
}

