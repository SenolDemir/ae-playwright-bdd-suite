@ae03 @auth @login
Feature: Login Functionality
      As a registered user
      I want to be able to login to the application
      So that I can access my account and make purchases

      # When I login with valid email and password

      Rule: A registered user should be able to login successfully

      Background:
            Given I am on the Automation Exercise home page
            And I navigate to "Signup / Login" page
            Then I should see the signup form

      @ae03-1 @positive
      Scenario: Successful login with valid credentials
            When I enter my email as "testuser_2026@example.com"
            And I enter my password as "test123456"
            And I click the login button
            Then I should be logged in successfully

    