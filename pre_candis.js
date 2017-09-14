const Nightmare = require('nightmare');
// const nightmare = new Nightmare({show:true});
const wat_action = require('wat-action');
const scenario_str = require('./scenario.json');
var scenario_ini = new wat_action.Scenario(scenario_str);
// const htmlAnalysis = require('./htmlAnalysis.js');
// const fsWrite = require('./fsWrite.js');
var candi_action = require('./candi_action.js');


var assert = require('assert');
describe('ScenarionToArray', function() {

	scenario_ini.actions.forEach(function(item,index){

		describe('Running scenario '+ index, function() {

			this.timeout(40000);
			it('should play the scenario', function(done) {

				var nightmare = new Nightmare({show:true});
				var scenario = new wat_action.Scenario(scenario_str);
				scenario.actions.splice(index+1,scenario_ini.actions.length-index+1);	

				scenario.attachTo(nightmare)
				.url()
				.end()
				.then((url) => {
					console.log(url);
					candi_action.crawl(url, __dirname + '/set_actions/set_actions'+index+'.json');
					
				})
				.then((url)=>{
					assert(true);
					done();
				})
				.catch ( (e) => {
					try {
						assert.equal(false);
						done();
					}
					catch (e) {
						done(e);
					}
				});

			});
		});

	});

});







