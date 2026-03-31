// Generated from: features/auth/user-registration.feature
import { test } from "../../../fixtures/pages.ts";

test.describe('User Registration', () => {

  test.beforeEach('Background', async ({ Given, homePage }, testInfo) => { if (testInfo.error) return;
    await Given('I am on the Automation Exercise home page', null, { homePage }); 
  });
  
  test.describe('A new user can register with valid details', () => {

    test('Successful registration with valid credentials', { tag: ['@ae01', '@auth', '@registration', '@ae01-1', '@smoke'] }, async ({ When, Then, And, homePage, loginPage }) => { 
      await And('I navigate to the registration page', null, { homePage }); 
      await Then('I should see the signup form', null, { loginPage }); 
      await When('I submit valid signup credentials', null, { loginPage }); 
      await Then('I should be on the account information setup page', null, { loginPage }); 
      await When('I complete the account information form', null, { loginPage }); 
      await And('I submit the registration', null, { loginPage }); 
      await Then('my account should be created successfully', null, { loginPage }); 
      await When('I click continue', null, { loginPage }); 
      await Then('I should be logged in as a registered user on the home page', null, { homePage }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('after', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features/auth/user-registration.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":15,"tags":["@ae01","@auth","@registration","@ae01-1","@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I am on the Automation Exercise home page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"And I navigate to the registration page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I should see the signup form","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I submit valid signup credentials","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should be on the account information setup page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I complete the account information form","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And I submit the registration","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then my account should be created successfully","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I click continue","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then I should be logged in as a registered user on the home page","stepMatchArguments":[]}]},
]; // bdd-data-end