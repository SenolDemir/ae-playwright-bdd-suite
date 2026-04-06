
@ae02 @auth @registration @negative
Feature: User Registration - Negative Scenarios
      As a system
      I want to validate user input comprehensively during registration
      So that invalid, malicious, or edge case data is properly rejected

      Background:
            Given I am on the Automation Exercise home page
            And I navigate to the registration page
            Then I should see the signup form

      # =================================================================================
      # Rule: Email Format Validation
      # Format Validation:  A valid email address is required to register
      # Boundary Validation: Email field must handle boundary cases and edge conditions
      # Security Validation: Email field must prevent security injection attacks
      # Already registered email validation: An email address can only be used for one account
      # =================================================================================


      Rule: A valid email address is required to register

            @ae02-1 @hcritical
            Scenario Outline: Reject registration with invalid email format
                  When I submit signup form with invalid email format "<invalid_email_pattern>"
                  Then I should see error about invalid email format
                  And I should remain on the signup form

                  Examples:
                        | invalid_email_pattern   |
                        | missing_domain          |
                        | missing_local           |
                        | missing_at              |
                        | multiple_at             |
                        | missing_tld             |
                        | space_local             |
                        | space_domain            |
                        | consecutive_dots_local  |
                        | consecutive_dots_domain |
                        | leading_dot_local       |
                        | trailing_dot_local      |
                        | leading_hyphen_domain   |
                        | trailing_hyphen_domain  |

      Rule: An email address can only be used for one account

            Scenario: Reject registration with an already registered email
                  When I submit signup form with existing email "existing@example.com"
                  Then I should see error about existing email
                  And I should remain on the signup form

      Rule: Email field must handle boundary cases and edge conditions

            @ae02-2 @high
            Scenario Outline: Reject registration with email that have boundary conditions
                  When I submit signup form with email that have "<boundary_condition>"
                  Then I should see appropriate validation error
                  And I should remain on the signup form

                  Examples:
                        | boundary_condition |
                        | empty_value        |
                        | spaces_only        |
                        | numbers_only       |
                        | symbols_only       |
                        | too_short          |
                        | too_long           |


      Rule: Email field must prevent harmful content and security injection attacks

            @ae02-3 @high @security
            Scenario Outline: Reject registration with harmful content
                  When I submit signup form with harmful content as "<harmful_content>"
                  Then I should see error about invalid email format
                  And I should remain on the signup form

                  Examples:
                        | harmful_content                  |
                        | '; DROP TABLE users; --@test.com |

            # NOTE: harmful input tests are limited example for demonstration purposes only





            # =================================================================================
            # Rule: Name Field Validation
            # =================================================================================

      Rule: Name field must accept valid names and reject invalid input

            @ae02-04 @high
            Scenario Outline: Reject registration with invalid name
                  Given I navigate to the registration page
                  Then I should see the signup form
                  When I submit signup form with name "<invalid_name>" and valid email
                  Then I should see error about invalid name
                  And I should remain on the signup form

            @ae02-04 @high
            Scenario Outline: Reject registration with invalid name
                  Given I navigate to the registration page
                  Then I should see the signup form
                  When I submit signup form with name "<invalid_name>" and valid email
                  Then I should see error about invalid name
                  And I should remain on the signup form

                  Examples:
                        | invalid_name                                        | reason       |
                        |                                                     | empty        |
                        |                                                     |              | spaces only |
                        | 123456                                              | numbers only |
                        | @@@@@@                                              | symbols only |
                        | A                                                   | too short    |
                        | VeryLongNameThatExceedsReasonableLimitsForUserNames | too long     |


            @ae02-05 @medium
            Scenario: Reject registration with special characters in name
                  And I navigate to the registration page
                  Then I should see the signup form
                  When I submit signup form with name "John<script>" and valid email
                  Then I should see error about invalid characters in name
                  And I should remain on the signup form

            @ae02-06 @medium
            Scenario: Reject registration with SQL injection in name field
                  And I navigate to the registration page
                  Then I should see the signup form
                  When I submit signup form with name "'; DROP TABLE users; --" and valid email
                  Then I should see error about invalid characters in name
                  And I should remain on the signup form

            # =================================================================================
            # Rule: Password Security Requirements
            # =================================================================================

      Rule: Password must meet security standards and handle edge cases

            @ae02-07 @critical
            Scenario Outline: Reject weak passwords
                  And I navigate to the registration page
                  When I submit valid signup credentials
                  Then I should be on the account information setup page
                  When I complete account info form with password "<weak_password>"
                  And I click create account
                  Then I should see password strength error
                  And I should remain on the account information form

                  Examples:
                        | weak_password |
                        | 123           |
                        | password      |
                        | 12345678      |

            @ae02-08 @high
            Scenario: Reject extremely long password
                  And I navigate to the registration page
                  When I submit valid signup credentials
                  Then I should be on the account information setup page
                  When I complete account info form with 1000 character password
                  And I click create account
                  Then I should see error about password length limit
                  And I should remain on the account information form

            # =================================================================================
            # Rule: Form Field Manipulation and Client-Side Bypass
            # =================================================================================

      Rule: Server-side validation must prevent client-side manipulation

            @ae02-09 @critical
            Scenario: Attempt to bypass required field validation
                  And I navigate to the registration page
                  When I submit valid signup credentials
                  Then I should be on the account information setup page
                  When I attempt to submit form by bypassing client-side validation
                  Then I should see server-side validation errors
                  And the account should not be created

            @ae02-10 @high
            Scenario: Submit form with modified hidden field values
                  And I navigate to the registration page
                  When I submit valid signup credentials
                  Then I should be on the account information setup page
                  When I modify hidden form fields and submit
                  Then I should see server-side validation error
                  And the account should not be created

            # =================================================================================
            # Rule: Session and CSRF Protection
            # =================================================================================

      Rule: Registration must be protected against session attacks

            @ae02-11 @critical
            Scenario: Reject registration without valid CSRF token
                  And I navigate to the registration page
                  When I submit valid signup credentials
                  Then I should be on the account information setup page
                  When I remove CSRF token and submit valid account info
                  Then I should see security error message
                  And the account should not be created

            @ae02-12 @medium
            Scenario: Handle concurrent registration attempts
                  And I navigate to the registration page
                  When I submit valid signup credentials
                  Then I should be on the account information setup page
                  When I open multiple tabs and submit same registration simultaneously
                  Then only one registration should succeed
                  And other attempts should show appropriate error

            # =================================================================================
            # Rule: Rate Limiting and Abuse Prevention
            # =================================================================================

      Rule: System must prevent registration spam and abuse

            @ae02-13 @medium
            Scenario: Block excessive registration attempts from same IP
                  Given I have attempted registration 10 times in quick succession
                  When I attempt another registration
                  Then I should see rate limiting message
                  And registration form should be temporarily blocked

            # =================================================================================
            # Rule: Data Sanitization and Output Encoding
            # =================================================================================

      Rule: All user input must be properly sanitized and encoded

            @ae02-14 @high
            Scenario: Verify proper encoding of special characters in success messages
                  And I navigate to the registration page
                  When I submit signup form with name "O'Connor" and valid email
                  And I complete valid account information
                  Then the success message should properly display "O'Connor"
                  And no special characters should cause display issues