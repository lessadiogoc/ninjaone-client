import type { Meta, StoryObj } from '@storybook/react'

import { Menu, MenuItem } from './Menu'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Menu',
  component: Menu,
  decorators: [(fn) => <div className="min-h-[120px]">{fn()}</div>],
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
