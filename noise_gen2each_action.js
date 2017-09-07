var Nightmare = require('nightmare'); 
var nightmare = Nightmare({ show: true });
const wat_action = require('wat-action');
const fs = require('fs');

var scenarioString = require('./scenario.json');
var noiseAction = require('./set_actions.json');

const scenario = new wat_action.Scenario(scenarioString);
const noise = new wat_action.Scenario(noiseAction);

// addnoise();

var Player = require('./player.js')
var player = new Player.Player
player.play('./scenario.json')


function addnoise(){
      for(var i = 0; i < noise.actions.length; i++)
      {
      scenario.actions.splice(1,0,noise.actions[i]);

      var scenarioJson = JSON.stringify(JSON.parse(scenario.toJSON()),null,2);
      var dir = __dirname + '/noiseScenaio';
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, 0744);
      }
      var path = dir + '/noise'+i+'.json';

      if(fs.existsSync(path) ){
       fs.unlinkSync(path);
       }

       fs.writeFile(path, scenarioJson, {flag: 'a'}, function (err) {
       if(err) {
        console.error(err);
       } else {
       console.log('write sucess');
       }
       });
   
      scenario.actions.splice(1,1);
      }
} 

  