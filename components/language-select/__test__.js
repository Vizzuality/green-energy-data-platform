describe('Translations toggle successfylly', () => {
  it('Translate from EN to ZH CH', () => {
    cy.visit('http://localhost:3000');
    cy.get('#downshift-0-toggle-button').click()
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Select language');
        cy.get('[data-code="zh_CN"]').click();
      });

    cy.get('#downshift-0-toggle-button').click()
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('选择语言');
      });
  });
});
