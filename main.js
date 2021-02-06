Webcam.set({
    height:300,
    width:350,
    image_format:'png',  
    png_quality:100
  });
  
  camera = document.getElementById("webcam_view");
  
  Webcam.attach(camera);
  
  function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("snapshot_view").innerHTML= "<img id='snapshot' src='"+data_uri+"'>";
    });
  }
  
  console.log("ml5 version is "+ ml5.version);
  
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/r3i570ZdL/model.json", modelLoaded);
  
  function modelLoaded(){
      console.log("Model Loaded!");
  }
  
  function speak(){
      var synth = window.speechSynthesis;
      speak_data_1 = "First Prediction is:" + prediction1;
      speak_data_2 = "And the second prediction is:" + prediction2;
      var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
      synth.speak(utterthis);
  }

  function check(){
    img = document.getElementById("snapshot").src;
    classifier.classify(img, gotResult);
  }
  
  function gotResult(error, results){
    if(error){
      console.log(error);
    }
    else{
      console.log(results);
      document.getElementById("finger_gesture").innerHTML = results[0].label;
      document.getElementById("finger_gesture2").innerHTML = results[1].label;
      prediction1 = results[0].label;
      prediction2 = results[1].label;
      speak();
  
      if(results[0].label == 'Amazing'){
        document.getElementById("emoji1").innerHTML = "&#128077";
      }
      if(results[0].label == 'Awesome'){
        document.getElementById("emoji1").innerHTML = "&#128076";
      }
  
      if(results[0].label == 'Victory'){
        document.getElementById("emoji1").innerHTML = "&#129304";
      }
  
      if(results[1].label == 'Amazing'){
        document.getElementById("emoji2").innerHTML = "&#128077";
      }
      if(results[1].label == 'Awesome'){
        document.getElementById("emoji2").innerHTML = "&#128076";
      }
  
      if(results[1].label == 'Victory'){
        document.getElementById("emoji2").innerHTML = "&#129304";
      }
    }
  }