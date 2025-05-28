Feature: Search products

  Scenario: User search for a specific product
    Given the user visits the Coop homepage
    When the user searches for the product "banana"
    Then user should see search results