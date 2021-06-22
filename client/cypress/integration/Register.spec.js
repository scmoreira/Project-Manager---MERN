/// <reference types="cypress" />

describe('<Register />', () => {
    it('<Register /> - Validation and alerts', () => {
        cy.visit('/register');

        cy.get('[data-cy=submit-register]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'alert-error')
            .invoke('text')
            .should('eq', 'All fields required');

        cy.get('[data-cy=username-input]').type('username');
        cy.get('[data-cy=email-input]').type('email@email.com');
        cy.get('[data-cy=password-input]').type('123');
        cy.get('[data-cy=confirmPass-input]').type('123');

        cy.get('[data-cy=submit-register]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'alert-error')
            .invoke('text')
            .should('eq', 'Password must be at least 5 characters');

        cy.get('[data-cy=password-input]').clear().type('12345');
        cy.get('[data-cy=confirmPass-input]').clear().type('12344');

        cy.get('[data-cy=submit-register]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'alert-error')
            .invoke('text')
            .should('eq', 'Passwords do not match');

        cy.get('[data-cy=confirmPass-input]').clear().type('12345');

        cy.get('[data-cy=submit-register]').click();
        cy.get('[data-cy=select-project]')
            .should('exist')
            .invoke('text')
            .should('eq', 'Select a project');

        cy.get('[data-cy=logout]')
            .should('exist')
            .click();
    });

    it('<Register /> - Check duplicated users', () => {
        cy.visit('/register');

        cy.get('[data-cy=username-input]').type('username');
        cy.get('[data-cy=email-input]').type('email@email.com');
        cy.get('[data-cy=password-input]').type('12345');
        cy.get('[data-cy=confirmPass-input]').type('12345');

        cy.get('[data-cy=submit-register]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'alert-error')
            .invoke('text')
            .should('eq', 'User not available');
    });
});
