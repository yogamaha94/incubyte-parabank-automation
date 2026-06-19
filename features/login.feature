Feature: Login

  Scenario: User can log in with valid credentials
    Given the user is on the login page
    When the user submits valid login credentials
    Then the user should be redirected to the account overview page
