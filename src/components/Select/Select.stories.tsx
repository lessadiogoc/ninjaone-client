import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Select } from './Select'

const meta = {
  title: 'Form/Select',
  component: Select,
  decorators: [(fn) => <form className="min-h-[120px]">{fn()}</form>],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: { control: 'object' },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      {
        value: 'WINDOWS',
        label: 'Windows',
      },
      {
        value: 'LINUX',
        label: 'Linux',
      },
    ],
    name: 'device_type',
    value: 'WINDOWS',
  },
}

export const WithLabel: Story = {
  args: {
    options: [
      {
        value: 'WINDOWS',
        label: 'Windows',
      },
      {
        value: 'LINUX',
        label: 'Linux',
      },
    ],
    label: 'Device type:',
    name: 'device_type',
    value: 'WINDOWS',
  },
}
