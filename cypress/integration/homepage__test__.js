describe('loads homepage successfully', () => {
  it('visits homepage', () => {
    cy.intercept({
      url: '/',
    }).as('homepage');

    cy.visit('/');

    // assert that a request to this route received a response with HTTP status 200
    cy.wait('@homepage').its('response.statusCode').should('eq', 200);
  });
});
