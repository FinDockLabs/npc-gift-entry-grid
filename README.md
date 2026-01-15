<a href="https://githubsfdeploy.herokuapp.com?owner=FinDockLabs&repo=npc-gift-entry-grid&ref=main">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

# FinDock Payment Component wrapper for NPC Gift Entry Grid

Please note: this project uses the new-ish Gift Entry Grid functionality. For the previous flow-based Gift Entry functionality see: https://github.com/FinDockLabs/findock-single-gift-entry
Please note2: this project is meant as implementation inspiration. It by no means contains production-ready code. Please adjust to your specific business process and architecture.

This project provides a basic wrapper for the FinDock Payment Component (Virtual Terminal / MOTO) to be used in the Gift Entry Grid.
The FinDock Payment Component is used to authorize & capture Credit Card and Direct Debit payments by an agent from Salesforce.
The Gift Entry Grid feature is part of the Salesforce Nonprofit Cloud (NPC).

For more information about the FinDock Payment Component, see: https://docs.findock.com/payments/configuring-findock-moto
For more information about Salesforce Nonprofit Cloud, see: https://help.salesforce.com/s/articleView?id=sfdo.fundraising_get_started.htm&type=5

## Structure
The project consists of 3 layers:

Wrapper LWC Component
 |_Wrapper Screen Flow
    |_FinDock Payment Component

- The FinDock Payment Component provides the primary functionality.
- The Wrapper Screen Flow is used to show the FinDock Paymetn Component to the user, inject configuration into the component and provide a way to extend its functionality (e.g. orchestration across payment processors).
- The Wrapper LWC allows for the Screen Flow with Payment Component to be added to a Gift Entry Grid template

The Components and Flow work with both Gift Transactions and Gift Commitments. Currently the Flow prioritises Gift Commitments if both are entered in Gift Entry, but this can be adjusted by changing a formula.

## Configuration

0. Configure NPC and Fundraising (make sure to have a Default Gift Designation)
1. Install and Configure FinDock, including the FinDock for Fundraising Source Connector and at least one Processor that is supported by the Payment Component (pay special attention to permissions: have the FinDock Service Agent permission set group assigned)
2. Deploy the LWC and Screen Flow
3. Add the Wrapper LWC to a Gift Entry Grid Template:
    a. Go to Salesforce Setup
    b. Go to Feature Settings > Fundraising > Gift Entry
    c. Edit an existing Template or press "New Template"
    d. In the settings on the right hand side, scroll down to "Gift Entry Post Processing"
    e. Press "Add Step"
    f. Under "Lightning Web Component Name" select GE FinDock Payment Wrapper
    g. Add the following conditions (depending on what processor / methods you use): Payment Method Equals CreditCard; Payment Method Equals ACH Direct Debit
    h. If you selected multiple conditions, select "Any filter is true" under "Show component when:"
    i. Save the Post-processing settings
    j. Save the Template settings
4. Set the new template as Default


## Try it out

1. Go to "Gift Entry Grid"
2. Enter the required details
3. Press Process Gift
4. Wait until the Gift Entry is saved, the Gift Transaction or Gift Commitment is created. A toast should show and a modal should pop up
5. On the modal follow the instructions on the FinDock Payment Component

## Contributing

When contributing to this repository, please first discuss the change you wish to make via an issue or any other method with FinDock before making a change.

## Support

FinDock Labs is a non-supported group in FinDock that releases applications. Despite the name, assistance for any of these applications is not provided by FinDock Support because they are not officially supported features. For a list of these apps, visit the FinDock Labs account on Github. 

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details