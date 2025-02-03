import type { Meta, StoryObj } from '@storybook/react'

import { Menu, MenuItem } from './Menu'

const meta = {
  title: 'UI/Menu',
  component: Menu,
  decorators: [(fn) => <div className="min-h-[120px]">{fn()}</div>],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuItem>Edit</MenuItem>
        <MenuItem variant="danger">Delete</MenuItem>
      </>
    ),
  },
}
