describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
            //System will already open issue creating modal in beforeEach block  
            cy.visit(url + '/board?modal-issue-create=true');
        });
    });
    it('Should create an issue', () => {
        cy.get('[data-testid="modal:issue-create"]').within(() => {

            cy.get('[data-testid="select:type"]').click();
            cy.get('[data-testid="select-option:Bug"]')
                .trigger('click');
            cy.get('input[name="title"]').click();
            cy.get('input[name="title"]').type('Diana');
            cy.get('button[type="submit"]').click();
        })
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '5')
                .first()
                .find('p')
                .contains('Diana')
                .click();

        })
        //adding
        cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {

            //Check that (“No Time Logged” label is visible)
            cy.contains('No time logged').should('be.visible');
            cy.get('input[placeholder="Number"]').clear().should('have.attr', 'value', '')
            cy.get('input[placeholder="Number"]').type('10')
            cy.contains('10h estimated', { timeout: 10000 }).should('be.visible')
            cy.get('[data-testid="icon:close"]').first().click()
            cy.get('[data-testid="modal:issue-details"]').should('not.exist')
        });
        cy.get('[data-testid="board-list:backlog"]').should('be.visible')
        cy.get('[data-testid="list-issue"]').first().click()
        cy.get('input[placeholder="Number"]').should('have.value', '10');

        //editing

        cy.get('input[placeholder="Number"]').clear().type('20')
        cy.contains('20h estimated', { timeout: 10000 }).should('be.visible')
        cy.get('[data-testid="icon:close"]').first().click()
        cy.get('[data-testid="modal:issue-details"]').should('not.exist')
        cy.get('[data-testid="board-list:backlog"]').should('be.visible')
        cy.get('[data-testid="list-issue"]').first().click()
        cy.get('input[placeholder="Number"]').should('have.value', '20')
            .clear()
            .trigger('click')

        //deleting

        cy.get('input[placeholder="Number"]').clear()
        cy.get('[data-testid="icon:close"]').first().click()
        cy.get('[data-testid="modal:issue-details"]').should('not.exist')
        cy.get('[data-testid="board-list:backlog"]').should('be.visible')
        cy.get('[data-testid="list-issue"]').first().click()

        //Log time to time logging functionalty

        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('input[placeholder="Number"]').eq(1).clear().type('value=2');
        cy.get('input[placeholder="Number"]').eq(2).clear().type('value=5');
        cy.contains('button', 'Done').click();

        //remove logged time

        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('input[placeholder="Number"]').eq(1).clear()
        cy.get('input[placeholder="Number"]').eq(2).clear()
        cy.contains('button', 'Done').click();


    })



});