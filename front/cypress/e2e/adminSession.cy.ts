import './loginAdmin.cy';
describe('Admin session spec', () => {
  it('successfully creates a session', () => {
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
    cy.get('button[routerLink="create"]').should('be.visible').click();

    cy.url().should('include', '/sessions/create');

    cy.intercept('POST', '/api/session', {
      statusCode: 201,
      body: {
        id: 1,
        name: 'yoga',
        description: 'A relaxing yoga session',
        date: '2025-01-23',
        teacher_id: 1,
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    cy.wait(1000);
    cy.get('input[formControlName=name]').type('yoga');
    cy.get('input[formControlName=date]').type('2025-01-23');
    cy.get('mat-select[formControlName="teacher_id"]').click();
    cy.wait(1000);
    cy.get('mat-option').contains('Margot DELAHAYE').click();
    cy.get('textarea[formControlName=description]').type(
      'A relaxing yoga session'
    );

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      [
        {
          id: 1,
          name: 'yoga',
          date: '2025-01-23T00:00:00.000+00:00',
          teacher_id: 1,
          description: 'A relaxing yoga session',
          users: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );

    cy.get('button[type=submit]').click();
    cy.wait(1000);

    cy.url().should('include', '/sessions');
  });

  it('Edit a session', () => {
    const sessionName = 'Relax';
    const newSessionName = 'No Stress';
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
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      [
        {
          id: 1,
          name: newSessionName,
          date: '2025-01-23T00:00:00.000+00:00',
          teacher_id: sessionTeacherId,
          description: sessionDescription,
          users: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
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

    cy.intercept('PUT', '/api/session/1', {
      status: 200,
    });
    cy.wait(1000);
    cy.get('button[mat-raised-button][color="primary"]')
      .contains('Edit')
      .click();

    cy.url().should('include', '/sessions/update/1');

    cy.get('input[formControlName=name]').clear();
    cy.get('input[formControlName=name]').type(sessionName);
    cy.get('button[type=submit]').click();
    cy.wait(1000);
    cy.url().should('include', '/sessions');
  });
});
