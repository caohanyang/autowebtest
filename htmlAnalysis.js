module.exports = function() {

    const CLICKABLE_TAGS = ['submit','reset','radio','file'];
    
    return {
        selectorsA: grabSelectorA(),
        checkbox: grabCheckbox(),
        inputText: grabInputText(),
        inputPassword: grabInputPassword(),
        inputToClick: grabInputToClick(),
        textarea: grabTextarea(),
    };

    function grabSelectorA() {
        var selectors = [];
        var sels = document.getElementsByTagName('a'); 
        for (var i = 0; i < sels.length; i++) {
            if (sels[i].href)
                selectors.push({
                    kind: "click",
                    selector: computeSelector(sels[i]),
                });
        }

        return selectors;
    }

    function grabCheckbox() {
        var selectors = [];
        var sels = document.getElementsByTagName('input');
        for (var i = 0; i < sels.length; i++) {
            if (sels[i].type == 'checkbox')
                selectors.push({
                    kind: "check",
                    selector: computeSelector(sels[i]),
                });
        }

        return selectors;
    }

    function grabInputText() {
        var selectors = [];
        var sels = document.getElementsByTagName('input');
        for (var i = 0; i < sels.length; i++) {
            if (sels[i].type == 'text')
                selectors.push({
                    kind: "type",
                    selector: computeSelector(sels[i]),
                });
        }

        return selectors;
    }

    function grabInputToClick() {
        var selectors = [];
        var sels = document.getElementsByTagName('input');
        for (var i = 0; i < sels.length; i++) {
            if (CLICKABLE_TAGS.indexOf(sels[i].type) !== -1){
                selectors.push({
                    kind: "click",
                    selector: computeSelector(sels[i]),
                });
            }

        }

        return selectors;
    }

    function grabInputPassword() {
        var selectors = [];
        var sels = document.getElementsByTagName('input');
        for (var i = 0; i < sels.length; i++) {
            if (sels[i].type == 'password')
                selectors.push({
                    kind: "type",
                    selector: computeSelector(sels[i]),
                });
        }

        return selectors;
    }

    function grabTextarea() {
        var selectors = [];
        var sels = document.getElementsByTagName('textarea');
        for (var i = 0; i < sels.length; i++) {
            if (sels[i])
                selectors.push({
                    kind: "type",
                    selector: computeSelector(sels[i]),
                });
        }

        return selectors;
    }

    function computeSelector(el) {
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

    // function getScenario(){
    //     analysisResult.inputText.forEach(inputText => {
    //         scenario.addAction(new watlib.TypeAction(inputText.selector,"inputText"));
    //     });

    //     analysisResult.inputPassword.forEach(inputPassword => {
    //         scenario.addAction(new watlib.TypeAction(inputPassword.selector,"inputPassword"));
    //     });

    //     analysisResult.textarea.forEach(textarea => {
    //         scenario.addAction(new watlib.TypeAction(textarea.selector,"textarea"));
    //     });

    //     analysisResult.checkbox.forEach(checkbox => {
    //         scenario.addAction(new watlib.CheckAction(checkbox.selector));
    //     });

    //     analysisResult.selectorsA.forEach(selectorsA => {
    //         scenario.addAction(new watlib.MouseOverAction(selectorsA.selector));
    //     });    // all the links for mouseover

    //     analysisResult.selectorsA.forEach(selectorsA => {
    //         scenario.addAction(new watlib.ClickAction(selectorsA.selector));
    //     });

    //     analysisResult.inputToClick.forEach(inputToClick => {
    //         scenario.addAction(new watlib.ClickAction(inputToClick.selector));
    //     });
    // }

};
