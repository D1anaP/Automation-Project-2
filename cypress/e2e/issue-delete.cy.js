describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
      });
    });
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should delete an issue successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="icon:trash"]')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete issue')
            .click()
            .should('not.exist');

        //getIssueDetailsModal()
        cy.reload();
        
    
    });







});