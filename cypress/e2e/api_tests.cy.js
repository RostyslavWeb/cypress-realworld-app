const apiUrl = Cypress.env("apiUrl");

describe("Cypress RWA API Tests", () => {

    let authCookie;

    it("should login successfully", () => {
        cy.request("POST", `${apiUrl}/login`, {
            username: "Julia95",
            password: "s3cret",
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("user");
            expect(res.body.user.username).to.eq("Julia95");
            authCookie = res.headers["set-cookie"][0];
        });
    });

    it("should get recent transactions", () => {
        cy.request({
            method: "GET",
            url: `${apiUrl}/transactions/public`,
            headers: { Cookie: authCookie },
        }).then((res) => {
            // Validate response status
            expect(res.status).to.eq(200);

            // Check that the top-level structure has expected keys
            expect(res.body).to.have.all.keys("pageData", "results");

            // Check pagination info
            expect(res.body.pageData).to.include.keys(["page", "limit", "hasNextPages", "totalPages"]);
            expect(res.body.pageData.page).to.be.a("number");
            expect(res.body.pageData.limit).to.be.a("number");

            // Check that results is an array and has at least one transaction
            expect(res.body.results).to.be.an("array");
            expect(res.body.results.length).to.be.greaterThan(0);

            // Validate structure of the first transaction
            const tx = res.body.results[0];
            expect(tx).to.include.keys([
                "receiverName",
                "senderName",
                "amount",
                "description",
                "privacyLevel",
                "status",
                "createdAt",
            ]);

            // Optional sanity checks
            expect(tx.privacyLevel).to.eq("public");
            expect(tx.status).to.eq("complete");
            expect(tx.amount).to.be.a("number");
        });
    });

});