describe('Authentication Flows', () => {

    it('Verify Sign in form validation', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Click sign in with blank fields');
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="signin-submit"]').should('be.disabled');

        cy.log('Verify that the validation message is displayed');
        cy.get('#username-helper-text').should('contain', 'Username is required');

        cy.log('Verify that the incorrect password message is displayed');
        cy.get('#password').type('1');
        cy.get('#password-helper-text').should('contain', 'Password must contain at least 4 characters');
        cy.get('#password').type('234');
        cy.get('#password-helper-text').should('not.exist');

        cy.log('Validate login failure with incorrect credentials');
        cy.get('#username').type('wronguser');
        cy.get('#password').clear();
        cy.get('#password').type('1234');
        cy.get('[data-test="signin-submit"]').click();
        cy.log('Verify that validation message is displayed');
        cy.get('[data-test="signin-error"]')
            .should('be.visible')
            .and('have.attr', 'role', 'alert')
            .within(() => {
                cy.get('.MuiAlert-message')
                    .should('contain.text', 'Username or password is invalid');
            });
    });

    it('Verify Sign up form validation', () => {
        cy.visit('/signup');
        cy.wait(3000);

        cy.log('Click sign up with blank fields');
        cy.get('[data-test="signup-submit"]').click();
        cy.get('[data-test="signup-submit"]').should('be.disabled');

        cy.log('Verify that the validation message is displayed');
        cy.get('#firstName-helper-text').should('contain', 'First Name is required');

        cy.log('Verify that the incorrect password message is displayed');
        cy.get('#password').type('1');
        cy.get('#password-helper-text').should('contain', 'Password must contain at least 4 characters');
        cy.get('#password').type('234');
        cy.get('#password-helper-text').should('not.exist');
        cy.log('Validate the message if confirm password does not match');
        cy.get('#confirmPassword').type('9');
        cy.get('#confirmPassword-helper-text').should('contain', 'Password does not match');
        cy.get('#confirmPassword').clear();
        cy.get('#confirmPassword-helper-text').should('not.exist');
    });

    it('Verify the user can Sign up', () => {
        cy.visit('/signup');
        cy.wait(3000);

        cy.log('Fill out the form');
        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Doe');
        cy.get('#username').type('johndoe1');
        cy.get('#password').type('testpass1');
        cy.get('#confirmPassword').type('testpass1');

        cy.log('Click sign up');
        cy.get('[data-test="signup-submit"]').click();
    });

    it('Verify the user can Sign in', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Fill out the form');
        cy.get('#username').type('johndoe1');
        cy.get('#password').type('testpass1');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Verify logout');
        cy.get('[data-test="sidenav-signout"]').click();
        cy.url().should('include', '/signin');
    });
})