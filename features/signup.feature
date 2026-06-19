Feature: Signup

  Scenario: User can register a new account
    Given the user is on the registration page
    When the user submits valid registration details
    Then the user account should be created successfully
