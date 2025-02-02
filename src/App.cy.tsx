import { mount } from 'cypress/react'
import App from './App'

it('mounts', () => {
  mount(<App />)
  cy.get('[data-cy=increment]').click()
  cy.get('[data-cy=counter]').should('have.text', '1')
})
