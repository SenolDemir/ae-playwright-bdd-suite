@product-catalog @product @positive
Feature: Product Catalog and Product Detail Page
  The product catalog allows users to browse all products and view detailed information for each product.

  Background:
    Given I am on the Automation Exercise home page

  @positive
  Scenario: View all products and product details successfully
    When the user clicks on the 'Products' button
    Then the ALL PRODUCTS page is displayed
    And the products list is visible
    When the user clicks on 'View Product' for the first product
    Then the user is navigated to the product detail page
    And the product detail is visible with:
      | field        | value           |
      | Name         | Blue Top        |
      | Category     | Women > Tops    |
      | Price        | Rs. 500         |
      | Availability | In Stock        |
      | Condition    | New             |
      | Brand        | Polo            |
      And 'Add to Cart' button is visible and enabled
      

  @negative
  Scenario: Attempt to access product detail page with invalid product id
    When the user navigates to 'https://www.automationexercise.com/product_details/9999'
    Then an error message or 'Product not found' page is displayed

  @negative
  Scenario: Attempt to view products when overlay blocks interaction
    Given a consent or overlay dialog is present
    When the user tries to click the 'Products' button
    Then the overlay prevents navigation to the ALL PRODUCTS page
    And the user remains on the home page
