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

      Rule:  Title must be selected properly before proceeding

      Scenario: Reject account setup with no title selected
            When I leave the title field unselected
            And I complete account info form without selecting title
            And I submit the registration
            Then I should see the title field error message "Please select a title."
            Then I should remain on the account information setup page