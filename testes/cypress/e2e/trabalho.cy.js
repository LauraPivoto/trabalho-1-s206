/// <reference types = "cypress"/>

describe('Criando cenário de teste para o SauceDemo', () => {

  

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
  });

  //Essa página demora para responder se for fazer mais de um teste, então fazer um teste de cada vez.

  it('Caso de teste: Fazendo login de um usuário de forma correta(existente)', () => {

    cy.get('[data-test="username"]').type("problem_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
  })

  it('Caso de teste: Logando um usuário da forma incorreta(senha incorreta)', () => {

    cy.get('[data-test="username"]').type("problem_use")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should("contain.text", "Epic sadface: Username and password do not match any user in this service")

  })

  it('Caso de teste: Adicionando um item no carrinho', () => {

      cy.get('[data-test="username"]').type("error_user")
      cy.get('[data-test="password"]').type("secret_sauce")
      cy.get('[data-test="login-button"]').click()

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('[data-test="remove-sauce-labs-backpack"]').should("contain.text", "Remove")

  })  

  it('Caso de teste: Login usuario sem senha', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type("problem_user")
    cy.get('[data-test="login-button"]').click()
    cy.get('.error-message-container [data-test="error"]').should('have.text', 'Epic sadface: Password is required')
  })

  it('Caso de teste: Login usuario sem user (somente senha)', () => {
      cy.visit('https://www.saucedemo.com/')
      cy.get('[data-test="password"]').type("secret_sauce")
      cy.get('[data-test="login-button"]').click()
      cy.get('.error-message-container [data-test="error"]').should('have.text', 'Epic sadface: Username is required')
  })

  it('Caso de teste: Fazendo logout', () => {
      cy.visit('https://www.saucedemo.com')

      cy.get('[data-test="username"]').type("error_user")
      cy.get('[data-test="password"]').type("secret_sauce")
      cy.get('[data-test="login-button"]').click()
      cy.get('#react-burger-menu-btn').click()
      cy.get('#logout_sidebar_link').click()
      cy.url().should('include', 'https://www.saucedemo.com/')
  })  
    
})
