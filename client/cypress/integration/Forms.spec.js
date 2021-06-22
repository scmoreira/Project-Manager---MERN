/// <reference types="cypress" />

describe('<Forms />', () => {
    it('<Login /> - Check home page', () => {
        cy.visit('/');

        cy.get('[data-cy=title]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Login');
        cy.get('[data-cy=login-form]').should('exist');
        cy.get('[data-cy=email-input]').should('exist');
        cy.get('[data-cy=password-input]').should('exist');
        cy.get('[data-cy=submit-login]')
            .should('exist')
            .should('have.value', 'Login')
            .should('have.class', 'btn')
            .and('have.class', 'btn-primary');
        cy.get('[data-cy=register-link]')
            .should('exist')
            .should('have.prop', 'tagName')
            .should('eq', 'A');
        cy.get('[data-cy=register-link]')
            .should('have.attr', 'href')
            .should('eq', '/register');

        cy.visit('/register');
    });

    it('<Register /> - Check register page', () => {
        cy.get('[data-cy=title]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Register');
        cy.get('[data-cy=register-form]').should('exist');
        cy.get('[data-cy=username-input]').should('exist');
        cy.get('[data-cy=email-input]').should('exist');
        cy.get('[data-cy=password-input]')
            .should('exist')
            .should('have.prop', 'type')
            .should('eq', 'password');
        cy.get('[data-cy=confirmPass-input]')
            .should('exist')
            .should('have.prop', 'type')
            .should('eq', 'password');
        cy.get('[data-cy=submit-register]')
            .should('exist')
            .should('have.value', 'Register')
            .should('have.class', 'btn')
            .and('have.class', 'btn-primary');
        cy.get('[data-cy=login-link]')
            .should('exist')
            .should('have.prop', 'tagName')
            .should('eq', 'A');
        cy.get('[data-cy=login-link]')
            .should('have.attr', 'href')
            .should('eq', '/');

        cy.visit('/');
    });
});