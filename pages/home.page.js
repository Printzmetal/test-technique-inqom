const data = require('../data/dataFile.json');

class HomePage {
  constructor(page) {
    this.page = page;
    this.getLocalisationButton = page.getByTestId('country-banner-redirect-button');
    this.getCloseCountryModalButton = page.getByRole('button', { name: 'Close', exact: true });
    this.getRefuseCookiesButton = page.getByRole('button', { name: 'Fermer sans accepter les' });
  }

  async goto() {
    await this.page.goto(data.baseUrl);
  }

  async isCountryModalVisible(timeout = 3000) {
    try {
      await this.getLocalisationButton.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { HomePage };