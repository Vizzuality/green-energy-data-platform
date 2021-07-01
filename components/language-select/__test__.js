describe('Translations toggle successfully', () => {
  it('Translates to EN', () => {
    cy.visit('/');
    cy.get('#downshift-0-toggle-button').click({ force: true, timeout: 2000 });
    cy.get('[data-code="en_GB"]').click();
    cy.get('#downshift-0-toggle-button')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Select language');
      });
  });

  it('Translates to ZH CH', () => {
    cy.get('#downshift-0-toggle-button').click({ force: true, timeout: 2000 });
    cy.get('[data-code="zh_CN"]').click();
    cy.get('#downshift-0-toggle-button')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('选择语言');
      });
  });
});
