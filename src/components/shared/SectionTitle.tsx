interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
}

export default function SectionTitle({
  badge,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="text-center">
      {badge && (
        <span className="text-sm uppercase tracking-wider text-amber-600">
          {badge}
        </span>
      )}

      <h2 className="font-heading mt-3 text-4xl">{title}</h2>

      {description && (
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
