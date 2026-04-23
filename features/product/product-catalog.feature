@ae04 @product @positive
Feature: Product Catalog - Display and Navigation
      The product page displays all products and allows users to view product details.


      Background:
            Given I am on the Automation Exercise home page

      Rule: All products and product details are displayed correctly

            @ae04-1 @positive @wip
            Scenario: View all products and product details successfully
                  When I clicks on the 'Products' button
                  Then the ALL PRODUCTS page is displayed
                  And the products list is visible
                  When I clicks on 'View Product' for the first product
                  Then I am navigated to the product detail page
                  And the product detail is visible with:
                        | field        | value        |
                        | Name         | Blue Top     |
                        | Category     | Women > Tops |
                        | Price        | Rs. 500      |
                        | Availability | In Stock     |
                        | Condition    | New          |
                        | Brand        | Polo         |
                  And the product image is visible
                  And the write review section is visible and enable
                  And 'Add to Cart' button is visible and enabled
                  When I navigate back to the products page
                  Then the products list is displayed

            @ae04-2 @negative @wip
            Scenario: Navigating to a non-existent product detail page
                  When I navigate to a product detail page with an invalid product id
                  Then an error message or 'Product not found' page is displayed


