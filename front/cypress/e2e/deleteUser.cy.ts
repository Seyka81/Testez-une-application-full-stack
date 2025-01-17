import './loginAdmin.cy';
describe('Delete spec', () => {
  it('Account Information', () => {
    const firstName = 'yoga';
    const lastName = 'test';
    const email = 'yoga@test.fr';
    cy.intercept(
      {
        method: 'GET',
        url: '/api/user/1',
      },
      {
        id: 1,
        username: 'YogaUser',
        firstName: firstName,
        lastName: lastName,
        email: email,
        admin: false,
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []
    );

    cy.get('span[routerLink=me]')
      .click()
      .then(() => {
        cy.url()
          .should('include', '/me')
          .then(() => {
            cy.get('p').contains(
              'Name: ' + firstName + ' ' + lastName.toUpperCase()
            );
            cy.get('p').contains('Email: ' + email);
          });
      });
  });
  it('Delete user', () => {
    cy.intercept('DELETE', '/api/user/1', {
      status: 200,
    });

    cy.get('button')
      .contains('Detail')
      .click()
      .then(() => {
        cy.url().should('eq', 'http://localhost:4200/');
      });
  });
});
