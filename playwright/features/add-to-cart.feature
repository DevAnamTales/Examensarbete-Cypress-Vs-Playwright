@addtocart
Feature: Add to cart

  Scenario: User search for product and add to cart
    Given the user is logged in
    And the user searches for the product "banana"
    And user should see search results
    When user click on the "köp" button
    Then the product is added to cart
