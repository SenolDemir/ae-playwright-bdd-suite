@ui @ui01 @auth @registration
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

            @ui01-1 @critical @positive @smoke
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


      Rule: Valid name and email fields are required for registration

            @ui01-2 @critical @negative @smoke
            Scenario: Reject registration with empty name field
                  When I leave the name field empty
                  And I enter email "valid_email"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the name field error message "Please fill in this field."
                  And I should remain on the Login/Signup page


            @ui01-3 @critical @negative @wip
            Scenario: Reject registration with empty email field
                  When I enter name "Test User"
                  And I leave the email field empty
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the email field error message "Please fill in this field."
                  And I should remain on the Login/Signup page


            @ui01-4 @critical @negative
            Scenario: Name field error takes priority when both fields are empty
                  When I leave the name field empty
                  And I leave the email field empty
                  And I click the "Signup" button on the Login/Signup page
                  Then I should see the name field error message "Please fill in this field."
                

      Rule: Email address must be unique in the system

            @ui01-5 @critical
            Scenario: Reject registration with existing email address
                  When I enter name "Test User"
                  And I enter email "testuser@example.com"
                  And I click the "Signup" button on the Login/Signup page
                  Then I should remain on the Login/Signup page
                  And I should see the existing email message "Email Address already exist!"


            # =================================================================================
            # Invalid email formats should be rejected
            # =================================================================================

      Rule: Name and email address must follow valid format

            # NOTE: These scenarios are retained as specification-level tests to document the EXPECTED
            # behaviour. They are expected to fail against the current implementation and should
            # be treated as known failures.

            @ui01-6 @high @negative
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

            @ui01-7 @high @negative
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


            # =================================================================================
            # Rule: Session-Aware Registration Routing
            # The signup flow should handle users who are already authenticated or who
            # arrive at the registration page via a direct URL rather than the site navigation.
            # =================================================================================

      Rule: An authenticated user should not be able to access the signup form

            @ui01-8 @high @negative @session
            Scenario: Logged-in user navigating to the signup page is redirected or shown a message
                  Given I have a registered account
                  And I am logged in with my account credentials
                  When I navigate directly to the "Signup / Login" page
                  Then I should not see the signup form
                  And I should either be redirected to the home page or see a message indicating I am already logged in


      Rule: The signup page must be accessible and functional when navigated to directly

      # @ui01-9 @high @positive @navigation
      # Scenario: User arriving at the signup URL directly sees a functional signup form
      #       Given I navigate directly to the signup URL
      #       Then I should see the signup form
      #       And the signup form should be fully functional
      #       When I submit valid signup credentials
      #       Then I should be on the account information setup page


      # =================================================================================
      # NOTE: Based on observed behavior during exploration:
      # - Special characters in NAME field are ACCEPTED
      # - Very long names are ACCEPTED
      # - Client-side validation appears minimal; server-side validation handles most cases
      # - Form submission failure is indicated by staying on current page
      # - Only duplicate email shows explicit error message
      # =================================================================================
