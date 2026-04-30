@ui04 @product @positive
Feature: Product Catalog - Display and Navigation
      As a visitor
      I want to browse products and view product details
      So that I can make informed purchasing decisions.


      Background:
            Given I am on the Automation Exercise home page
            When I navigate to 'Products' page

      Rule: All products and product details are displayed correctly

            @ui04-1 @positive @wip
            Scenario: View all products and product details successfully

                  Then the ALL PRODUCTS page is displayed
                  And the products list is visible
                  When I clicks on 'View Product' for the first product
                  Then I am navigated to the product detail page
                  And the product detail is visible with:
                        | Name         | Blue Top     |
                        | Category     | Women > Tops |
                        | Price        | Rs. 500      |
                        | Availability | In Stock     |
                        | Condition    | New          |
                        | Brand        | Polo         |
                  And the write review section is visible and enable
                  And 'Add to Cart' button is visible and enabled
                  When I navigate back to the products page
                  Then the products list is displayed

            @ui04-2 @positive
            Scenario: Product image is displayed on the product detail page
                  When I clicks on 'View Product' for the first product
                  Then the product image is visible

            @ui04-3 @negative 
            Scenario: Navigating to a non-existent product detail page
                  When I navigate to a product detail page with an invalid product id
                  Then an error message or 'Product not found' page is displayed
                  #This scenario is failed since the app currently does not handle invalid product ids.


