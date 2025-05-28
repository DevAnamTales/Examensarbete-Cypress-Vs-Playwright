Feature: Login to Coop

  Scenario Outline: User visits homepage
    Given the user visits the Coop homepage
    And user clicks on the "Logga in" button
    And user chooses the "Med e-post" option
    And user enters the "<email>" and "<password>"
    When user clicks on "Logga in" button
    Then the page title should contain "mitt-coop"

    Examples:
      | email                | password |
      | anam-rehman@live.com | Test1234 |