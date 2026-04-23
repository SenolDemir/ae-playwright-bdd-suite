
# bdd-planner-agent prompt template

## Feature
Product Catalog

## Entry Point
<!-- Navigation path relative to the base URL -->
/product

## Scenario Type
BOTH

## Charter
In scope:
- All products are displayed on the products page
- When a product is chosen, product details can be displayed

Out of scope:
- Adding a product to the cart
- Wishlist functionality
- Search and filter behavior
- Any flow that requires authentication

## Specific Cases to Cover
- Verify that each product card shows name, price, and image
- Verify that clicking a product navigates to its detail page
- Verify that the detail page displays the correct product name, price, category, and availability
- Check behavior when navigating back to the product listing from a detail page

## Output Filename
products-catalog-raw.feature


<!----------- end ---------------->


# bdd-generator-agent runtime prompt template
Read the feature file at the path below and generate or extend Playwright page object classes (locators and methods) accordingly.

Feature file: features/...
Follow all rules in copilot-instructions.md and .github/prompts/auth-login.prompt.md.
Inventory existing page objects, fixtures, and test data factories before generating code. Extend existing files if possible, do not duplicate.
Only update files in pages/, fixtures/testbase.ts, and test-data/ as needed. Do not generate step definitions or feature files.
Provide a summary report of changes and locator confidence.