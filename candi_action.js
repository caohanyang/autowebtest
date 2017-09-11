const Nightmare = require('nightmare');
const htmlAnalysis = require('./htmlAnalysis.js');
const watlib = require('wat-action');
const fs = require('fs');

var nightmare = new Nightmare({ show: this.show });
var url = 'https://www.amazon.fr/';
var urlcheck = 'https://www.joomla.com/';// this rul has checkboxs password
var urlTextarea = 'https://translate.google.cn/'; // there is a textarea
var scenario = new watlib.Scenario();

// nightmare.goto(url).wait(2000).screenshot()
nightmare.goto(url).screenshot()
.then(() => {
	return nightmare.evaluate(htmlAnalysis).end();
}).then(analysisResult => {

	scenario.addAction(new watlib.GotoAction(url));
	scenario.addAction(new watlib.ScrollToAction(0, 10));
	scenario.addAction(new watlib.WaitAction(1000));
	scenario.addAction(new watlib.BackAction());
	

	analysisResult.inputText.forEach(inputText => {
		scenario.addAction(new watlib.TypeAction(inputText.selector,"inputText"));
	});

	analysisResult.inputPassword.forEach(inputPassword => {
		scenario.addAction(new watlib.TypeAction(inputPassword.selector,"inputPassword"));
	});

	analysisResult.textarea.forEach(textarea => {
		scenario.addAction(new watlib.TypeAction(textarea.selector,"textarea"));
	});

	analysisResult.checkbox.forEach(checkbox => {
		scenario.addAction(new watlib.CheckAction(checkbox.selector));
	});

	analysisResult.selectorsA.forEach(selectorsA => {
		scenario.addAction(new watlib.MouseOverAction(selectorsA.selector));
    });// all the links for mouseover

	analysisResult.selectorsA.forEach(selectorsA => {
		scenario.addAction(new watlib.ClickAction(selectorsA.selector));
	});

	analysisResult.inputToClick.forEach(inputToClick => {
		scenario.addAction(new watlib.ClickAction(inputToClick.selector));
	});

	scenarioJson = JSON.stringify(JSON.parse(scenario.toJSON()),null,2);

	console.log(scenarioJson);

	var path = __dirname + '/set_actions.json';

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


}).catch(err => {
    	console.log(err);
    });