describe('Profile Validation', () => {

    it('User settings update and validation', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Fill out the form');
        cy.get('#username').type('Julia95');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();
        
        cy.log('Verify user settings form validation');
        cy.get('[data-test="sidenav-user-settings"]').click();
        cy.get('#user-settings-firstName-input').clear();
        cy.get('#user-settings-firstName-input-helper-text').should('contain', 'Enter a first name');
        cy.get('#user-settings-lastName-input').clear();
        cy.get('#user-settings-lastName-input-helper-text').should('contain', 'Enter a last name');
        cy.get('#user-settings-email-input').clear();
        cy.get('#user-settings-email-input-helper-text').should('contain', 'Enter an email address');
        cy.get('#user-settings-phoneNumber-input').clear();
        cy.get('#user-settings-phoneNumber-input-helper-text').should('contain', 'Enter a phone number');
        cy.log('Verify the Save button is disabled');
        cy.get('[data-test="user-settings-submit"]').should('be.disabled');
        
        cy.log('Update user info');
        cy.get('#user-settings-firstName-input').type('Bella');
        cy.get('#user-settings-lastName-input').type('Lorem');
        cy.get('#user-settings-email-input').type('bella@email.com');
        cy.get('#user-settings-phoneNumber-input').type('4903004040');

        cy.log('Click Save');
        cy.get('[data-test="user-settings-submit"]').click();
    });

})