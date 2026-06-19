Feature: User Registration

Scenario: Register new user successfully

Given User launches parabank application
When User navigates to registration page
And User enters registration details
And User submits registration form
Then User account should be created successfully
