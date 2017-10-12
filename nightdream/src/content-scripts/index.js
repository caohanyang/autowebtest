import cssPath from 'css-path'
import each from 'component-each'
import { select } from 'optimal-select';

detect('click')
detect('keydown')
detect('copy')

function detect (listener) {
  if (listener === 'copy') return copyText()

  const els = document.querySelectorAll('body')
  each(els, function (el) {
    el.addEventListener(listener, function (event) {
      if (listener === 'click') handle('click', event.target)
      // if (listener === 'keydown' && event.keyCode === 9) handle('type', event.target)
      if (listener === 'keydown' && event.keyCode === 17) handle('type', event.target)
    })
  })
};

function copyText () {
  window.onkeydown = function (event) {
    if (event.keyCode === 67 && event.ctrlKey) {
      const selObj = window.getSelection()
      handle('evaluate', selObj.focusNode)
    }
  }
};

function handle (event, node) {
  if (chrome && chrome.runtime) {
    // const path = cssPath(node)
    const path = computeSelector(node)
    const message = [event, path]
    message.push(node.value)
    chrome.runtime.sendMessage(message)
  }
};

// function computeSelector(el) {
//   var names = [];
//   while (el.parentNode) {
//     if (el.id) {
//       names.unshift(`#${el.id}`);
//       break;
//     } else {
//       if (el == el.ownerDocument.documentElement)
//         names.unshift(el.tagName);
//       else {
//         for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
//           names.unshift(`${el.tagName}:nth-child(${c})`);
//       }
//       el = el.parentNode;
//     }
//   }
//   return names.join(' > ');
// }

function computeSelector(el) {
  return {
      watId: computeSelectorWithID(el),
      watPath: computeSelectorWithPath(el),
      optimal: computeSelectorOptimal(el)
  };
}

function computeSelectorWithID(el) {
  var names = [];
  while (el.parentNode) {
    if (el.id) {
      names.unshift(`#${el.id}`);
      break;
    } else {
      if (el == el.ownerDocument.documentElement)
        names.unshift(el.tagName);
      else {
        for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
          names.unshift(`${el.tagName}:nth-child(${c})`);
      }
      el = el.parentNode;
    }
  }
  return names.join(' > ');
}

function computeSelectorWithPath(el) {
  var names = [];
  while (el.parentNode) {
    if (el == el.ownerDocument.documentElement)
      names.unshift(el.tagName);
    else {
      for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
        names.unshift(`${el.tagName}:nth-child(${c})`);
    }
    el = el.parentNode;
  }
  return names.join(' > ');
}

function computeSelectorOptimal(el) {
  return select(el);
}




