/// <reference types="cypress" />

describe('<Login />', () => {
    it('<Login /> - Validation, user authentication and alerts', () => {
        cy.visit('/');

        cy.get('[data-cy=submit-login]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'alert-error')
            .invoke('text')
            .should('eq', 'All fields required');

        cy.get('[data-cy=email-input]').type('nouser@email.com');
        cy.get('[data-cy=password-input]').type('123');

        cy.get('[data-cy=submit-login]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'alert-error')
            .invoke('text')
            .should('eq', 'User not registered');

        cy.get('[data-cy=email-input]').clear().type('email@email.com');
        cy.get('[data-cy=password-input]').type('123');

        cy.get('[data-cy=submit-login]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'alert-error')
            .invoke('text')
            .should('eq', 'Incorrect password');

        cy.get('[data-cy=password-input]').clear().type('12345');

        cy.get('[data-cy=submit-login]').click();
        cy.get('[data-cy=select-project]')
            .should('exist')
            .invoke('text')
            .should('eq', 'Select a project');

        cy.get('[data-cy=logout]')
            .should('exist')
            .click();
    });
});