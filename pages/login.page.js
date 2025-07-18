const { expect } = require('@playwright/test');
const data = require('../data/dataFile.json');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.getLoginHeaderButton = page.getByTestId('not-logged-visible-login-button');
    this.getLoginEmailField = page.getByTestId('login-field-email');
    this.getLoginPasswordField = page.getByTestId('login-field-password');
    this.getLoginSubmitButton = page.getByTestId('login-button-submit');
  }

  async userLogin() {
    await this.getLoginHeaderButton.click();
    await this.getLoginEmailField.click();
    await this.getLoginEmailField.fill(data.emailAddress);
    await this.getLoginPasswordField.click();
    await this.getLoginPasswordField.fill(data.loginPassword);
    await this.getLoginSubmitButton.click();
  }

  async checkLoginResponse(loginData) {
    expect(loginData).toHaveProperty(data.tokenProperty);
    expect(loginData.user.token).toBeTruthy();
    expect(loginData).toHaveProperty(data.firstnameProperty, data.userFirstname);
  }
}

module.exports = { LoginPage };