Feature: Login functionality

Scenario: Login using newly created account

Given User has a registered account
When User enters valid login credentials
Then User should login successfully
And User balance should be displayed
