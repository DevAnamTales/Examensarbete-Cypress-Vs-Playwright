Feature: Login to Coop

  Scenario: User visits homepage
    Given the user visits the Coop homepage
    And user clicks on the "Logga in" button
    And user chooses the "Med e-post" option
    And the user enters login credentials
    When user clicks on "Logga in" button
    And the page title should contain "mitt-coop"