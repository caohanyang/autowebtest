const assert = require('assert');
const Nightmare = require('nightmare');
const wat_action = require('wat-action');
const fs = require('fs');

// var scenarioString = require('./scenario.json');
// const scenario = new wat_action.Scenario(scenarioString);
// const gotoAction = new wat_action.GotoAction('https://duckduckgo.com');
// const typeAction = new wat_action.TypeAction('#search_form_input_homepage', 'github nightmare');
// const clickAction = new wat_action.ClickAction('#search_button_homepage');
// const clickAction1 = new wat_action.ClickAction('body#pg-index > div.site-wrapper.site-wrapper--home.js-site-wrapper:nth-child(7) > div.onboarding-ed.js-onboarding-ed:nth-child(6) > div.onboarding-ed__slide.onboarding-ed__slide-1.js-onboarding-ed-slide.js-onboarding-ed-slide-1:nth-child(3) > div.onboarding-ed__content:nth-child(1) > div.js-onboarding-ed-button-small-1:nth-child(3) > a.btn.onboarding-ed__button-small.ddg-extension-hide:nth-child(1)');
// const waitAction = new wat_action.WaitAction('#r1-0 a.result__a');
// scenario.addAction(gotoAction);
// scenario.addAction(typeAction);
// scenario.addAction(clickAction);
// scenario.addAction(waitAction);


var dir = __dirname + '/noiseScenaio';
var jsonObject = { "in": {}, "out": {}};

describe('Test Scenarios', function() {
    
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var path = dir + '/' + files[i];
        if (path.endsWith('.json')) {
            // player.play(dir + '/' + files[i]);
            var scenarioString = require(path);
            const scenario = new wat_action.Scenario(scenarioString);
            // console.log(scenarioString)

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
        fs.writeFile('inAndOut.json', jsonString, function(err) {
           if(err) {
               console.log(err);
           } else {
               console.log("write success")
           }
        })
      });
});


function addToClassifier(transferString, option){
    var scenarioJson = JSON.parse(transferString);
    var action = scenarioJson.splice(1, 1)[0]
    console.log(action)

    if (option === "in") {
    console.log(action)
    classifierAction(action, jsonObject.in)
    } else if (option === "out") {
        classifierAction(action, jsonObject.out)
    }
    
}

function classifierAction(actionJSON, wholeJson) {
    switch (actionJSON.type) {
        case 'GotoAction':
            if (wholeJson.hasOwnProperty(actionJSON.type)) {
                wholeJson.GotoAction.push({"url": actionJSON.url});
            } else {
                wholeJson[actionJSON.type] = [];
                wholeJson.GotoAction.push({"url": actionJSON.url});
            }
            break;
        case 'ClickAction':
            if (wholeJson.hasOwnProperty(actionJSON.type)) {
                wholeJson.ClickAction.push({"selector": actionJSON.selector});
            } else {
                wholeJson[actionJSON.type] = [];
                wholeJson.ClickAction.push({"selector": actionJSON.selector});
            }
            break;
        case 'CheckAction':
            if (wholeJson.hasOwnProperty(actionJSON.type)) {
                wholeJson.CheckAction.push({"selector": actionJSON.selector});
            } else {
                wholeJson[actionJSON.type] = [];
                wholeJson.CheckAction.push({"selector": actionJSON.selector});
            }
            break;
        case 'MouseOverAction':
            if (wholeJson.hasOwnProperty(actionJSON.type)) {
                wholeJson.MouseOverAction.push({"selector": actionJSON.selector});
            } else {
                wholeJson[actionJSON.type] = [];
                wholeJson.MouseOverAction.push({"selector": actionJSON.selector});
            }
            break;
        case 'TypeAction':
            if (wholeJson.hasOwnProperty(actionJSON.type)) {
                wholeJson.TypeAction.push({"selector": actionJSON.selector, "text": actionJSON.text});
            } else {
                wholeJson[actionJSON.type] = [];
                wholeJson.TypeAction.push({"selector": actionJSON.selector, "text": actionJSON.text});
            }
            break;
        case 'ScrollToAction':
            if (wholeJson.hasOwnProperty(actionJSON.type)) {
                wholeJson.ScrollToAction.push({"x": actionJSON.x, "y": actionJSON.y});
            } else {
                wholeJson[actionJSON.type] = [];
                wholeJson.ScrollToAction.push({"x": actionJSON.x, "y": actionJSON.y});
            }
            break;
        case 'WaitAction':
            if (wholeJson.hasOwnProperty(actionJSON.type)) {
                wholeJson.WaitAction.push({"ms": actionJSON.ms});
            } else {
                wholeJson[actionJSON.type] = [];
                wholeJson.WaitAction.push({"ms": actionJSON.ms});
            }
            break;
        case 'BackAction':
            if (wholeJson.hasOwnProperty(actionJSON.type)) {
                wholeJson.BackAction.push();
            } else {
                wholeJson[actionJSON.type] = [];
                wholeJson.BackAction.push();
            }
            break;
    }
}
