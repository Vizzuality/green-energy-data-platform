describe('Translations toggle successfully', () => {
  it('Translates from EN to ZH CH', () => {
    cy.intercept({
      url: '/',
    });
    cy.visit('/');
    cy.get('#downshift-0-toggle-button').click()
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('Select language');
        cy.get('[data-code="zh_CN"]').click();
      });
  });

  it('Translates from ZH CH yo EN', () => {
    cy.get('#downshift-0-toggle-button').click()
      .invoke('text')
      .then((text) => {
        expect(text).to.equal('选择语言');
      });
  });
});
