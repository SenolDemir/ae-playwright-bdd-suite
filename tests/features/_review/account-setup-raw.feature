# Exploration Map
# ==================================================================================
# URL:        https://www.automationexercise.com/signup
# Entry path: /login → fill Step 1 Signup form → redirect to /signup
#
# INTERACTIVE ELEMENTS DISCOVERED
# --- Section 1: Enter Account Information ---
# - Title             radio: Mr. | Mrs.            (id: id_gender1, id_gender2) | optional
# - Name              text input                   (id: name)                   | required, pre-filled from signup step
# - Email             text input                   (id: email, DISABLED)        | required, pre-filled, cannot be edited
# - Password          password input               (id: password)               | required
# - Date of Birth     3 dropdowns: Day / Month / Year                           | all optional, no validation
# - Newsletter        checkbox                     (id: newsletter)             | optional
# - Special offers    checkbox                     (id: optin)                  | optional
# --- Section 2: Address Information ---
# - First name        text input                   (id: first_name)             | required
# - Last name         text input                   (id: last_name)              | required
# - Company           text input                   (id: company)                | optional
# - Address           text input                   (id: address1)               | required
# - Address 2         text input                   (id: address2)               | optional
# - Country           select: India (default) / United States / Canada / ...    | required, default always satisfies constraint
# - State             text input                   (id: state)                  | required
# - City              text input                   (id: city)                   | required
# - Zipcode           text input                   (id: zipcode)                | required
# - Mobile Number     text input                   (id: mobile_number)          | required
# - Create Account    submit button
#
# STATES OBSERVED
# - Default state:     Name and Email pre-filled; all other required fields empty
# - Field-level error: Required field empty → browser native tooltip "Please fill in this field."
# - Form blocked:      First invalid field in DOM order receives focus/tooltip; form stays on /signup
# - Country field:     Always has "India" pre-selected; required check always passes via normal UI
#
# VALIDATION MECHANISM (confirmed via DOM inspection)
# - HTML5 native required check only — no custom JS validation layer
# - No minLength / maxLength / pattern constraints on ANY text field
# - type="text" for Name, First name, Last name, Address, State, City, Zipcode, Mobile Number
# - type="password" for Password (no pattern)
# - type="select-one" for Country, Day, Month, Year
# - Server-side format validation: UNKNOWN — could not be verified without completing registration flow
#
# NAVIGATION PATHS
# - /login → (signup form) → POST /signup → account setup page
# - Successful submission → account created confirmation
# - Failed HTML5 validation → stays on /signup (no navigation)
#
# DATA SOURCES
# - Name, Email: session data from Step 1 signup form (static once passed)
# - Country options: static list
# - Date of Birth year range: 1900–2021 (static dropdown options)
# ==================================================================================

@ui @auth @registration
Feature: Account Information Setup Negative Validation
  As a system administrator
  I want the account information setup form to reject invalid input data
  So that only valid user accounts are created and security is maintained

  Background:
    Given I am on the Automation Exercise home page
    And I navigate to "Signup / Login" page
    Then I should see the signup form
    When I submit valid signup credentials
    Then I should be on the account information setup page

  # ==================================================================================
  # Rule: Password field must not be empty
  # Observed: ONLY the HTML5 required check is enforced.
  # No minimum length, no complexity pattern (uppercase/number/special char) enforced client-side.
  # Any non-empty string — including a single character — passes HTML5 validation.
  # ==================================================================================

  Rule: Password field must not be empty

    @negative
    Scenario: Registration is rejected when password field is left empty
      When I complete the account information form with valid data
      And I leave the "password" field empty
      And I submit the registration
      Then I should see the "password" field error message "Please fill in this field."

  # ==================================================================================
  # Rule: Name field must not be empty
  # Observed: Name is pre-filled from Step 1. Clearing it triggers required validation.
  # NOTE: Whitespace-only input ("   ") BYPASSES the HTML5 required check —
  # the form does NOT reject whitespace-only strings (no server-side check observable).
  # ==================================================================================

  Rule: Name field must not be empty

    @negative
    Scenario: Registration is rejected when the name field is cleared
      When I complete the account information form with valid data
      And I leave the "name" field empty
      And I submit the registration
      Then I should see the "name" field error message "Please fill in this field."

  # ==================================================================================
  # Rule: All required address information fields must be filled
  # Observed:
  # - Eight address fields carry the HTML5 required attribute
  # - ALL share the same single validation rule: not empty
  # - Error message is identical for every field: "Please fill in this field."
  # - Country is required but always has default "India" selected — cannot fail via UI
  # - No format constraint on any field:
  #     Mobile Number (type=text, no pattern) — accepts non-numeric characters
  #     Zipcode (type=text, no pattern) — accepts alphabetic characters
  #     State / City (type=text) — accept any string
  # ==================================================================================

  Rule: All required address information fields must be filled

    @negative
    Scenario Outline: Registration is rejected when a required address field is left empty
      When I complete the account information form with valid data
      And I leave the "<field>" field empty
      And I submit the registration
      Then I should see the "<field>" field error message "Please fill in this field."

      Examples:
        | field         |
        | first name    |
        | last name     |
        | address       |
        | state         |
        | city          |
        | zipcode       |
        | mobile_number |

  # ==================================================================================
  # Rule: Whitespace-only input bypasses required field validation
  # Observed: The HTML5 required check treats whitespace-only strings as non-empty.
  # A name or address field filled with spaces only ("   ") does NOT trigger
  # "Please fill in this field." — the form considers these fields satisfied.
  # This is a client-side gap; server-side behaviour is unverified.
  # NEW STEP REQUIRED: "I enter whitespace only in the {string} field"
  # ==================================================================================

  Rule: Required text fields must reject whitespace-only input

    @negative @wip
    Scenario Outline: Registration should be rejected when a required text field contains only spaces
      When I complete the account information form with valid data
      And I enter whitespace only in the "<field>" field
      And I submit the registration
      Then I should see the "<field>" field error message "Please fill in this field."

      Examples:
        | field      |
        | name       |
        | first name |
        | last name  |
        | address    |
        | state      |
        | city       |
        | zipcode    |

  # ==================================================================================
  # Rule: Mobile Number field must accept only numeric input
  # Observed: type=text, no pattern attribute — HTML5 does NOT enforce numeric format.
  # The browser accepts alphabetic characters ("ABCDEFG") without any validation error.
  # Server-side format validation is UNVERIFIED (not testable without completing registration).
  # ==================================================================================

  Rule: Mobile Number field must accept only valid numeric input

    @negative @wip
    Scenario Outline: Registration should be rejected when mobile number contains non-numeric characters
      When I complete the account information form with valid data
      And I enter "<mobile_input>" in the "mobile_number" field
      And I submit the registration
      Then I should see the "mobile_number" field error message "<expected_error>"

      Examples:
        | mobile_input   | expected_error                          | description                              |
        | ABCDEFGH       | error message to be confirmed           | alphabetic characters only               |
        | 123-456-789    | error message to be confirmed           | dashes in phone number                   |
        | +1 800 000 000 | error message to be confirmed           | international format with spaces         |
        | 123 456 789    | error message to be confirmed           | spaces in phone number                   |
