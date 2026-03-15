describe('Login Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
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
    cy.get('input[placeholder="Email"]').type('fulan@mail.com');
    cy.get('input[placeholder="Password"]').type('beraskencur');

    cy.contains('button', 'Login').click();

    cy.contains('button', 'Sign Out').should('be.visible');
  });
});
