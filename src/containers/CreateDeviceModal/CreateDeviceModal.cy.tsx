import { mount } from 'cypress/react'
import { CreateDeviceModal } from './CreateDeviceModal'

describe('CreateDeviceModal', () => {
  it('submits the form', () => {
    const onClose = cy.stub()
    const onCreateCallback = cy.stub()
    cy.intercept('POST', '**/devices', {
      body: {
        id: '1',
        system_name: 'JOHN-WINDOWS',
        type: 'WINDOWS',
        hdd_capacity: '512',
      },
    }).as('createDevice')

    mount(<CreateDeviceModal open onClose={onClose} onCreateCallback={onCreateCallback} />)

    cy.get('input[name="system_name"]').type('JOHN-WINDOWS')
    cy.get('[data-cy=select-type]').click()
    cy.get('ul li').contains('Windows').click()
    cy.get('input[name="hdd_capacity"]').type('512')
    cy.get('button[type=submit]').click()

    cy.wait('@createDevice').then(() => {
      cy.wrap(onClose).should('have.been.calledOnce')
      cy.wrap(onCreateCallback).should('have.been.calledOnce')
    })
  })
})
