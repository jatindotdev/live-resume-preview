import { ResumeData } from '@/lib/types';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type Props = ResumeData['projects'][number];

export function ProjectCard({ title, description, techStack, link }: Props) {
  return (
    <Card className="flex flex-col overflow-hidden border border-muted p-3">
      <CardHeader className="">
        <div className="space-y-1">
          <CardTitle className="text-base">
            {link ? (
              <a
                href={link.href}
                target="_blank"
                className="inline-flex items-center gap-1 hover:underline"
                rel="noreferrer"
              >
                {title} <span className="h-1 w-1 rounded-full bg-green-500" />
              </a>
            ) : (
              title
            )}
          </CardTitle>
          <div className="hidden font-mono text-xs underline print:visible">
            {link?.href
              .replace('https://', '')
              .replace('www.', '')
              .replace('/', '')}
          </div>
          <CardDescription className="font-mono text-xs">
            {Array.isArray(description) ? (
              <ul className="my-2 ml-4 list-disc">
                {description.map(description => (
                  <li className="mt-1" key={description}>
                    {description}
                  </li>
                ))}
              </ul>
            ) : (
              description
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <div className="mt-2 flex flex-wrap gap-1">
          {techStack.map(stack => (
            <Badge
              className="px-1 py-0 text-[10px]"
              variant="secondary"
              key={stack}
            >
              {stack}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
