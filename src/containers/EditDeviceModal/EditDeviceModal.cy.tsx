import { mount } from 'cypress/react'
import { EditDeviceModal } from './EditDeviceModal'
import { Device } from '../../types'

describe('EditDeviceModal', () => {
  it('submits the form', () => {
    const device: Device = { id: '1', system_name: 'JOHN-WINDOWS', type: 'WINDOWS', hdd_capacity: '512' }
    const onEditCallback = cy.stub()
    cy.intercept('PUT', '**/devices/1', {
      body: 1,
    }).as('updateDevice')

    mount(<EditDeviceModal device={device} onEditCallback={onEditCallback} />)

    cy.get('input[name="system_name"]').clear().type('JOHN-MAC')
    cy.get('[data-cy=select-type]').click()
    cy.get('ul li').contains('Mac').click()
    cy.get('input[name="hdd_capacity"]').clear().type('256')
    cy.get('button[type=submit]').click()

    cy.wait('@updateDevice').then(() => {
      cy.wrap(onEditCallback).should('have.been.calledOnce')
    })
  })
})
