import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Plus from '../../assets/plus.svg?react'

import { Button } from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'flat'] },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Flat: Story = {
  args: {
    variant: 'flat',
    children: 'Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Button',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    icon: <Plus />,
    children: 'Add more',
  },
}
