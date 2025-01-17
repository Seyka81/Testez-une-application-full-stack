import './loginUser.cy';
describe('User session spec', () => {
  it('successfully see a session', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      [
        {
          id: 1,
          name: 'Relax With Yoga',
          date: '2025-01-23T00:00:00.000+00:00',
          teacher_id: 1,
          description: 'A relaxing yoga session',
          users: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
    cy.wait(1000);
    // Validate the redirection and URL
    cy.url().should('include', '/sessions');
  });

  it('Participate to a session', () => {
    const sessionName = 'Relax With Yoga';
    const sessionTeacherId = 1;
    const sessionDescription = 'A relaxing yoga session';
    let sessionUsers: Number[] = [1];
    let push: boolean;

    cy.intercept('GET', '/api/teacher/1', {
      body: {
        id: 1,
        lastName: 'DELAHAYE',
        firstName: 'Margot',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    cy.intercept('POST', '/api/session/1/participate/1', {
      status: 200,
    });

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
        users: sessionUsers,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    cy.get('button span').contains('Detail').click();
    cy.wait(1000);
    cy.get('h1')
      .contains(sessionName)
      .then(() => {
        sessionUsers.push(1);
        cy.get('button span')
          .contains('participate')
          .click()
          .then(() => {
            cy.wait(500);
            cy.get('button span').contains('Do not participate');
            cy.get('span[class=ml1]').contains('1 attendees');
          });
      });
  });

  it('Do not participate to a session', () => {
    const sessionName = 'Relax With Yoga';
    const sessionTeacherId = 1;
    const sessionDescription = 'The course you need if you want to be happy.';

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

    cy.intercept('DELETE', '/api/session/1/participate/1', {
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

    cy.get('button span').contains('Do not participate').click();
    cy.get('span[class=ml1]').contains('0 attendees');
  });
});
