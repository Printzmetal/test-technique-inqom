const data = require('../data/dataFile.json');

class HomePage {
  constructor(page) {
    this.page = page;
    this.getRefuseCookiesButton = page.getByRole('button', { name: 'Fermer sans accepter les' });
  }

  async goto() {
    await this.page.goto(data.baseUrl);
  }
}

module.exports = { HomePage };