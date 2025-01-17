import './loginAdmin.cy';
import './adminSession.cy';
describe('Delete session spec', () => {
  it('Delete a session', () => {
    const sessionName = 'Relax With Yoga';
    const sessionTeacherId = 1;
    const sessionDescription = 'A yoga course.';
    cy.intercept(
      {
        method: 'GET',
        url: '/api/teacher',
      },
      [
        {
          id: 1,
          lastName: 'DELAHAYE',
          firstName: 'Margot',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          lastName: 'THIERCELIN',
          firstName: 'Hélène',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
    cy.wait(500);
    cy.intercept('DELETE', '/api/session/1', {
      status: 200,
    });

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []
    );

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session/1',
      },
      {
        id: 1,
        name: sessionName,
        date: new Date(),
        teacher_id: sessionTeacherId,
        description: sessionDescription,
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    cy.wait(1000);
    cy.get('button span').contains('Detail').click();

    cy.get('button[mat-raised-button][color="warn"]')
      .contains('Delete')
      .click();

    cy.url().should('include', '/sessions');
  });
});
