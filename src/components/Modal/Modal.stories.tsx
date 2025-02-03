import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './Modal'
import { Button } from '../Button/Button'

const meta = {
  title: 'UI/Modal',
  component: Modal,
  decorators: [(fn) => <div className="min-h-[300px]">{fn()}</div>],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Modal title',
    open: true,
    onClose: () => {},
    children: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit mi, aliquam integer posuere proin suscipit pulvinar
          ultrices
        </p>
        <div className="mt-6 flex justify-end">
          <Button type="button">Button</Button>
        </div>
      </>
    ),
  },
}
