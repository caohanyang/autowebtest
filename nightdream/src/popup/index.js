
import js from 'highlight-javascript'
import Highlight from 'syntax-highlighter'
import './index.css'

chrome.storage.sync.get('nightmare', function (res) {
  const el = document.querySelector('pre')
  const highlight = Highlight().use(js)
  el.innerText = JSON.stringify(JSON.parse(res.nightmare), null, 2)
  highlight.element(el)
})

const restart = document.getElementById('restart')
restart.addEventListener('click', function (event) {
  chrome.browserAction.setBadgeText({text: ''})
  chrome.runtime.reload()
  window.close()
})

const save = document.getElementById('save')
save.addEventListener('click', function (event) {
  const scenario = document.querySelector('pre').innerText
  setScenarioJSONLink(scenario)
})

function setScenarioJSONLink(scenario) {
	var link = document.getElementById('save');
	link.removeAttribute('href');
	link.removeAttribute('download');

	if (link.download !== undefined) { // feature detection
		// Browsers that support HTML5 download attribute
		var blob = new Blob([scenario], {
			type: 'application/json;charset=utf-8;'
		});
		var url = URL.createObjectURL(blob);

		// link.setAttribute('href', url);
		// link.setAttribute("download", 'scenario.json');
		//link.style = "visibility:hidden";
		chrome.downloads.download({
			url:      url,
			filename: 'scenario.json',
			saveAs:   true
			});
			count = 0;
		}

	if (navigator.msSaveBlob) { // IE 10+
		link.addEventListener('click', function(event) {
			var blob = new Blob([inscription2CSV(inscriptions)], {
				'type': 'text/csv;charset=utf-8;'
			});
			navigator.msSaveBlob(blob, 'inscriptions.csv');
		}, false);
	}
}
