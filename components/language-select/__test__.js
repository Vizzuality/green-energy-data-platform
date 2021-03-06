describe('Translations toggle successfully', () => {
  it('Translates to EN', () => {
    cy.visit('/signin');
    cy.get('#downshift-0-toggle-button').click();
    cy.get('[data-code="en_GB"]').click();
    cy.get('#downshift-0-toggle-button')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Select language');
      });
  });

  it('Translates to ZH CH', () => {
    cy.get('#downshift-0-toggle-button').click();
    cy.get('[data-code="zh_CN"]').click();
    cy.get('#downshift-0-toggle-button')
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('选择语言');
      });
  });
});
