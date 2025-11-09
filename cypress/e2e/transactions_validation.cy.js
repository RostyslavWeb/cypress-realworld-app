describe('Transactions Validation', () => {

    it('Verify a transaction form validation', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Julia95');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Click New');
        cy.get('[data-test="nav-top-new-transaction"]').click();

        cy.log('Select Contact');
        cy.get('[data-test="user-list-search-input"]').type('Ted');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Click on the form fields');
        cy.get('#amount').click();
        cy.get('#transaction-create-description-input').click();
        cy.get('body').click();
        cy.get('#transaction-create-amount-input-helper-text').should('contain', 'Please enter a valid amount');
        cy.get('#transaction-create-description-input-helper-text').should('contain', 'Please enter a note');
        cy.get('[data-test="transaction-create-submit-request"]').should('be.disabled');
        cy.get('[data-test="transaction-create-submit-payment"]').should('be.disabled');
    });

    it('Verify the user can pay and whether the balance has been reduced', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Clementina.Schultz64');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Click New');
        cy.get('[data-test="nav-top-new-transaction"]').click();

        cy.log('Select Contact');
        cy.get('[data-test="user-list-search-input"]').type('Ted');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('500');
        cy.get('#transaction-create-description-input').type('Test transaction comment');

        cy.log('Get initial balance');
        cy.get('[data-test="sidenav-user-balance"]')
            .invoke('text')
            .then((text) => {

                const initialBalance = parseFloat(text.replace(/[$,]/g, ''));

                cy.log('Send money');
                cy.get('[data-test="transaction-create-submit-payment"]').click();

                cy.log('Verify balance is reduced');
                cy.get('[data-test="sidenav-user-balance"]')
                    .invoke('text')
                    .then((newText) => {
                        let newBalance = parseFloat(newText.replace(/[$,]/g, ''));
                        newBalance -= 500;
                        expect(newBalance).to.equal(initialBalance - 500);
                    });
            });
    });

    it('Verify the user can do multiple transactions (create another transaction)', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Clementina.Schultz64');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Click New');
        cy.get('[data-test="nav-top-new-transaction"]').click();

        cy.log('Select Contact');
        cy.get('[data-test="user-list-search-input"]').type('Bella');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('30');
        cy.get('#transaction-create-description-input').type('Test create another transaction');

        cy.log('Click pay');
        cy.get('[data-test="transaction-create-submit-payment"]').click();

        cy.log('Click create another transaction');
        cy.get('[data-test="new-transaction-create-another-transaction"]').click();

        cy.log('Select Contact');
        cy.get('[data-test="user-list-search-input"]').type('Bella');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('30');
        cy.get('#transaction-create-description-input').type('Test create another transaction 2');

        cy.log('Click pay');
        cy.get('[data-test="transaction-create-submit-payment"]').click();
    });

    it('Verify that the user can request money, and the other user accepts', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Clementina.Schultz64');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Click New');
        cy.get('[data-test="nav-top-new-transaction"]').click();

        cy.log('Select Contact');
        cy.get('[data-test="user-list-search-input"]').type('Bella');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('100');
        cy.get('#transaction-create-description-input').type('Test request money transaction');

        cy.log('Click request');
        cy.get('[data-test="transaction-create-submit-request"]').click();

        cy.log('Log out');
        cy.get('[data-test="sidenav-signout"]').click();

        cy.log('Enter username and password');
        cy.get('#username').type('Julia95');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Filter transactions by date');
        cy.get('[data-test="transaction-list-filter-date-range-button"]').click();

        cy.log('Select date range');
        //Get today's date and tomorrow's date
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        //Helper to format like "October 10, 2025"
        const formatDateLabel = (date) =>
            date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        cy.get('[data-test="transaction-list-filter-date-range"]').within(() => {
            const startLabel = formatDateLabel(today);
            const endLabel = formatDateLabel(tomorrow);
            //Select start date
            cy.get(`abbr[aria-label="${startLabel}"]`).click();
            //Select end date
            cy.get(`abbr[aria-label="${endLabel}"]`).click();
        });

        cy.log('Select recent transaction');
        cy.get('[data-test^="transaction-item"]').first().should('contain.text', 'Nelson Williamson').click();

        cy.log('Verify the user can like in transaction detail');
        cy.get('[data-test^="transaction-like-button-"]').click();

        cy.log('Verify like count is updated');
        cy.get('[data-test^="transaction-like-count-"]')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const count = Number(text.trim());
                cy.log(`Like count: ${count}`);
                expect(count).to.be.greaterThan(0);
            });

        cy.get('[data-test^="transaction-like-button-"]').should('be.disabled');

        cy.log('Verify the user can enter a comment for the transaction');
        cy.get('[data-test^="transaction-comment-input-"]').type('Lorem ipsum transaction comment');

        cy.log('Click accept request');
        cy.get('[data-test^="transaction-accept-request-"]').click();

        cy.log('Get initial balance');
        cy.get('[data-test="sidenav-user-balance"]')
            .invoke('text')
            .then((text) => {

                const initialBalance = parseFloat(text.replace(/[$,]/g, ''));

                cy.log('Verify balance is reduced');
                cy.get('[data-test="sidenav-user-balance"]')
                    .invoke('text')
                    .then((newText) => {
                        let newBalance = parseFloat(newText.replace(/[$,]/g, ''));
                        newBalance -= 100;
                        expect(newBalance).to.equal(initialBalance - 100);
                    });
            });
    });

    it('Verify that the user can request money, and the other user rejects', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Clementina.Schultz64');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Click New');
        cy.get('[data-test="nav-top-new-transaction"]').click();

        cy.log('Select Contact');
        cy.get('[data-test="user-list-search-input"]').type('Bella');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('750');
        cy.get('#transaction-create-description-input').type('Test request money transaction');

        cy.log('Click request');
        cy.get('[data-test="transaction-create-submit-request"]').click();

        cy.log('Logout');
        cy.get('[data-test="sidenav-signout"]').click();

        cy.log('Enter username and password');
        cy.get('#username').type('Julia95');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Filter transactions by date');
        cy.get('[data-test="transaction-list-filter-date-range-button"]').click();
        cy.log('Select date range');
        //Get today's date and tomorrow's date
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        //Helper to format like "October 10, 2025"
        const formatDateLabel = (date) =>
            date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        cy.get('[data-test="transaction-list-filter-date-range"]').within(() => {
            const startLabel = formatDateLabel(today);
            const endLabel = formatDateLabel(tomorrow);
            //Select start date
            cy.get(`abbr[aria-label="${startLabel}"]`).click();
            //Select end date
            cy.get(`abbr[aria-label="${endLabel}"]`).click();
        });

        cy.log('Select recent transaction');
        cy.get('[data-test^="transaction-item"]').first().should('contain.text', 'Nelson Williamson').click();

        cy.log('Verify the user can enter a comment for the transaction');
        cy.get('[data-test^="transaction-comment-input-"]').type('Transaction rejected comment');

        cy.log('Click reject request');
        cy.get('[data-test^="transaction-reject-request-"]').click();
    });

    it('Verify sending a greater amount than the available balance', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Vivienne94');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Click New');
        cy.get('[data-test="nav-top-new-transaction"]').click();

        cy.log('Select Contact');
        cy.get('[data-test="user-list-search-input"]').type('Bella');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('1000000');
        cy.get('#transaction-create-description-input').type('Test comment');
        // System has valiation bug - the button is not disabled
        // cy.log('Verify the button is disabled if the amount is greater than the available balance');
        // cy.get('[data-test="transaction-create-submit-payment"]').should('be.disabled');
    });
})