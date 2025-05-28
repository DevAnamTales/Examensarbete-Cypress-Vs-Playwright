Feature: Login to Coop

  Scenario Outline: User visits homepage
    Given the user visits the Coop homepage
    And user clicks on the "Logga in" button
    And user chooses the "Med e-post" option
    And the user enters login credentials
    When user clicks on "Logga in" button
    Then the url should contain "mitt-coop"