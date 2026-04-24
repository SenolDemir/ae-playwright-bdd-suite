@products-catalog @product @both
Feature: Product Catalog - Display and Navigation
  The product catalog displays all products and allows users to view product details.

  Background:
    Given I am on the Automation Exercise products page
    And any consent or overlay dialog is dismissed

  Rule: Product cards display required information

  @positive
  Scenario: All products are displayed with name, price, and image
    Then each product card shows the product name
    And each product card shows the product price
    And each product card shows the product image

  @positive
  Scenario: Navigating to a product detail page
    When I click the 'View Product' link for a product
    Then I am navigated to the product detail page for that product
    And the detail page displays the correct product name, price, category, and availability

  @positive
  Scenario: Navigating back to the product listing from a detail page
    Given I am on a product detail page
    When I navigate back to the products page
    Then the products list is displayed

  @negative
  Scenario: Product card missing required information
    Given a product card is missing the name, price, or image
    Then the product card should not be displayed
    And an error should be logged or the card should be hidden

  @negative
  Scenario: Product detail page displays incorrect information
    When I navigate to a product detail page
    And the product name, price, category, or availability is incorrect
    Then an error message should be displayed or the data should be corrected

  @negative
  Scenario: Navigating to a non-existent product detail page
    When I navigate to a product detail page with an invalid product id
    Then an error message or 'Product not found' page is displayed

