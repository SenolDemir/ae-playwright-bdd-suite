#  @auth @registration @negative
# Feature: User Registration - Negative Scenarios
#       As a system
#       I want to validate user input during registration
#       So that invalid data is rejected and appropriate errors are shown

#       Background:
#             Given I am on the Automation Exercise home page

#      

#             # =================================================================================
#             # Rule: Account information form validation (Step 2)
#             # =================================================================================

#       Rule: Title and password must be selected/filled before proceeding

#          @critical
#             Scenario: Reject account info when no title is selected
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   And I complete account info form without selecting title
#                   When I click create account
#                   Then I should see error about title selection
#                   And I should remain on the account information form

#          @critical
#             Scenario: Reject account creation with empty password field
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with empty password
#                   And I click create account
#                   Then I should see error "Password is required" or validation message
#                   And I should remain on the account information form

#             # =================================================================================
#             # Rule: Required text fields must not be empty or whitespace-only
#             # =================================================================================

#       Rule: Personal information text fields validation

#             @critical
#             Scenario: Reject account creation with empty first name
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with empty first name but valid other fields
#                   And I click create account
#                   Then I should see error "First name is required" or validation message
#                   And I should remain on the account information form

#            @critical
#             Scenario: Reject account creation with empty last name
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with empty last name but valid other fields
#                   And I click create account
#                   Then I should see error "Last name is required" or validation message
#                   And I should remain on the account information form

#             @critical
#             Scenario: Reject account creation with spaces-only first name
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with spaces-only first name but valid other fields
#                   And I click create account
#                   Then I should see error or validation message about first name
#                   And I should remain on the account information form

#           @critical
#             Scenario: Reject account creation with empty address
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with empty address but valid other fields
#                   And I click create account
#                   Then I should see error "Address is required" or validation message
#                   And I should remain on the account information form

#             # =================================================================================
#             # Rule: City, State, and Zipcode must not be empty
#             # =================================================================================

#       Rule: Address information required fields validation

#           @critical
#             Scenario: Reject account creation with empty city
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with empty city but valid other fields
#                   And I click create account
#                   Then I should see error "City is required" or validation message
#                   And I should remain on the account information form

#           @critical
#             Scenario: Reject account creation with empty state
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with empty state but valid other fields
#                   And I click create account
#                   Then I should see error "State is required" or validation message
#                   And I should remain on the account information form

#            @critical
#             Scenario: Reject account creation with empty zipcode
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with empty zipcode but valid other fields
#                   And I click create account
#                   Then I should see error "Zipcode is required" or validation message
#                   And I should remain on the account information form

#             # =================================================================================
#             # Rule: Country must be selected
#             # =================================================================================

#       Rule: Country dropdown must have a selection

#            @critical
#             Scenario: Reject account creation when no country is selected
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   And I complete account info form without selecting country
#                   When I click create account
#                   Then I should see error about country selection
#                   And I should remain on the account information form

#             # =================================================================================
#             # Rule: Contact information must not be empty
#             # =================================================================================

#       Rule: Mobile number must be provided

#       @critical
#             Scenario: Reject account creation with empty mobile number
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with empty mobile number but valid other fields
#                   And I click create account
#                   Then I should see error "Mobile Number is required" or validation message
#                   And I should remain on the account information form

#             # =================================================================================
#             # Rule: Format validation for contact information
#             # =================================================================================

#       Rule: Mobile number and zipcode must have valid format

#             @high
#             Scenario: Reject account creation with invalid mobile number format
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with invalid mobile number "abc123" but valid other fields
#                   And I click create account
#                   Then I should see error about invalid mobile number format
#                   And I should remain on the account information form

#             @high
#             Scenario: Reject account creation with mobile number too short
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with mobile number "123" but valid other fields
#                   And I click create account
#                   Then I should see error about mobile number length
#                   And I should remain on the account information form

#             # =================================================================================
#             # Rule: Password strength validation
#             # =================================================================================

#       Rule: Password must meet minimum requirements

#             @high
#             Scenario: Reject account creation with password too short
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with short password "Pass1@" but valid other fields
#                   And I click create account
#                   Then I should see error about password being too short
#                   And I should remain on the account information form

#             @medium
#             Scenario: Reject account creation with weak password
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with weak password "password123" but valid other fields
#                   And I click create account
#                   Then I should see error about password complexity
#                   And I should remain on the account information form

#             # =================================================================================
#             # Rule: Boundary value testing
#             # =================================================================================

#       Rule: Long input values should be handled properly

#             @medium
#             Scenario: Reject or truncate extremely long name
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit signup form with very long name (more than 100 characters) and valid email
#                   Then system should either reject the input or truncate properly
#                   And if rejected, I should see appropriate error message

#             @medium
#             Scenario: Reject or handle extremely long address
#                   And I navigate to the registration page
#                   Then I should see the signup form
#                   When I submit valid signup credentials
#                   Then I should be on the account information setup page
#                   When I complete account info form with very long address (more than 255 characters)
#                   And I click create account
#                   Then system should either reject or handle the long input properly
