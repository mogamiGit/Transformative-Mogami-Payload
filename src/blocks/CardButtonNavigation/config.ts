import type { Block } from 'payload'

export const CardButtonNavigation: Block = {
  slug: 'cardButtonNavigation',
  interfaceName: 'CardButtonNavigationBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'View full portfolio',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      defaultValue: 'explore_projects()',
      label: 'Description',
    },
    {
      name: 'href',
      type: 'text',
      label: 'Link URL',
    },
  ],
  labels: {
    plural: 'Card Button Navigations',
    singular: 'Card Button Navigation',
  },
}
