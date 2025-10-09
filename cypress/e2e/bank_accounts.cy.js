describe('Bank Accounts Management', () => {

//helper function
function deleteAllBankAccounts() {
  cy.document().then((doc) => {
    const $buttons = doc.querySelectorAll('[data-test="bankaccount-delete"]');

    if ($buttons.length > 0) {
      cy.wrap($buttons[0]).click();

      cy.wait(300); // adjust if needed

      deleteAllBankAccounts();
    } else {
      cy.log('✅ All bank accounts deleted');
    }
  });
}


    it('Verify a Create Bank Account form validation', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Heath93');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open bank accounts page');
        cy.get('[data-test="sidenav-bankaccounts"]').click();

        cy.log('Click Create');
        cy.get('[data-test="bankaccount-new"]').click();

        cy.log('Verify the user can\'t save a blank form');
        cy.get('[data-test="bankaccount-submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/bankaccounts/new');
        cy.get('[data-test="bankaccount-submit"]').click();

        cy.log('Verify validation message is displayed');
        cy.get('#bankaccount-bankName-input-helper-text').should('contain', 'Enter a bank name');
        cy.get('[data-test="bankaccount-submit"]').should('be.disabled');

        cy.log('Enter incorrect data');
        cy.get('#bankaccount-bankName-input').type('1');
        cy.get('#bankaccount-routingNumber-input').type('1');
        cy.get('#bankaccount-accountNumber-input').type('1');
        cy.get('#bankaccount-bankName-input-helper-text').should('contain', 'Must contain at least 5 characters');
        cy.get('#bankaccount-routingNumber-input-helper-text').should('contain', 'Must contain a valid routing number');
        cy.get('#bankaccount-accountNumber-input-helper-text').should('contain', 'Must contain at least 9 digits');
        cy.get('[data-test="bankaccount-submit"]').should('be.disabled');
    });

    it('Verify the user can add a new bank account', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Heath93');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open bank accounts page');
        cy.get('[data-test="sidenav-bankaccounts"]').click();

        cy.log('Click Create');
        cy.get('[data-test="bankaccount-new"]').click();

        cy.log('Enter bank account info');
        cy.get('#bankaccount-bankName-input').type('Citi Bank');
        cy.get('#bankaccount-routingNumber-input').type('232349506');
        cy.get('#bankaccount-accountNumber-input').type('232349522');

        cy.get('[data-test="bankaccount-submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/bankaccounts');
        cy.get('[data-test="bankaccount-list"]').find('li').should('have.length.greaterThan', 0);
    });

    it('Verify the user can add multiple new bank accounts', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Heath93');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open bank accounts page');
        cy.get('[data-test="sidenav-bankaccounts"]').click();

        cy.log('Click Create');
        cy.get('[data-test="bankaccount-new"]').click();

        cy.log('Enter bank account info');
        cy.get('#bankaccount-bankName-input').type('Citi Bank');
        cy.get('#bankaccount-routingNumber-input').type('232349506');
        cy.get('#bankaccount-accountNumber-input').type('232349522');

        cy.get('[data-test="bankaccount-submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/bankaccounts');
        cy.get('[data-test="bankaccount-list"]').find('li').should('have.length.greaterThan', 0);

        cy.log('Click Create');
        cy.get('[data-test="bankaccount-new"]').click();

        cy.log('Enter bank account info');
        cy.get('#bankaccount-bankName-input').type('Discover');
        cy.get('#bankaccount-routingNumber-input').type('500019506');
        cy.get('#bankaccount-accountNumber-input').type('500019522');

        cy.get('[data-test="bankaccount-submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/bankaccounts');
        cy.get('[data-test="bankaccount-list"]').find('li').should('have.length.greaterThan', 1);
    });

    it('Verify the user can delete a bank account', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Heath93');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open bank accounts page');
        cy.get('[data-test="sidenav-bankaccounts"]').click();

        cy.log('Delete bank account');
        cy.get('[data-test="bankaccount-list"] li').last().find('[data-test="bankaccount-delete"]').click();
        cy.get('[data-test="bankaccount-list"] li').last().find('[data-test="bankaccount-delete"]').should('not.exist');
        cy.url().should('eq', 'http://localhost:3000/bankaccounts');
    });

    it('Verify the user can delete all bank accounts', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Heath93');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open bank accounts page');
        cy.get('[data-test="sidenav-bankaccounts"]').click();

        cy.log('Delete bank account');
        deleteAllBankAccounts();
        cy.url().should('eq', 'http://localhost:3000/bankaccounts');
    });
})