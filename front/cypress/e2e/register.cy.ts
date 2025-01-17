describe('register spec', () => {
  it('register successfull', () => {
    cy.visit('/register');

    cy.intercept('POST', '/api/auth/register', {
      body: {
        email: 'email',
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
      },
    });

    cy.get('input[formControlName=firstName]').type('yoga');
    cy.get('input[formControlName=lastName]').type('studio');
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    cy.url().should('include', '/login');
  });

  it('Register with error', () => {
    cy.visit('/register');

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 401,
    });

    cy.get('input[formControlName=firstName]').type('yoga');
    cy.get('input[formControlName=lastName]').type('studio');
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );
    cy.wait(1000);
    cy.get('span').contains('An error occurred');
  });

  it('Register sumbit button disabled with someting empty for example firstname', () => {
    cy.visit('/register');

    cy.get('input[formControlName=lastName]').type('yoga');
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    cy.get('button[type=submit]').should('be.disabled');
  });
});
