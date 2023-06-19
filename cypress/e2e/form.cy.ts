describe('The Form', () => {
  it('successfully registration', () => {
    cy.visit('/')

    cy.get('#registration_button').click()

    cy.get('#registration').type('kolyasik2011')
    cy.get('#full_name').type('Vadim Agarkov')
    cy.get('#registration_password').type('123')
    cy.get('#button_registration').click()

    cy.get('#logout').click()
  })

  it('successfully login', () => {
    cy.visit('/')
    cy.get('#login').type('kolyasik2011')
    cy.get('#password').type('123')
    cy.get('#button_login').click()

    cy.get('#logout').click()
  })
})