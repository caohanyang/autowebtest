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

describe('Test Scenarios', function() {
    
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var path = dir + '/' + files[i];
        if (path.endsWith('.json')) {
            // player.play(dir + '/' + files[i]);
            var scenarioString = require(path);
            const scenario = new wat_action.Scenario(scenarioString);
            console.log(scenarioString)
            
            describe('Running scenario ' + i, function() {
                this.timeout(40000);
                it('should play the scenario', function(done) {
                    
                    var nightmare = new Nightmare({show:true});
                    scenario.attachTo(nightmare)
                            .evaluate(function() {
                                return document;
                            })
                            .end()
                            .then((href) => {
                                assert(true);
                                done();
                            })
                            .catch( (e) => {
                                try {
                                    assert.equal(false);
                                    done();
                                }
                                catch (e) {
                                    done(e);
                                }
                            })
                })
            })
        }
    }
    

});