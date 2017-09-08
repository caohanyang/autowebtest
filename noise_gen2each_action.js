var Nightmare = require('nightmare'); 
var nightmare = Nightmare({ show: true });
const wat_action = require('wat-action');
const fs = require('fs');
var co = require('co')

var scenarioString = require('./scenario.json');
var noiseAction = require('./set_actions.json');

const scenario = new wat_action.Scenario(scenarioString);
const noise = new wat_action.Scenario(noiseAction);

var dir = __dirname + '/noiseScenaio';

addnoise(dir)

// playScenarios(dir)


// function playScenarios(dir) {
//     var Player = require('./player.js')
//     var player = new Player.Player

//     var files = fs.readdirSync(dir);
//     for (var i in files) {
//         var path = dir + '/' + files[i];
//         console.log(path)
//         if (path.endsWith('.json')) {
//             player.play(dir + '/' + files[i]);
//         }
//     }
// }



function addnoise(dir){
      for(var i = 0; i < noise.actions.length; i++)
      {
        scenario.actions.splice(1,0,noise.actions[i]);

        var scenarioJson = JSON.stringify(JSON.parse(scenario.toJSON()),null,2);
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 0744);
        }
        var path = dir + '/noise'+i+'.json';

        if(fs.existsSync(path) ){
            fs.unlinkSync(path);
        }

            fs.writeFileSync(path, scenarioJson)
            scenario.actions.splice(1,1);
        }
} 

  