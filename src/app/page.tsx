import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { DownloadIcon, GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold">{RESUME_DATA.name}</h1>
            <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground">
              {RESUME_DATA.about}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
                rel="noreferrer"
              >
                <GlobeIcon className="h-3 w-3" />
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
              {RESUME_DATA.contact.email ? (
                <Button
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <MailIcon className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {RESUME_DATA.contact.tel ? (
                <Button
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`tel:${RESUME_DATA.contact.tel}`}>
                    <PhoneIcon className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {RESUME_DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={social.url} target="_blank" rel="noreferrer">
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
              <Button
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href="/cv.pdf" target="_blank" rel="noreferrer" download="jatin-kumar.pdf">
                    <DownloadIcon className="h-4 w-4" />
                  </a>
                </Button>
            </div>
            <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
              {RESUME_DATA.contact.email ? (
                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                  <span className="underline">{RESUME_DATA.contact.email}</span>
                </a>
              ) : null}
              {RESUME_DATA.contact.tel ? (
                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                  <span className="underline">{RESUME_DATA.contact.tel}</span>
                </a>
              ) : null}
            </div>
          </div>

          <Avatar className="h-28 w-28">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold">About</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground">
            {RESUME_DATA.summary}
          </p>
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Education</h2>
          {RESUME_DATA.education.map((education) => {
            return (
              <Card key={education.school}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <a
                      href={education.link}
                      className="font-semibold leading-none hover:underline"
                    >
                      {education.school}
                    </a>
                    <div className="text-sm tabular-nums text-gray-500">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  {education.degree}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Work Experience</h2>
          {RESUME_DATA.work.map((work) => {
            return (
              <Card key={work.company}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-x-2 text-base">
                    <h3 className="inline-flex flex-wrap items-start gap-x-2 gap-y-2 font-semibold leading-none">
                      <div className="space-y-1">
                        <a className="hover:underline" href={work.link}>
                          {work.company}
                        </a>
                        <h4 className="font-mono text-sm leading-none">
                          {work.title}
                        </h4>
                      </div>
                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge) => (
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
                      {work.start} - {work.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  {Array.isArray(work.description) ? (
                    <ul className="ml-4 list-disc">
                      {work.description.map((description) => (
                        <li className="mt-1" key={description}>
                          {description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    work.description
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Organisations</h2>
          {RESUME_DATA.organisations.map((org) => {
            return (
              <Card key={org.name}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-x-2 text-base">
                    <h3 className="inline-flex flex-wrap items-start gap-x-1 gap-y-2 font-semibold leading-none">
                      <div className="space-y-1">
                        <a className="hover:underline" href={org.link}>
                          {org.name}
                        </a>
                        <h4 className="font-mono text-sm leading-none">
                          {org.title}
                        </h4>
                      </div>
                      <span className="inline-flex gap-x-1">
                        {org.badges.map((badge) => (
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
                      {org.start} - {org.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  {Array.isArray(org.description) ? (
                    <ul className="ml-4 list-disc">
                      {org.description.map((description) => (
                        <li className="mt-1" key={description}>
                          {description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    org.description
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-1">
            <div className="grid grid-cols-1 gap-3 print:grid-cols-2 print:gap-2 md:grid-cols-2">
              {RESUME_DATA.skillset.map((skill) => {
                return (
                  <Card key={skill.label}>
                    <CardHeader>
                      <h3 className="text-base font-semibold leading-none">
                        {skill.label}
                      </h3>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-1">
                      {skill.skills.map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Section>
        <Section className="scroll-mb-16">
          <h2 className="text-xl font-bold">Projects</h2>
          <div className="-mx-4 grid grid-cols-1 gap-3 print:grid-cols-2 print:gap-2 md:grid-cols-2">
            {RESUME_DATA.projects.map((project) => {
              return (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  link={project.link}
                />
              );
            })}
          </div>
        </Section>
      </section>
      <CommandMenu
        links={[
          {
            url: RESUME_DATA.personalWebsiteUrl,
            title: "Personal Website",
          },
          ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  );
}
