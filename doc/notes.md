
# known limitations

### API tests fail in GitHub Actions with "Unexpected token '<' ... is not valid JSON"
- Symptom: `response.json()` throws because the body is an HTML page
  (`<!DOCTYPE ...`) instead of the expected JSON, on every test/retry in a run.
- Root cause: `automationexercise.com` sits behind bot/WAF protection that
  blocks known datacenter/cloud IP ranges (including GitHub-hosted runners), serving an HTML challenge/block page instead of the API response. This is IP-reputation based, not transient, so retries don't help.
- Not a regression in test code or app behavior — the same tests pas locally from a residential/office IP.

### Signup entry form validation (name/email)
- Special characters and very long values in the NAME field are accepted (no validation).
- Client-side validation is minimal; most validation is enforced server-side.
- A failed submission is only indicated by remaining on the current page — only the duplicate-email case has an explicit error message.

### Signup account information form validation
- Password field only enforces "not empty" — none of the standard NIST SP 800-63B / OWASP password rules are implemented server-side:
  - minimum length (typically 8 characters)
  - maximum length (typically 64–128 characters)
  - complexity (uppercase, lowercase, number, special character)
  - no spaces
- Title field is optional (no `required` attribute).
- Date of birth field is optional with no validation rules.
- Name field only enforces "not empty"; no other validation rules.
- Mobile number field accepts non-numeric input — it's a plain `type=text` input with no `pattern` attribute, so numeric format isn't enforced.



# tags
@ui @smoke         → Quick sanity suite
@api @smoke        → API sanity
@ui @regression    → Full UI regression
@api @regression   → Full API regression
@auth              → Auth-specific runs		
@positive
@negative          → Negative test suite
@wip               → Work in progress (excluded from CI)


# branch naming
feature/ui01-signup-form


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


<!------------------------ end -------------------------->


# bdd-generator-agent runtime prompt template
Read the feature file at the path below and generate or extend Playwright page object classes (locators and methods) accordingly.

Feature file: features/...
Follow all rules in copilot-instructions.md and .github/prompts/auth-login.prompt.md.
Inventory existing page objects, fixtures, and test data factories before generating code. Extend existing files if possible, do not duplicate.
Only update files in pages/, fixtures/ui-fixtures.ts, and data/ as needed. Do not generate step definitions or feature files.
Provide a summary report of changes and locator confidence.


# playwright-test-healer.agent runtime prompt
Debug and fix the scenario tagged with @ae04-1 in product-catalog.feature


<!------------------------ end -------------------------->


# debugger prompt template (with tags < >)

<error_context>
[chrome] › .features-gen/features/product/product-catalog.feature.spec.js:12:5 
Test: View all products and product details successfully
Tags: @product @positive @wip
</error_context>

<failure_message>
Error: expect(received).toBe(expected)
Expected: "Women > Tops"
Received: "Category: Women > Tops"
</failure_message>

<source_code>
at ../pages/ProductDetailPage.ts:84
82 |  for (const [field, value] of Object.entries(expected)) {
83 |    const actual = await this.getProductDetailFieldValue(field);
84 >    expect(actual).toBe(value);
85 |  }
</source_code>

<!-------------------------------------------------------->



`types` - domain or test-data structures used across the suite
`api-models` - API boundary contracts, endpoint-specific payloads,