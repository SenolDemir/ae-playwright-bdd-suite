@ae04 @product @positive
Feature: Product Catalog and Product Detail Page
      The product catalog allows users to browse all products and view detailed information for each product.

      #AC1: Verify all products and product details are displayed correctly
      #AC2: Verify that navigating to a non-existent product detail page returns an error or redirects appropriately
      #AC3: Verify that Product Search functionality works correctly

      Background:
            Given I am on the Automation Exercise home page

      Rule: All products and product details are displayed correctly

      @positive
      Scenario: View all products and product details successfully
            When the user clicks on the 'Products' button
            Then the ALL PRODUCTS page is displayed
            And the products list is visible
            When the user clicks on 'View Product' for the first product
            Then the user is navigated to the product detail page
            And the product detail is visible with:
                  | field        | value        |
                  | Name         | Blue Top     |
                  | Category     | Women > Tops |
                  | Price        | Rs. 500      |
                  | Availability | In Stock     |
                  | Condition    | New          |
                  | Brand        | Polo         |
            And the product image is visible
            And 'Add to Cart' button is visible and enabled


