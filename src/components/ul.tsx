import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export type UlProps = React.HTMLAttributes<HTMLUListElement> & {
  items: string[];
  prefix?: React.ReactNode;
};

const Ul = forwardRef<HTMLUListElement, UlProps>((props, ref) => {
  const { className, items, prefix = '•', ...rest } = props;
  return (
    <ul ref={ref} className={cn('list-none', className)} {...rest}>
      {items.map(item => (
        <li key={item}>
          <span className="font-semibold">{prefix} </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
});

Ul.displayName = 'Ul';

export default Ul;
