@ui @ui03 @auth @login
Feature: Login Functionality
      As a registered user
      I want to be able to login to the application
      So that I can access my account and make purchases


      Rule: A registered user should be able to login and logout successfully

            Background:
                  Given I am on the Automation Exercise home page
                  And I navigate to "Signup / Login" page
                  Then I should be on the login page

            @ui03-1 @positive
            Scenario: Successful login with valid credentials
                  When I enter my email as "testuser_2026@example.com"
                  And I enter my password as "test123456"
                  And I click the login button
                  Then I should be logged in successfully
                  And I should see "Logged in as Test User" in the navigation

            @ui03-2 @positive
            Scenario: Successful logout after login
                  When I enter my email as "testuser_2026@example.com"
                  And I enter my password as "test123456"
                  And I click the login button
                  Then I should be logged in successfully
                  When I click the logout button
                  Then I should not be logged in
                  And I should be on the login page


      Rule: Negative / Validation Scenarios

            Background:
                  Given I am on the Automation Exercise home page
                  And I navigate to "Signup / Login" page
                  Then I should be on the login page

            @ui03-3 @negative
            Scenario: Login fails with incorrect password
                  When I enter my email as "testuser_2026@example.com"
                  And I enter my password as "wrongPassword!"
                  And I click the login button
                  Then I should see an error message "Your email or password is incorrect!"

            @ui03-4 @negative
            Scenario: Login fails with unregistered email
                  When I enter my email as "notregistered@example.com"
                  And I enter my password as "test123456"
                  And I click the login button
                  Then I should see an error message "Your email or password is incorrect!"

            @ui03-5 @negative
            Scenario: Login fails with empty email field
                  When I enter my password as "test123456"
                  And I click the login button
                  Then the email field should show a validation error as "Please fill in this field."

            @ui03-6 @negative
            Scenario: Login fails with empty password field
                  When I enter my email as "testuser_2026@example.com"
                  And I click the login button
                  Then the password field should show a validation error as "Please fill in this field."

            @ui03-7 @negative
            Scenario: Login fails with both fields empty
                  When I click the login button
                  Then the email field should show a validation error as "Please fill in this field."

            @ui03-8 @negative
            Scenario: Login fails with invalid email format
                  When I enter my email as "not-an-email"
                  And I enter my password as "test123456"
                  And I click the login button
                  Then the email field should show a validation error as "Please include an '@' in the email address. 'not-an-email' is missing an '@'."




