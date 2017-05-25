import { AngularApolloLodashDemoPage } from './app.po';

describe('angular-apollo-lodash-demo App', () => {
  let page: AngularApolloLodashDemoPage;

  beforeEach(() => {
    page = new AngularApolloLodashDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
