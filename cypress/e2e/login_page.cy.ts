describe('The Login Page', () => {
  it('successfully login;', () => {
    cy.visit('/');
    cy.get('#login').type('nikitadidenko2@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#button_login').click();

    cy.get('#create_board').click();
    cy.get('#outlined-basic').type('что-то там');
    cy.get('#create').click();

    cy.get('#about_us_link').click();
    cy.get('#come_back').click();

    cy.get('#create_task').click();
    cy.get('#outlined-basic').type('что угодно');
    cy.get('#create').click();

    cy.get('#completed').click();

    cy.get('#our_project_link').click();
    cy.get('#come_back').click();

    cy.get('#update_task').click();
    cy.get('#outlined-basic').type('задача');
    cy.get('#create').click();

    cy.get('#update_board').click();
    cy.get('#outlined-basic').type('доска');
    cy.get('#create').click();

    cy.get('#about_us_link').click();
    cy.get('#come_back').click();

    cy.get('#remove_task').click();
    cy.get('#remove_board').click();

    cy.get('#logout').click();
  })
})