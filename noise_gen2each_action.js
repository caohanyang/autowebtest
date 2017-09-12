var Nightmare = require('nightmare'); 
var nightmare = Nightmare({ show: true });
const wat_action = require('wat-action');
const fs = require('fs');
var co = require('co')

var scenarioString = require('./scenario.json');
var noiseAction = require('./set_actions.json');
var dircheck = __dirname + '/noiseScenaioCheck';
var dir = __dirname + '/noiseScenaio';


function checknoise(dircheck, noise){
    for(var i = 0; i < noise.actions.length; i++)
    {
      const scenario = new wat_action.Scenario(scenarioString);
      scenario.actions.splice(1,0,noise.actions[i]);

      var testAction = scenario.actions.splice(0,2);
    //   console.log(testAction)
      var scenarioJson = JSON.stringify(testAction,null,2);
      
      if (!fs.existsSync(dircheck)) {
          fs.mkdirSync(dircheck, 0744);
      }
      var path = dircheck + '/noise'+i+'.json';

      if(fs.existsSync(path) ){
          fs.unlinkSync(path);
         
      }
         fs.writeFileSync(path, scenarioJson)
    }
} 


function addnoise(dir, trueNoise){
    // console.log(trueNoise)
    for(var i = 0; i < trueNoise.actions.length; i++)
    {
      const scenario = new wat_action.Scenario(scenarioString);
      scenario.actions.splice(1,0,trueNoise.actions[i]);

      var scenarioJson = JSON.stringify(JSON.parse(scenario.toJSON()),null,2);
      
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, 0744);
      }
      var path = dir + '/noise'+i+'.json';

      if(fs.existsSync(path) ){
          fs.unlinkSync(path);
      }

          fs.writeFileSync(path, scenarioJson)
        //   scenario.actions.splice(1,1);
      }
} 

if (require.main === module) {

    var canAction = require('./tf_candidate.json');
    
    // const scenario = new wat_action.Scenario(scenarioString);
    const noise = new wat_action.Scenario(noiseAction);
    const trueNoise = new wat_action.Scenario(canAction.true);

    checknoise(dircheck, noise)
    
    addnoise(dir, trueNoise)
}

module.exports.addnoise = addnoise;
module.exports.checknoise = checknoise;