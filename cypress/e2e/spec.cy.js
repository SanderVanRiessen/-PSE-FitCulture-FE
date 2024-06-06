describe('visit fitculture as a user', () => {
  it('can register as a user', () => {
    cy.intercept('POST', '**/public/register').as('registerRequest');

    cy.visit('localhost:8081');
    cy.contains('Register').click();
    cy.url().should('include', '/register');

    cy.get('[id=email]').type('test@test.nl');
    cy.get('input[type="password"][data-pc-name="input"]').type('Test123!@');
    cy.get('[id=name]').type('Test Name');
    cy.get('button:contains("Register")').eq(1).click();

    cy.wait('@registerRequest').its('response').then((response) => {
      expect(response.statusCode).to.eq(500);
    });
  });
  it('can sign in as a user', () => {
    cy.intercept('POST', '**/login').as('loginRequest');

    cy.visit('localhost:8081');
    cy.contains('Login').click();
    cy.url().should('include', '/login');

    cy.get('[id=email1]').type('test@test.nl');
    cy.get('[id=password1]').type('Test123!@');
    cy.get('button:contains("Sign In")').click();

    cy.wait('@loginRequest').its('response').then((response) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.contains('Logout');
  });
  it('can make a forum topic as a user', () => {
    cy.intercept('POST', '**/forum/topic').as('topicRequest');

    cy.visit('localhost:8081');
    cy.contains('Login').click();
    cy.url().should('include', '/login');

    cy.get('[id=email1]').type('test@test.nl');
    cy.get('[id=password1]').type('Test123!@');
    cy.get('button:contains("Sign In")').click();

    cy.contains('Forum').click();
    cy.get('.p-card-body').eq(0).click();
    cy.get('input[placeholder="Topic Title"]').type('test topic title');
    cy.get('input[placeholder="Describe your topic..."]').type('test topic description/post');
    cy.get('button:contains("Create Topic")').click();
    cy.wait('@topicRequest').its('response').then((response) => {
      expect(response.statusCode).to.eq(200);
    });
  });
});

