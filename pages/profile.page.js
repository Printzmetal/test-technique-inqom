const { expect } = require('@playwright/test');
const data = require('../data/dataFile.json');

class ProfilePage {
  constructor(page) {
    this.page = page;
    this.getCloseFinalizeProfileModalButton = page.getByTestId('finalize-profile-close-modal');
    this.getMySpaceHeaderButton = page.getByTestId('header-user-links-toggle');
    this.getProfileMenuItem = page.getByRole('menuitem', { name: ' Profil' });
    this.getEditProfileButton = page.getByTestId('edit-profile-information-button');
    this.setNewProfilePicture = page.setInputFiles('input[type="file"]', data.profilePicturePath);
    this.getSubmitProfileEditionButton = page.getByTestId('account-edit-button-submit');
    this.getProfilePicture = page.getByTestId('block_item_photo-de-profil').locator('img');
  }

  async checkProfileUpdateResponse(updateData) {
    expect(updateData).toHaveProperty(data.profileAvatarProperty);
    expect(updateData.user.avatar.url).toMatch(/^https:\/\/cdn-images\.welcometothejungle\.com/);
  }
}

module.exports = { ProfilePage };