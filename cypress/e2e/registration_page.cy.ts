;describe('The Registration Page', () => {
  it('successfully registration', () => {
    cy.visit('/');
    cy.get('#registration_button').click();

    cy.get('#registration').type('kolyasik2011@gmail.com');
    cy.get('#full_name').type('Vadim Agarkov');
    cy.get('#registration_password').type('1234');
    cy.get('#button_registration').click();

    cy.get('#create_board').click();
    cy.get('#outlined-basic').type('что-то там');
    cy.get('#create').click();

    cy.get('#create_task').click();
    cy.get('#outlined-basic').type('что угодно');
    cy.get('#create').click();

    cy.get('#completed').click();

    cy.get('#update_task').click();
    cy.get('#outlined-basic').type('задача');
    cy.get('#create').click();

    cy.get('#update_board').click();
    cy.get('#outlined-basic').type('доска');
    cy.get('#create').click();

    cy.get('#logout').click();
  })

  it('successfully login', () => {
    cy.visit('/');
    cy.get('#login').type('kolyasik2011@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#button_login').click();

    cy.get('#about_us_link').click();
    cy.get('#come_back').click();

    cy.get('#our_project_link').click();
    cy.get('#come_back').click();

    cy.get('#about_us_link').click();
    cy.get('#come_back').click();

    cy.get('#logout').click();
  })
})