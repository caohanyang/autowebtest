
function crawl(url,path){

	const Nightmare = require('nightmare');
	const htmlAnalysis = require('./htmlAnalysis.js');
	const watlib = require('wat-action');
	const fs = require('fs');
	const fsWrite = require('./fsWrite.js');

	var nightmare = new Nightmare({ show: false });
	// var url = 'http://www.labri.fr/';
	var urlcheck = 'https://www.joomla.com/';// this rul has checkboxs password
	var urlTextarea = 'https://translate.google.cn/'; // there is a textarea
	var scenario = new watlib.Scenario();
	// var path = __dirname + '/set_actions.json';
	// crawl(url,path);

	// nightmare.goto(url).wait(2000).screenshot()
	nightmare.goto(url).screenshot()
	.then(() => {
		return nightmare.evaluate(htmlAnalysis).end();
	}).then(analysisResult => {

		scenario.addAction(new watlib.GotoAction(analysisResult.URL));
		scenario.addAction(new watlib.ScrollToAction(100, 200));
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
		});

		analysisResult.selectorsA.forEach(selectorsA => {
			scenario.addAction(new watlib.ClickAction(selectorsA.selector));
		});

		analysisResult.inputToClick.forEach(inputToClick => {
			scenario.addAction(new watlib.ClickAction(inputToClick.selector));
		});

		scenarioJson = JSON.stringify(JSON.parse(scenario.toJSON()),null,2);

		fsWrite.writeFile(scenarioJson,path);

		
	}).catch(err => {
		console.log(err);
	});



}

exports.crawl = crawl;
