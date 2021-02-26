import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Location e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/locations*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('location');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Locations', () => {
    cy.intercept('GET', '/api/locations*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('location');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Location').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Location page', () => {
    cy.intercept('GET', '/api/locations*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('location');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('location');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Location page', () => {
    cy.intercept('GET', '/api/locations*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('location');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Location');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Location page', () => {
    cy.intercept('GET', '/api/locations*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('location');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Location');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Location', () => {
    cy.intercept('GET', '/api/locations*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('location');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Location');

    cy.get(`[data-cy="streetAddress"]`)
      .type('generation Frozen', { force: true })
      .invoke('val')
      .should('match', new RegExp('generation Frozen'));

    cy.get(`[data-cy="postalCode"]`)
      .type('Director protocol', { force: true })
      .invoke('val')
      .should('match', new RegExp('Director protocol'));

    cy.get(`[data-cy="city"]`).type('North Ciaramouth', { force: true }).invoke('val').should('match', new RegExp('North Ciaramouth'));

    cy.get(`[data-cy="stateProvince"]`)
      .type('Mountains Sleek Plastic', { force: true })
      .invoke('val')
      .should('match', new RegExp('Mountains Sleek Plastic'));

    cy.setFieldSelectToLastOfEntity('country');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/locations*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('location');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Location', () => {
    cy.intercept('GET', '/api/locations*').as('entitiesRequest');
    cy.intercept('GET', '/api/locations/*').as('dialogDeleteRequest');
    cy.intercept('DELETE', '/api/locations/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('location');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('location').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/locations*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('location');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
