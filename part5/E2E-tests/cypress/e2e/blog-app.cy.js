describe('Blog app', function() {
  beforeEach(function() {
    /* const user = {
      "name": "Test User",
      "username": "testuser",
      "password": "testpassword"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) */
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('form').should('be.visible')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-button').should('exist')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()

    cy.contains('Test User logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('testuser')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Username or password is incorrect')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'Test User logged in')
  })
})