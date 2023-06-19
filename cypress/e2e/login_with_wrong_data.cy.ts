describe('The Login With Wrong Data', () => {
  it('successfully login', () => {
    cy.visit('/')
    cy.get('#login').type('nikitadskksksidenko2@gmail.com')
    cy.get('#password').type('123ksksks4')
    cy.get('#button_login').click()
  })
})