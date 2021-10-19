describe('Translations toggle successfully', () => {
  it('Translates to EN', () => {
    cy.visit('/');
    cy.get('#downshift-0-toggle-button').click({ force: true, timeout: 2000 });
    cy.get('[data-code="en"]').click();
    cy.get('#downshift-0-toggle-button')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Select language');
      });
  });

  it('Translates to ZH CH', () => {
    cy.get('#downshift-0-toggle-button').click({ force: true, timeout: 2000 });
    cy.get('[data-code="cn"]').click();
    cy.get('#downshift-0-toggle-button')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('选择语言');
      });
  });
});
