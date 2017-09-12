const assert = require('assert');
const Nightmare = require('nightmare');
const wat_action = require('wat-action');
const fs = require('fs');
const noise_gen = require('./noise_gen2each_action.js');
var noiseAction = require('./set_actions.json');

var dir = __dirname + '/noiseScenario';
var filename = 'inAndOut.json';
var jsonObject = { "in": [], "out": []};

var checkDir = __dirname + '/noiseScenarioCheck';
var checkFile = 'tf_candidate.json';
var checkObject = { "true": [], "false": []};

const noise = new wat_action.Scenario(noiseAction);

// check all noises
noise_gen.checknoise(checkDir, noise);

describe('Check avaliable actions', function() {
    
    var files = fs.readdirSync(checkDir);
    for (var i in files) {
        var path = checkDir + '/' + files[i];
        if (path.endsWith('.json')) {
            var scenarioString = require(path);
            const scenario = new wat_action.Scenario(scenarioString);

            describe('Running check scenario ' + i, function() {
                
                this.timeout(40000);
                it('should play the scenario', function(done) {
                    var nightmare = new Nightmare({show:false});
                    var transferString = scenario.toJSON();
                    scenario.attachTo(nightmare)
                            .evaluate(function() {
                                return document;
                            })
                            .end()
                            .then((href) => {
                                assert(true);
                                addToAvaliable(transferString, "true");
                                done();
                            })
                            .catch( (e) => {
                                try {
                                    assert.equal(false);
                                    done();
                                }
                                catch (e) {
                                    addToAvaliable(transferString, "false");
                                    done(e);
                                }
                            })
                })
                
            })
        }
    }

    after(function() {
        // runs after all tests in this block
        var jsonString = JSON.stringify(checkObject,null,2)
        fs.writeFile(checkFile, jsonString, function(err) {
           if(err) {
               console.log(err);
           } else {
               console.log("write success")
           }
        })
        // generate avaliable noise
        const trueNoise = new wat_action.Scenario(checkObject.true);

        noise_gen.addnoise(dir, trueNoise);

        describe('Test Scenarios', function() {
            
            var files = fs.readdirSync(dir);
            for (var i in files) {
                var path = dir + '/' + files[i];
                if (path.endsWith('.json')) {
                    var scenarioString = require(path);
                    const scenario = new wat_action.Scenario(scenarioString);
        
                    describe('Running scenario ' + i, function() {
                        
                        this.timeout(40000);
                        it('should play the scenario', function(done) {
                            var nightmare = new Nightmare({show:false});
                            var transferString = scenario.toJSON();
                            scenario.attachTo(nightmare)
                                    .evaluate(function() {
                                        return document;
                                    })
                                    .end()
                                    .then((href) => {
                                        assert(true);
                                        addToClassifier(transferString, "in");
                                        done();
                                    })
                                    .catch( (e) => {
                                        try {
                                            assert.equal(false);
                                            done();
                                        }
                                        catch (e) {
                                            addToClassifier(transferString, "out");
                                            done(e);
                                        }
                                    })
                        })
                        
                    })
                }
            }
        
            after(function() {
                // runs after all tests in this block
                var jsonString = JSON.stringify(jsonObject,null,2)
                fs.writeFile(filename, jsonString, function(err) {
                   if(err) {
                       console.log(err);
                   } else {
                       console.log("write success")
                   }
                })
              });
        });
        
 });

});






  
function addToClassifier(transferString, option){
    var scenarioJson = JSON.parse(transferString);
    var action = scenarioJson.splice(1, 1)[0]

    if (option === "in") {
        jsonObject.in.push(action);
    } else if (option === "out") {
        jsonObject.out.push(action);
    }
    
}

function addToAvaliable(transferString, option){
    var scenarioJson = JSON.parse(transferString);
    var action = scenarioJson.splice(1, 1)[0]
    console.log(action)

    if (option === "true") {
        checkObject.true.push(action);
    } else if (option === "false") {
        checkObject.false.push(action);
    }
    
} 

// function classifierAction(actionJSON, wholeJson) {
//     switch (actionJSON.type) {
//         case 'GotoAction':
//             if (wholeJson.hasOwnProperty(actionJSON.type)) {
//                 wholeJson.GotoAction.push({"url": actionJSON.url});
//             } else {
//                 wholeJson[actionJSON.type] = [];
//                 wholeJson.GotoAction.push({"url": actionJSON.url});
//             }
//             break;
//         case 'ClickAction':
//             if (wholeJson.hasOwnProperty(actionJSON.type)) {
//                 wholeJson.ClickAction.push({"selector": actionJSON.selector});
//             } else {
//                 wholeJson[actionJSON.type] = [];
//                 wholeJson.ClickAction.push({"selector": actionJSON.selector});
//             }
//             break;
//         case 'CheckAction':
//             if (wholeJson.hasOwnProperty(actionJSON.type)) {
//                 wholeJson.CheckAction.push({"selector": actionJSON.selector});
//             } else {
//                 wholeJson[actionJSON.type] = [];
//                 wholeJson.CheckAction.push({"selector": actionJSON.selector});
//             }
//             break;
//         case 'MouseOverAction':
//             if (wholeJson.hasOwnProperty(actionJSON.type)) {
//                 wholeJson.MouseOverAction.push({"selector": actionJSON.selector});
//             } else {
//                 wholeJson[actionJSON.type] = [];
//                 wholeJson.MouseOverAction.push({"selector": actionJSON.selector});
//             }
//             break;
//         case 'TypeAction':
//             if (wholeJson.hasOwnProperty(actionJSON.type)) {
//                 wholeJson.TypeAction.push({"selector": actionJSON.selector, "text": actionJSON.text});
//             } else {
//                 wholeJson[actionJSON.type] = [];
//                 wholeJson.TypeAction.push({"selector": actionJSON.selector, "text": actionJSON.text});
//             }
//             break;
//         case 'ScrollToAction':
//             if (wholeJson.hasOwnProperty(actionJSON.type)) {
//                 wholeJson.ScrollToAction.push({"x": actionJSON.x, "y": actionJSON.y});
//             } else {
//                 wholeJson[actionJSON.type] = [];
//                 wholeJson.ScrollToAction.push({"x": actionJSON.x, "y": actionJSON.y});
//             }
//             break;
//         case 'WaitAction':
//             if (wholeJson.hasOwnProperty(actionJSON.type)) {
//                 wholeJson.WaitAction.push({"ms": actionJSON.ms});
//             } else {
//                 wholeJson[actionJSON.type] = [];
//                 wholeJson.WaitAction.push({"ms": actionJSON.ms});
//             }
//             break;
//         case 'BackAction':
//             if (wholeJson.hasOwnProperty(actionJSON.type)) {
//                 wholeJson.BackAction.push();
//             } else {
//                 wholeJson[actionJSON.type] = [];
//                 wholeJson.BackAction.push();
//             }
//             break;
//     }
// }