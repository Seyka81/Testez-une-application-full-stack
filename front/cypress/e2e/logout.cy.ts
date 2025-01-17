describe('Logout spec', () => {
  it('Logout', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false,
      },
    });

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []
    );

    cy.get('input[formControlName=email]').type('test@gmail.com');
    cy.get('input[formControlName=password]').type(
      `${'passsword'}{enter}{enter}`
    );

    cy.url().should('include', '/sessions');
    cy.get('span[class=link]').contains('Logout').click();

    cy.url().should('eq', 'http://localhost:4200/');
  });
});
