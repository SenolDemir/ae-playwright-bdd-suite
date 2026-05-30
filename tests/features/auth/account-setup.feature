@ui @ui02 @auth @registration
Feature: User Registration Account Setup  Validation
      As a system administrator
      I want the account information setup form to reject invalid input data
      So that only valid user accounts are created and security is maintained



      Background:
            Given I am on the Automation Exercise home page
            And I navigate to "Signup / Login" page
            Then I should see the signup form
            When I submit valid signup credentials
            Then I should be on the account information setup page

      # =================================================================================
      #  # Account information form validation (Step 2)
      # =================================================================================


      Rule: Password field validation

            @ui02-1 @negative
            Scenario Outline: Password field should accept only valid input as predefined
                  When I complete the account information form with valid data
                  And I enter "<password>" in the password field
                  And I submit the registration
                  Then I should see the password field error message "<error_message>"

                  Examples:
                        | password       | error_message              | description                                                 |
                        |                | Please fill in this field. | passord should not be empty                                 |
                        | Short1!        | error message              | password should be at least 8 characters                    |
                        | alowercase1!   | error message              | password should contain at least one uppercase letter       |
                        | ALLUPPERCASE1! | error message              | password should contain at least one lowercase letter       |
                        | NoNumbers!     | error message              | password should contain at least one number                 |
                        | NoSpecial1     | error message              | password should contain at least one special character      |
                        | [too_long]     | error message              | password should not exceed maximum length  of 64 characters |
                        | no space       | error message              | password should not contain spaces                          |


            #==================================================================================
            # Password field validation
            #==================================================================================
            # The core 5 rules (NIST SP 800-63B + OWASP):
            # Minimum length: typically 8 characters
            # Maximum length: typically 64–128 characters
            # Complexity: at least one uppercase, lowercase, number, and special character
            # No spaces
            # Required / not empty: basic presence check
            #==================================================================================
            # Password field has only not empty vadilation so far, other rules are not implemented
            # Title field has no 'required' attributed and is optional
            # Date of birth field is optional and has no validation rules
            # Name field has only not empty validation and no other validation rules
            #==================================================================================


      Rule:  Mandatory fields must be filled in for account information setup

            @ui02-2 @negative
            Scenario Outline: Show a validation error when a required field is left empty
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









