describe('Notifications Validation', () => {

    //helper function
    function dismissnotifications() {
        cy.document().then((doc) => {
            const $buttons = doc.querySelectorAll('[data-test^="notification-mark-read-"]');

            if ($buttons.length > 0) {
                cy.wrap($buttons[0]).click();

                cy.wait(300); // adjust if needed

                dismissnotifications();
            } else {
                cy.log('✅ All notifications dismissed');
            }
        });
    }

    it('Verify the notification - the user received payment', () => {
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
        cy.get('[data-test="user-list-search-input"]').type('Nelson');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('5');
        cy.get('#transaction-create-description-input').type('Test transaction comment');

        cy.log('Send money');
        cy.get('[data-test="transaction-create-submit-payment"]').click();

        cy.log('Log out');
        cy.get('[data-test="sidenav-signout"]').click();

        cy.log('Enter username and password');
        cy.get('#username').type('Clementina.Schultz64');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open notifications');
        cy.get('[data-test="sidenav-notifications"]').click();
        
        cy.log('Verify notification is displayed');
        cy.get('[data-test="notifications-list"]')
            .find('li div')
            .contains('Nelson Williamson received payment.')
            .should('exist');
    });

    it('Verify the notification - the user liked a transaction', () => {
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
        cy.get('[data-test="user-list-search-input"]').type('Nelson');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('5');
        cy.get('#transaction-create-description-input').type('Test transaction comment');

        cy.log('Send money');
        cy.get('[data-test="transaction-create-submit-payment"]').click();

        cy.log('Click Return to transactions');
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();

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

        cy.log('Log out');
        cy.get('[data-test="sidenav-signout"]').click();

        cy.log('Enter username and password');
        cy.get('#username').type('Clementina.Schultz64');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open notifications');
        cy.get('[data-test="sidenav-notifications"]').click();

        cy.log('Verify notification is displayed');
        cy.get('[data-test="notifications-list"]')
            .find('li div')
            .contains('Bella Lorem liked a transaction.')
            .should('exist');
    });

    it('Verify the notification - the user requested payment', () => {
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

        cy.log('Open notifications');
        cy.get('[data-test="sidenav-notifications"]').click();

        cy.log('Verify notification is displayed');
        cy.get('[data-test="notifications-list"]')
            .find('li div')
            .contains('Nelson Williamson requested payment.')
            .should('exist');
    });

    it('Verify the notification - the user commented on a transaction', () => {
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
        cy.get('[data-test="user-list-search-input"]').type('Nelson');
        cy.get('[data-test="users-list"] li').first().click();

        cy.log('Fill out form fields');
        cy.get('#amount').type('5');
        cy.get('#transaction-create-description-input').type('Test transaction comment');

        cy.log('Send money');
        cy.get('[data-test="transaction-create-submit-payment"]').click();

        cy.log('Click Return to transactions');
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();

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
        cy.get('[data-test^="transaction-comment-input-"]').type('Test notification{enter}');


        cy.log('Log out');
        cy.get('[data-test="sidenav-signout"]').click();

        cy.log('Enter username and password');
        cy.get('#username').type('Clementina.Schultz64');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open notifications');
        cy.get('[data-test="sidenav-notifications"]').click();

        cy.log('Verify notification is displayed');
        cy.get('[data-test="notifications-list"]')
            .find('li div')
            .contains('Bella Lorem commented on a transaction.')
            .should('exist');
    });

    it('Verify the user can dismiss all notifications', () => {
        cy.visit('/signin');
        cy.wait(3000);

        cy.log('Enter username and password');
        cy.get('#username').type('Julia95');
        cy.get('#password').type('s3cret');

        cy.log('Click sign in');
        cy.get('[data-test="signin-submit"]').click();

        cy.log('Open notifications');
        cy.get('[data-test="sidenav-notifications"]').click();

        cy.log('Dismiss notifications')
        dismissnotifications();
        cy.get('[data-test="empty-list-header"] h2').should('exist');
    });
})