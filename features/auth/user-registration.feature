@ae01 @auth @registration
Feature: User Registration
      As a new visitor
      I want to create an account
      So that I can access personalised features on Automation Exercise

      Background:
            Given I am on the Automation Exercise home page


      Rule: A new user can register with valid details
            # Covers AC1, AC2, AC5

            @ae01-1 @smoke
            Scenario: Successful registration with valid credentials
                  And I navigate to the registration page
                  Then I should see the signup form
                  When I submit valid signup credentials
                  Then I should be on the account information setup page
                  When I complete the account information form
                  And I submit the registration
                  Then my account should be created successfully
                  When I click continue
                  Then I should be logged in as a registered user on the home page

      Rule: An authenticated user can delete their account
            # Covers AC6

            @ae01-2 @smoke
            Scenario: Successfully delete an existing account
                  Given I have a registered and logged in account
                  When I submit to delete the account
                  Then I should see the account deleted confirmation
                  When I click continue
                  And I should be not logged in on the home page