@ui @ui01 @auth @registration
Feature: Signup and Account Information Setup
      As a new user
      I want to register for an account with valid information
      So that I can access personalized features on the website


      Rule: Successful user registration and account deletion - e2e workflow

            Background:
                  Given I am on the Automation Exercise home page
                  And I navigate to "Signup / Login" page
                  Then I should see the signup form


            @ui01-01 @high @positive @smoke
            Scenario: Successful registration with valid credentials and subsequent account deletion
                  When I submit valid signup credentials
                  Then I should be on the account information setup page
                  When I complete the account information form
                  And I submit the registration
                  Then my account should be created successfully
                  When I click continue
                  Then I should be logged in as a registered user on the home page
                  When I submit to delete the account
                  Then I should see the account deleted confirmation
                  When I click continue
                  And I should be not logged in on the home page


      Rule: Valid name and email fields are required for signup entry registration

            Background:
                  Given I am on the Automation Exercise home page
                  And I navigate to "Signup / Login" page
                  Then I should see the signup form

            @ui01-02 @high
            Scenario: Reject registration with existing email address
                  When I enter name "Test User"
                  And I enter email "testuser@example.com"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should remain on the Login/Signup page
                  And I should see the existing email message "Email Address already exist!"


            @ui01-03 @high @negative @smoke
            Scenario: Reject registration with empty name field
                  When I leave the name field empty
                  And I enter email "valid_email"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the name field error message "Please fill in this field."
                  And I should remain on the Login/Signup page


            @ui01-04 @high @negative
            Scenario: Reject registration with empty email field
                  When I enter name "Test User"
                  And I leave the email field empty
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the email field error message "Please fill in this field."
                  And I should remain on the Login/Signup page


            @ui01-05 @negative
            Scenario: Name field error takes priority when both fields are empty
                  When I leave the name field empty
                  And I leave the email field empty
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the name field error message "Please fill in this field."

            # NOTE: These scenarios are retained as specification-level tests to document the EXPECTED
            # behaviour. They are expected to fail against the current implementation and should
            # be treated as known failures.

            @ui01-06 @high @negative
            Scenario Outline: Reject registration with invalid name formats
                  When I enter name "<invalid_name>"
                  And I enter email "valid_email"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should remain on the Login/Signup page
                  And I should see the name field error message "<error_message>"

                  Examples:
                        | invalid_name | description  | error_message              |
                        | 123456       | numbers only | Please enter a valid name  |
                        | !@#$%^       | symbols only | Please enter a valid name  |
                        |              | spaces only  | Please fill in this field. |
                        | [too_long]   | too long     | Please enter a valid name  |
                        | a            | too short    | Please enter a valid name  |

            # NOTE: Placeholder tokens in square brackets are resolved dynamically at the
            # step definition level — they are NOT literal strings typed into the field

            @ui01-07 @high @negative
            Scenario Outline: Reject registration with invalid email formats
                  When I enter name "Test User"
                  And I enter email "<invalid_email>"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the email field error message "<error_message>"
                  And I should remain on the Login/Signup page

                  Examples:
                        | invalid_email          | error_message                                                                           |
                        | invalidemail           | Please include an '@' in the email address. 'invalidemail' is missing an '@'.           |
                        | invalidemailformat.com | Please include an '@' in the email address. 'invalidemailformat.com' is missing an '@'. |
                        | testuser@              | Please enter a part following '@'. 'testuser@' is incomplete.                           |
                        | @nodomain.com          | Please enter a part followed by '@'. '@nodomain.com' is incomplete.                     |
                        | user @example.com      | A part followed by '@' should not contain the symbol ' '.                               |


      Rule:  Account setup should be completed with valid information

            Background:
                  Given I am on the Automation Exercise home page
                  And I navigate to "Signup / Login" page
                  Then I should see the signup form
                  When I submit valid signup credentials
                  Then I should be on the account information setup page

            @ui01-08 @high @negative
            Scenario Outline: Password field should accept only valid input as predefined
                  When I complete the account information form with valid data
                  And I enter "<password>" in the password field
                  And I submit the registration
                  Then I should see the "password" field error message "<error_message>"

                  Examples:
                        | password       | error_message              | description                                                 |
                        |                | Please fill in this field. | passord should not be empty                                 |
                        # | Short1!        | error message              | password should be at least 8 characters                    |
                        # | alowercase1!   | error message              | password should contain at least one uppercase letter       |
                        # | ALLUPPERCASE1! | error message              | password should contain at least one lowercase letter       |
                        # | NoNumbers!     | error message              | password should contain at least one number                 |
                        # | NoSpecial1     | error message              | password should contain at least one special character      |
                        # | [too_long]     | error message              | password should not exceed maximum length  of 64 characters |
                        # | no space       | error message              | password should not contain spaces                          |


            @ui01-09 @negative
            Scenario Outline: Registration should be rejected when a required field is left empty
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

            @ui01-10 @negative
            # app has no whitespace validation
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
                        # | address    |
                        # | state      |
                        # | city       |
                        # | zipcode    |

            @ui01-11 @negative
            Scenario Outline: Registration should be rejected when mobile number is not in valid format
                  When I complete the account information form with valid data
                  And I enter "<mobile_input>" in the mobile_number field
                  And I submit the registration
                  Then I should see the "mobile_number" field error message "<expected_error>"

                  Examples:
                        | mobile_input   | expected_error                | description                      |
                        | ABCDEFGH       | error message to be confirmed | alphabetic characters only       |
                        | 123-456-789    | error message to be confirmed | dashes in phone number           |
                        # | +1 800 000 000 | error message to be confirmed | international format with spaces |
                        # | 123 456 789    | error message to be confirmed | spaces in phone number           |



      #==================================================================================
      # Signup Entry Form validations
      # =================================================================================
      # NOTE: Based on observed behavior during exploration:
      # - Special characters in NAME field are ACCEPTED
      # - Very long names are ACCEPTED
      # - Client-side validation appears minimal; server-side validation handles most cases
      # - Form submission failure is indicated by staying on current page
      # - Only duplicate email shows explicit error message
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
      # Mobile number validation
      # ==================================================================================
      # Mobile Number field must accept only numeric input
      # Observed: type=text, no pattern attribute , does not enforce numeric format.
      # ==================================================================================