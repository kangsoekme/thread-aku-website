describe('Login Spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window.alert', (str) => {
      expect(str).to.equal('"email" is not allowed empty');
    });
  });

  it('should display alert when password empty', () => {
    cy.get('input[placeholder="Email"]').type('fulan@mail.com');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window.alert', (str) => {
      expect(str).to.equal('"password" is not allowed empty');
    });
  });

  it('should display alert when email or password is wrong', () => {
    cy.get('input[placeholder="Email"]').type('fulan@mail.com');
    cy.get('input[placeholder="Password"]').type('wrong_password');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window.alert', (str) => {
      expect(str).to.equal('User email or password is wrong');
    });
  });

  it('should display homepage when email or password is correct', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          token: 'fake-token',
        },
      },
    }).as('login');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          user: {
            id: 'user-1',
            name: 'Fulan',
            email: 'fulan@mail.com',
            avatar: 'https://ui-avatars.com/api/?name=Fulan',
          },
        },
      },
    }).as('me');

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          threads: [],
        },
      },
    }).as('threads');

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          users: [
            {
              id: 'user-1',
              name: 'Fulan',
              email: 'fulan@mail.com',
              avatar: 'https://ui-avatars.com/api/?name=Fulan',
            },
          ],
        },
      },
    }).as('users');

    cy.get('input[placeholder="Email"]').type('fulan@mail.com');
    cy.get('input[placeholder="Password"]').type('beraskencur');
    cy.contains('button', /^Login$/).click();

    cy.wait('@login');
    cy.wait('@me');
    cy.wait('@threads');
    cy.wait('@users');

    cy.contains('button', 'Sign Out', { timeout: 10000 }).should('be.visible');
  });
});
