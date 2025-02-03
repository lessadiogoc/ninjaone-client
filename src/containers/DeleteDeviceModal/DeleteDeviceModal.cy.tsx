import { mount } from 'cypress/react'
import { DeleteDeviceModal } from './DeleteDeviceModal'
import { Device } from '../../types'

describe('DeleteDeviceModal', () => {
  it('submits the form', () => {
    const device: Device = { id: '1', system_name: 'JOHN-WINDOWS', type: 'WINDOWS', hdd_capacity: '512' }
    const onClose = cy.stub()
    const onDeleteCallback = cy.stub()
    cy.intercept('DELETE', '**/devices/1', {
      body: 1,
    }).as('deleteDevice')

    mount(<DeleteDeviceModal device={device} onClose={onClose} onDeleteCallback={onDeleteCallback} />)

    cy.get('button').contains('Delete').click()

    cy.wait('@deleteDevice').then(() => {
      cy.wrap(onClose).should('have.been.calledOnce')
      cy.wrap(onDeleteCallback).should('have.been.calledOnce')
    })
  })
})
