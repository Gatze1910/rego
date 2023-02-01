describe('Navigation', () => {
  it('should navigate to the imprint page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "imprint" and click it
    cy.get('a[href*="imprint"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/imprint')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Hier wird das Impressum entstehen')
  })
})

export {}