/// <reference types="cypress" />

describe('Admin', () => {
    it('<Login /> - Authentication', () => {
        cy.visit('/');

        cy.get('[data-cy=email-input]').clear().type('email@email.com');
        cy.get('[data-cy=password-input]').type('12345');
        cy.get('[data-cy=submit-login]').click();

    });

    it('<Projects /> - Project validation', () => {
        cy.get('[data-cy=new-project-button]').click();

        cy.get('[data-cy=submit-new-project]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'message error')
            .invoke('text')
            .should('eq', 'Project name is requiered');
    });

    it('<Projects /> - Add project', () => {
        cy.get('[data-cy=new-project-input]').type('Testing project');
        cy.get('[data-cy=submit-new-project]').click();

        cy.get('[data-cy=project-list] li:nth-child(1) button').click();
    });

    it('<Tasks /> - Validation and creating tasks', () => {
        cy.get('[data-cy=submit-task]').click();
        cy.get('[data-cy=alert]')
            .should('exist')
            .should('have.class', 'message error')
            .invoke('text')
            .should('eq', 'Task name is requiered');

        cy.get('[data-cy=task-input]').type('Testing task1');
        cy.get('[data-cy=submit-task]').click();

        cy.get('[data-cy=task-input]').type('Testing task2');
        cy.get('[data-cy=submit-task]').click();
    });

    it('<Tasks /> - Task state, edit and delete', () => {
        cy.get('[data-cy=task]:last-child [data-cy=incomplete-task]').click();
        cy.get('[data-cy=task]:last-child [data-cy=complete-task]').should('have.class', 'complete');

        cy.get('[data-cy=task]:last-child [data-cy=complete-task]').click();
        cy.get('[data-cy=task]:last-child [data-cy=incomplete-task]').should('have.class', 'incomplete');

        cy.get('[data-cy=task]:last-child [data-cy=btn-edit]').click();
        cy.get('[data-cy=task-input]').clear().type('Editing task1');
        cy.get('[data-cy=submit-task]').click();

        cy.get('[data-cy=task]:last-child [data-cy=btn-delete]').click();
        cy.get('[data-cy=task]:last-child').invoke('text').should('not.equal', 'Editing task1');
    });
});