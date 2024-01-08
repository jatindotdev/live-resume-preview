import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { CardHeader } from './ui/card';
import { Badge } from './ui/badge';

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  link?: string;
  badges?: string[];
  extra?: React.ReactNode;
};

const WorkHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <CardHeader ref={ref} className={cn(className)} {...props}>
      <div className="flex items-start justify-between gap-x-2 text-base">
        <h3 className="inline-flex flex-wrap items-start gap-x-2 gap-y-2 leading-none">
          <div>
            <a className="hover:underline font-semibold" href={props.link}>
              {props.title}
            </a>
            {props.subtitle && (
              <h4 className="font-mono text-sm leading-none mt-2">
                {props.subtitle}
              </h4>
            )}
          </div>
          <span className="inline-flex gap-x-1">
            {props.badges?.map(badge => (
              <Badge
                variant="secondary"
                className="align-middle text-xs"
                key={badge}
              >
                {badge}
              </Badge>
            ))}
          </span>
        </h3>
        <div className="whitespace-nowrap text-sm tabular-nums text-gray-500">
          {props.extra}
        </div>
      </div>
    </CardHeader>
  )
);

WorkHeader.displayName = 'CardHeader';

export default WorkHeader;
