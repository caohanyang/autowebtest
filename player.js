const Nightmare = require('nightmare');	
const nightmare = new Nightmare({show:true});
const wat_action = require('wat-action');


var scenarioString = require('./scenario.json');
const scenario = new wat_action.Scenario(scenarioString)

scenario.attachTo(nightmare)
.evaluate(function () {
    return document;
})
.end()
.then((doc) => {
    //...
})
.catch ( (e) => {
    //...
});