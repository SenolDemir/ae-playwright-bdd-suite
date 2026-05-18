import {Given,When,Then,expect,} from "../../../src/fixtures/ui.fixtures.ts";


When(
  "I click the {string} button on the Login\\/Signup page with script execution attempt",
  async ({ signupPage }, arg: string) => {
    signupPage.listenForScriptExecution();
    await signupPage.clickSignupButton();
  },
);

Then(
  "the browser should not execute any injected script",
  async ({ signupPage }) => {
    expect(signupPage.didScriptExecute()).toBe(false);
  },
);
