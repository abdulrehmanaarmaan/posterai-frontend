import TemplateCard from './TemplateCard';

import type {
  Template,
} from '@/types/template';

interface TemplateGridProps {
  templates: Template[];
}

export default function TemplateGrid({
  templates,
}: TemplateGridProps) {
  if (!templates.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <p className="text-sm text-slate-500">
          No templates found for this occasion.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template._id}
          template={template}
        />
      ))}
    </div>
  );
}