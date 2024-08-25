describe('Blog app: Login Form', function() {
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

  it('fails with wrong credentials', function() {
    cy.get('#username').type('testuser')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Username or password is incorrect')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'Test User logged in')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()

    cy.contains('Test User logged in')
  })

})

describe('Blog app: Blog List', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()
  })

  it('User can create a new blog post', function() {
    cy.contains('add new blog').click()
    cy.get('#title').type('Test Blog Post')
    cy.get('#author').type('Test User')
    cy.get('#url').type('https://example.com')
    cy.contains('create').click()

    cy.contains('Test Blog Post')
  })


})