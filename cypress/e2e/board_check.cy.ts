describe('The Board Check', () => {
  it('successfully login', () => {
    cy.visit('/')
    cy.get('#login').type('nikitadidenko2@gmail.com')
    cy.get('#password').type('1234')
    cy.get('#button_login').click()

    cy.get('#create_board').click()
    cy.get('#outlined-basic').type('sjjdjsjj jsjdjjsdjjjjjjsjdjssjsjjs sjjljksscjkdkjnkjc sjjnskcjcjnknjknjxk sjknjkscnkxjcnknksnjk jinsdnnjnjnjkcn jnkcdnjkdndcnj djkkjcdnjcdnj')
    cy.get('#create').click()

    cy.get('#create_task').click()
    cy.get('#outlined-basic').type('sjjdjsjj jsjdjjsdjjjjjjsjdjssjsjjs sjjljksscjkdkjnkjc sjjnskcjcjnknjknjxk sjknjkscnkxjcnknksnjk jinsdnnjnjnjkcn jnkcdnjkdndcnj djkkjcdnjcdnj')
    cy.get('#create').click()
  })
})