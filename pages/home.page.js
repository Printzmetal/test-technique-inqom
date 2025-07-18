const data = require('../data/dataFile.json');

class HomePage {
  constructor(page) {
    this.page = page;
    this.getStayOptionCountryModalButton = page.getByTestId('country-banner-stay-button');
    this.getRefuseCookiesButton = page.getByRole('button', { name: 'Fermer sans accepter les' });
  }

  async goto() {
    await this.page.goto(data.baseUrl);
  }

  async isCountryModalVisible(timeout = 3000) {
    try {
      await this.getStayOptionCountryModalButton.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { HomePage };