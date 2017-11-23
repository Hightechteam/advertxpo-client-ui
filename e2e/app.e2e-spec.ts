import { AdvertxpoClientPage } from './app.po';

describe('advertxpo-client App', () => {
  let page: AdvertxpoClientPage;

  beforeEach(() => {
    page = new AdvertxpoClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
