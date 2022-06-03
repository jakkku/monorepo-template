describe('test', () => {
  it('finds the content "Hello monorepo"', () => {
    cy.visit('/');

    cy.contains('Hello monorepo');
  });
});
