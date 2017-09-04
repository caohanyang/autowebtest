var Nightmare = require('nightmare');	
var nightmare = Nightmare({ show: true });
var JSON = require('parse-json'); 
var fs = require('fs');
var data = fs.readFileSync('test.json','UTF-8');
console.log(data);
var positions = new Array();
positions.push(0);
var sstr = new Array();
var noiseStr = "";
var noiseData= "";

function AddNoise(){
    SearchSubStr(data,"\"type\"");
    positions.push(data.length);
    for (var i = 0; i < positions.length-1; i++)
      {
        sstr[i] = data.substring(positions[i]-1,positions[i+1]-1);
      }
      sstr[sstr.length-1] = sstr[sstr.length-1] +",";
    for (var i = 1; i < sstr.length; i++)
      {
        sstr[i] = sstr[i] + GenerateNoise();
      }
    for (var i = 1; i < sstr.length; i++)
      {
        noiseData = noiseData + sstr[i];
      }
      noiseData = "[" + noiseData.substring(0,noiseData.length-1) + "]";
  }

function GenerateNoise(){
    var rd = Math.round(Math.random()*5);
    for(var i = 0; i < rd; i++){
      var r = Math.round(Math.random()*10);
      if (r < 5) {noiseStr = noiseStr + AddWait();}
      else {noiseStr = noiseStr + AddScrollTo();}

    }
    return noiseStr;
  }

function SearchSubStr(str,subStr){
    var pos = str.indexOf(subStr);
    while(pos>-1){
        positions.push(pos);
        pos = str.indexOf(subStr,pos+1);
    }
}

 function AddWait(){

    var ms = Math.round(Math.random()*100);  
    var addStr = "{\"type\":\"Wait\",\"ms\":\"" + ms + "\"},"
    return addStr;

  } 

 function AddScrollTo(){

    var x = Math.round(Math.random()*100);  
    var y = Math.round(Math.random()*100); 
    var addStr = "{\"type\":\"scrollTo\",\"top\":\"" + x + "\",\"left\":\""+ y +"\"},"
    return addStr;

  } 


AddNoise();
var obj = eval('(' + data + ')');
console.log(obj);
console.log("--nosie generate----------------");
console.log(noiseData);
var obj = eval('(' + noiseData + ')');
console.log(obj);


