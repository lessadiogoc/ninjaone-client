import type { Meta, StoryObj } from '@storybook/react'

import Search from '../../assets/search.svg?react'
import { Input } from './Input'

const meta = {
  title: 'Form/Input',
  component: Input,
  decorators: [(fn) => <form className="min-h-[120px]">{fn()}</form>],
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'system_name',
    placeholder: 'Enter system name...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'System name:',
    name: 'system_name',
    placeholder: 'e.g: JOHN-MAC',
  },
}

export const WithIcon: Story = {
  args: {
    name: 'Search',
    placeholder: 'Start typing...',
    icon: <Search />,
  },
}
