const assert = require('assert')
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

const wat_action = require('wat-action');
const gotoAction = new wat_action.GotoAction('https://duckduckgo.com');
const typeAction = new wat_action.TypeAction('#search_form_input_homepage', 'github nightmare');
const clickAction = new wat_action.ClickAction('#search_button_homepage');
const waitAction = new wat_action.WaitAction('#r1-0 a.result__a');
const scenario = new wat_action.Scenario()
scenario.addAction(gotoAction)
scenario.addAction(waitAction)
scenario.addAction(typeAction)
scenario.addAction(clickAction)
scenario.addAction(waitAction)


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


// nightmare
//   .goto('https://www.amazon.fr/')
//   .click('a#nav-link-yourAccount > span.nav-line-2:nth-child(2)')
//   .click('div#a-page > div.a-container:nth-child(26) > div.a-section.ya-personalized:nth-child(1) > div.ya-card-row:nth-child(2) > div.ya-card-cell:nth-child(3) > a.ya-card__whole-card-link:nth-child(1) > div.a-box.ya-card--rich:nth-child(1) > div.a-box-inner:nth-child(1) > div.a-row:nth-child(1) > div.a-column.a-span9.a-span-last:nth-child(2) > h3.a-spacing-none.ya-card__heading--rich.a-text-normal:nth-child(1)')
//   .end()
//     .then(function (result) {
//       console.log(result)
//     })
//     .catch(function (error) {
//       console.error('Error:', error);
//     });



// const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: true })

// nightmare
//   .goto('https://www.amazon.fr/')
//   .click('a#nav-link-yourAccount > span.nav-line-1:nth-child(1)')
//   .click('div#a-page > div.a-container:nth-child(26) > div.a-section.ya-personalized:nth-child(1) > div.ya-card-row:nth-child(2) > div.ya-card-cell:nth-child(3) > a.ya-card__whole-card-link:nth-child(1) > div.a-box.ya-card--rich:nth-child(1) > div.a-box-inner:nth-child(1) > div.a-row:nth-child(1) > div.a-column.a-span9.a-span-last:nth-child(2) > h3.a-spacing-none.ya-card__heading--rich.a-text-normal:nth-child(1)')
//   .end()
//     .then(function (result) {
//       console.log(result)
//     })
//     .catch(function (error) {
//       console.error('Error:', error);
//     });

// const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: true })

// nightmare
//   .goto('https://www.amazon.fr/')
//   .click('#nav-link-yourAccount > SPAN:nth-child(1)')
//   .click('#a-page > DIV:nth-child(26) > DIV:nth-child(1) > DIV:nth-child(2) > DIV:nth-child(3) > A:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(2) > H3:nth-child(1)')
//   .end()
//     .then(function (result) {
//       console.log(result)
//     })
//     .catch(function (error) {
//       console.error('Error:', error);
//     });