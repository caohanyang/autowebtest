import Recorder from './recorder'
import each from 'component-each'
import os from 'component-os'
import * as watlib from 'wat-action'

class Nightdream {
  constructor () {
    this.isRunning = false
    this.recorder = new Recorder()
    this.scenario = new watlib.Scenario()
  }

  boot () {
    chrome.browserAction.onClicked.addListener(tab => {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        if (!this.isRunning) {
          this.recorder.startRecording()
          chrome.browserAction.setIcon({ path: 'images/icon-end.png', tabId: tab.id })
        } else {
          this.recorder.stopRecording()
          chrome.browserAction.setIcon({ path: 'images/icon-start.png', tabId: tab.id })
          const nightmare = this.parse(this.recorder.recording)
          chrome.storage.sync.set({ 'nightmare': nightmare })
          chrome.browserAction.setPopup({ popup: 'popup.html' })
          chrome.browserAction.setBadgeText({ text: '1' })
        }
        this.isRunning = !this.isRunning
      })
    })

    chrome.webNavigation.onCommitted.addListener(details => {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        if (this.isRunning) {
          chrome.browserAction.setIcon({ path: 'images/icon-end.png', tabId: tabs[0].id })
        }
      })
    })
  }
 
  parse (recording) {
    let newLine = '\n'
    if (os === 'windows') newLine = '\r\n'
    
    let result = [
      'const Nightmare = require(\'nightmare\')',
      `const nightmare = Nightmare({ show: true })${newLine}`,
      `nightmare${newLine}`
    ].join(newLine)

    for (var i = 0; i < recording.length; i++) {
      const type = recording[i][0]
      const content = recording[i][1]
      switch (type) {
        case 'goto':
          result += `  .goto('${content}')${newLine}`
          this.scenario.addAction(new watlib.GotoAction(content))
          break
        case 'click':
          result += `  .click('${content}')${newLine}`
          this.scenario.addAction(new watlib.ClickAction(content))
          break
        case 'type':
          const val = recording[i][2]
          result += `  .type('${content}', '${val}')${newLine}`
          this.scenario.addAction(new watlib.TypeAction(content, val))
          break
        case 'screenshot':
          result += `  .screenshot('${content}')${newLine}`
          break
        case 'reload':
          result += `  .refresh()${newLine}`
          break
        case 'evaluate':
          const textEl = `    return document.querySelector('${content}').innerText`

          result += [
            '    .evaluate(function () {',
            textEl,
            '    }, function (text) {',
            '      console.log(text)',
            `    })${newLine}`
          ].join(newLine)

          break
        default:
          console.log('Not a valid nightmare command')
      }
    }

    console.log(this.scenario)

    result +=

    `  .end()
    .then(function (result) {
      console.log(result)
    })
    .catch(function (error) {
      console.error('Error:', error);
    });${newLine}`

    result += this.scenario.toJSON()

    // return result
    return this.scenario.toJSON()
  }

}

export default Nightdream
