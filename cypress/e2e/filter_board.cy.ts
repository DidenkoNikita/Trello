describe('The Filter Board', () => {
  it('successfully login', () => {
    cy.visit('/');
    cy.get('#login').type('nikitadidenko2@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#button_login').click();

    cy.get('#filter_form').type('Board');
    cy.get('#filter_button').click();
  })
})