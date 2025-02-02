import { mount } from 'cypress/react'
import { DevicesTable } from './DevicesTable'
import { Device } from '../../types'

const DEVICES: Device[] = [
  {
    id: '1',
    system_name: 'JOHN-MAC',
    type: 'MAC',
    hdd_capacity: '256',
  },
  {
    id: '2',
    system_name: 'JANE-MAC',
    type: 'WINDOWS',
    hdd_capacity: '512',
  },
  {
    id: '3',
    system_name: 'JOE-LINUX',
    type: 'LINUX',
    hdd_capacity: '1024',
  },
]

describe('DevicesTable', () => {
  it('renders the table', () => {
    mount(<DevicesTable devices={DEVICES} onEditClick={() => {}} onDeleteClick={() => {}} />)

    cy.get('[data-cy=device-row-1]').contains('JOHN-MAC')
    cy.get('[data-cy=device-row-2]').contains('JANE-MAC')
    cy.get('[data-cy=device-row-3]').contains('JOE-LINUX')
  })

  it('calls the edit handler', () => {
    const onEditClick = cy.stub()
    mount(<DevicesTable devices={DEVICES} onEditClick={onEditClick} onDeleteClick={() => {}} />)

    cy.get('[data-cy=device-row-1] [data-cy=menu]').click()
    cy.get('[data-cy=menu-item]').contains('Edit').click()
    cy.wrap(onEditClick).should('have.been.calledOnceWith', DEVICES[0])
  })

  it('calls the delete handler', () => {
    const onDeleteClick = cy.stub()
    mount(<DevicesTable devices={DEVICES} onEditClick={() => {}} onDeleteClick={onDeleteClick} />)

    cy.get('[data-cy=device-row-3] [data-cy=menu]').click()
    cy.get('[data-cy=menu-item]').contains('Delete').click()
    cy.wrap(onDeleteClick).should('have.been.calledOnceWith', DEVICES[2])
  })
})
