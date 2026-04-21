
# bdd-planner-agent prompt template
According to the test case below, explore product page of https://www.automationexercise.com
Create all relevant Gherkin test scenarios according to the given scenario type below and save them in the feature file named product-catalog.feature under `features/_review/`.
Scenario type: BOTH (positive and negative)

Test Case: Verify All Products and product detail page

Navigate to url 'http://automationexercise.com'
Verify that home page is visible successfully
Click on 'Products' button
Verify user is navigated to ALL PRODUCTS page successfully
The products list is visible
Click on 'View Product' of first product
User is landed to product detail page
Verify that detail is visible: product name, category, price, availability, condition, brand

Instructions:

Use exact messages and observed browser behavior for Then steps.
Follow project Gherkin and tagging conventions.
Do not generate step definitions or implementation code—only the feature file.


# bdd-generator-agent runtime prompt template
Read the feature file at the path below and generate or extend Playwright page object classes (locators and methods) accordingly.

Feature file: features/...
Follow all rules in copilot-instructions.md and .github/prompts/auth-login.prompt.md.
Inventory existing page objects, fixtures, and test data factories before generating code. Extend existing files if possible, do not duplicate.
Only update files in pages/, fixtures/testbase.ts, and test-data/ as needed. Do not generate step definitions or feature files.
Provide a summary report of changes and locator confidence.