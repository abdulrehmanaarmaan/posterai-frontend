import type { TemplateOccasion } from '@/types/template';

export const OCCASIONS: Array<{
  value: TemplateOccasion;
  label: string;
}> = [
  {
    value: 'election',
    label: 'Election',
  },
  {
    value: 'campaign',
    label: 'Campaign',
  },
  {
    value: 'meeting',
    label: 'Meeting',
  },
  {
    value: 'rally',
    label: 'Rally',
  },
  {
    value: 'celebration',
    label: 'Celebration',
  },
  {
    value: 'awareness',
    label: 'Awareness',
  },
  {
    value: 'general',
    label: 'General',
  },
];