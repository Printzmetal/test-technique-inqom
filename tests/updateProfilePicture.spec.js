const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page.js');
const { LoginPage } = require('../pages/login.page.js');
const { ProfilePage } = require('../pages/profile.page.js');
const data = require('../data/dataFile.json');

test('Login and update profile picture', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);

  // Reach website's homepage and close pop-ups
  homePage.goto();
  await homePage.getRefuseCookiesButton.click();

  // Login with valid credentials 
  const loginResponsePromise = page.waitForResponse(response =>
    response.url().includes(data.loginSessionsRequest) && response.status() === 201
  );
  loginPage.userLogin();
  const loginResponse = await loginResponsePromise;
  const loginData = await loginResponse.json();
  loginPage.checkLoginResponse(loginData);  

  // Check dashboard page after login
  await profilePage.getCloseFinalizeProfileModalButton.click();
  await page.waitForURL(/\/fr\/me\/dashboard/);
  await expect(page).toHaveURL(/\/fr\/me\/dashboard/);

  // Reach profile edition
  await profilePage.getMySpaceHeaderButton.click();
  await profilePage.getProfileMenuItem.click();
    await page.waitForURL(/\/fr\/me\/profile/);
  await expect(page).toHaveURL(/\/fr\/me\/profile/);
  await profilePage.getEditProfileButton.click();

  // Load profile picture and check new value
  const updateResponsePromise = page.waitForResponse(response =>
    response.url().includes(data.profileRegistrationRequest) && response.status() === 200
  );
  await profilePage.setNewProfilePicture;
  await profilePage.getSubmitProfileEditionButton.click();
  const updateResponse = await updateResponsePromise;
  const updateData = await updateResponse.json();
  profilePage.checkProfileUpdateResponse(updateData);

  // Reload profile page and check profile picture in DOM
  const newAvatarUrl = updateData.user.avatar.thumb.url;
  await page.reload();
  const imgSrc = await profilePage.getProfilePicture.getAttribute('src');
  expect(imgSrc).toBe(newAvatarUrl);
});