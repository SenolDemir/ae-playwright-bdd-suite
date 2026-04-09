@ae02 @auth @registration
Feature: User Registration Form Validation
      As a system administrator
      I want the registration form to reject invalid input data
      So that only valid user accounts are created and security is maintained

      Background:
            Given I am on the Automation Exercise home page
            And I navigate to the registration page
            Then I should see the signup form


      # =================================================================================
      # Rule: Required Field Validation
      # Valid fields should allow form submission
      # =================================================================================

      Rule: Both name and email fields are required for registration

            @ae02-1 @critical @positive
            Scenario: Reject registration with empty name field
                  When I enter name "Test User"
                  When I enter email "validuser@example.com"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should be on the account information setup page


            # =================================================================================
            # Rule: Required Field Validation
            # Empty fields should prevent form submission
            # =================================================================================

      Rule: Both name and email fields are required for registration

            @ae02-1 @critical @negative
            Scenario: Reject registration with empty name field
                  And I leave the name field empty
                  When I enter email "validuser@example.com"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the error message "Please fill in this field."
                  Then I should remain on the Login/Signup page


            @ae02-2 @critical @negative
            Scenario: Reject registration with empty email field
                  When I enter name "Test User"
                  And I leave the email field empty
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the error message "Please fill in this field."
                  Then I should remain on the Login/Signup page


            @ae02-3 @critical @negative
            Scenario: Reject registration with both fields empty
                  When I leave both name and email fields empty
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the error message "Please fill in this field."
                  Then I should remain on the Login/Signup page


            # =================================================================================
            # Rule: Duplicate Email Validation
            # Already registered emails should be rejected
            # =================================================================================

      Rule: Email address must be unique in the system

            @ae02-4 @critical
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

            @ae03-5 @high @negative
            Scenario Outline: Reject registration with invalid name formats
                  When I enter name "<invalid_name>"
                  And I enter email "testuser@example.com"
                  And I click the "Signup" button
                  Then I should see the error message "Please enter a valid name"
                  Then I should remain on the Login/Signup page

                  Examples:
                        | invalid_name | description  |
                        | 123456       | numbers only |
                        | !@#$%^       | symbols only |
                        |              | spaces only  |
                        | too_long     | too long     |
                        | a            | too short    |


            @ae03-6 @high @negative
            Scenario Outline: Reject registration with invalid email formats
                  When I enter name "Test User"
                  And I enter email "<invalid_email>"
                  And I click the "Signup" button
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

            @ae03-7 @security @negative
            Scenario Outline: Reject email with harmful input attempts
                  When I enter name "Normal User"
                  And I enter email "<harmful_input>"
                  And I click the "Signup" button
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