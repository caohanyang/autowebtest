const Nightmare = require('nightmare');	
const nightmare = new Nightmare({show:true});
const wat_action = require('wat-action');
const fs = require('fs')
const path = require('path')

var scenarioString

if (process.argv.length <= 2) {
	scenarioString = require('./scenario.json')
} else {
	scenarioString = JSON.parse(fs.readFileSync(path.resolve(__dirname, process.argv[2])).toString())
}
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