const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://www.amazon.fr/')
  .click('input#twotabsearchtextbox')
  .click('a#nav-your-amazon')
  .click('div#nav-xshop > a.nav-a:nth-child(4)')
  .end()
    .then(function (result) {
      console.log(result)
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
