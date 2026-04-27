@ae01 @auth @registration
Feature: Signup with valid credentials
      As a new user
      I want to register for an account with valid information
      So that I can access personalized features on the website

      Background:
            Given I am on the Automation Exercise home page
            And I navigate to "Signup / Login" page
            Then I should see the signup form

      # =================================================================================
      # Rule: Successful Registration and Account Deletion
      # Valid credentials should allow registration
      # Account deletion should work for authenticated users
      # =================================================================================

      Rule: A new user can register with valid details and delete their account

            @ae01-1 @critical @positive @smoke @wip
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

            # =================================================================================
            # Rule: Required Field Validation
            # Empty fields should prevent form submission
            # =================================================================================

      Rule: Both name and email fields are required for registration

            @ae01-2 @critical @negative @smoke
            Scenario: Reject registration with empty name field
                  When I leave the name field empty
                  And I enter email "valid_email"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the name field error message "Please fill in this field."
                  Then I should remain on the Login/Signup page


            @ae01-3 @critical @negative @wip
            Scenario: Reject registration with empty email field
                  When I enter name "Test User"
                  And I leave the email field empty
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the email field error message "Please fill in this field."
                  Then I should remain on the Login/Signup page


            @ae01-4 @critical @negative
            Scenario: Reject registration with both fields empty
                  When I leave the name field empty
                  And I leave the email field empty
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the error message "Please fill in this field."
                  Then I should remain on the Login/Signup page


            # =================================================================================
            # Rule: Duplicate Email Validation
            # Already registered emails should be rejected
            # =================================================================================

      Rule: Email address must be unique in the system

            @ae01-5 @critical
            Scenario: Reject registration with existing email address
                  When I enter name "New User"
                  And I enter email "testuser@example.com"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the error message "Email Address already exist!"
                  And I should remain on the Login/Signup page


            # =================================================================================
            # Rule: Name and Email Format Validation
            # Invalid email formats should be rejected
            # =================================================================================

      Rule: Name and email address must follow valid email format

            @ae01-6 @high @negative
            Scenario Outline: Reject registration with invalid name formats
                  When I enter name "<invalid_name>"
                  And I enter email "testuser@example.com"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the error message "Please enter a valid name"
                  Then I should remain on the Login/Signup page

                  Examples:
                        | invalid_name | description  |
                        | 123456       | numbers only |
                        | !@#$%^       | symbols only |
                        |              | spaces only  |
                        | too_long     | too long     |
                        | a            | too short    |


            @ae01-7 @high @negative
            Scenario Outline: Reject registration with invalid email formats
                  When I enter name "Test User"
                  And I enter email "<invalid_email>"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the error message "Please enter a valid email"
                  And I should remain on the Login/Signup page

                  Examples:
                        | invalid_email          | description          |
                        | invalidemail           | missing @ and domain |
                        | invalidemailformat.com | missing @ symbol     |
                        | testuser@              | missing domain       |
                        |                        | empty spaces         |


            # =================================================================================
            # Rule: Input Security Validation
            # Special characters and scripts in email should be rejected
            # =================================================================================

      Rule: Email field must reject potentially harmful input

            @ae01-8 @security @negative
            Scenario Outline: Reject email with harmful input attempts
                  When I enter name "Normal User"
                  And I enter email "<harmful_input>"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should remain on the Login/Signup page


                  Examples:
                        | harmful_input                 | description      |
                        | <script>alert('xss')</script> | script injection |
                        | <img src=x onerror=alert(1)>  | image injection  |
                        | <iframe src="malicious.com">  | iframe injection |


      # =================================================================================
      # NOTE: Based on observed behavior during exploration:
      # - Special characters in NAME field are ACCEPTED
      # - Very long names are ACCEPTED
      # - Client-side validation appears minimal; server-side validation handles most cases
      # - Form submission failure is indicated by staying on current page
      # - Only duplicate email shows explicit error message
      # =================================================================================