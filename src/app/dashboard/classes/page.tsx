'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Tag } from '@/components/ui/badge';
import { AppChart } from '@/components/charts/app-chart';
import { EmptyClasses } from '@/components/ui/empty-state';
import { CLASSES, SUBJECTS_OFFERED, CLASS_LEVEL_DISTRIBUTION } from '@/data/classes';
import { avatarColor, initials } from '@/utils/helpers';

export default function ClassesPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Class Management"
        subtitle="Manage classes, form teachers and subject allocation"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty((empty) => !empty)}>
              <i className="bi bi-eye" />
              {isEmpty ? 'Show Data' : 'Preview Empty'}
            </Button>
            <Button variant="primary" size="sm">
              <i className="bi bi-plus-circle-fill" />
              Create Class
            </Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyClasses />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon="bi bi-journal-bookmark-fill"
              color="blue"
              value="28"
              label="Total Classes"
              compact
            />
            <StatCard
              icon="bi bi-people-fill"
              color="green"
              value="44.6"
              label="Avg Class Size"
              compact
            />
            <StatCard
              icon="bi bi-book-half"
              color="orange"
              value="14"
              label="Subjects Offered"
              compact
            />
            <StatCard
              icon="bi bi-graph-up-arrow"
              color="purple"
              value="71.4%"
              label="Avg Performance"
              compact
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader title="All Classes" subtitle="28 active classes" />
              <CardBody className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CLASSES.map((c, i) => (
                  <div
                    key={c.name}
                    className="rounded-xl border-[1.5px] border-border-light p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
                  >
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-[14px] font-bold text-t1">{c.name}</span>
                      <span className="rounded-md bg-primary-50 px-2 py-0.5 text-[11px] font-bold text-primary">
                        Rm {c.room}
                      </span>
                    </div>
                    <div className="mb-3 flex items-center gap-2">
                      <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[9px] font-bold text-white"
                        style={{ backgroundColor: avatarColor(i) }}
                      >
                        {initials(c.formTeacher)}
                      </div>
                      <span className="truncate text-[12px] text-t2">{c.formTeacher}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-t2">
                      <span>
                        <i className="bi bi-people" /> {c.students}
                      </span>
                      <span>
                        <i className="bi bi-book" /> {c.subjects} subj.
                      </span>
                      <span className="font-bold text-primary">{c.avg}% avg</span>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>

            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader title="Students by Level" />
                <CardBody>
                  <div className="h-50">
                    <AppChart
                      type="doughnut"
                      data={{
                        labels: CLASS_LEVEL_DISTRIBUTION.labels,
                        datasets: [
                          {
                            data: CLASS_LEVEL_DISTRIBUTION.data,
                            backgroundColor: [
                              '#2563EB',
                              '#10B981',
                              '#F59E0B',
                              '#8B5CF6',
                              '#EF4444',
                              '#06B6D4',
                            ],
                            borderWidth: 0,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom',
                            labels: { boxWidth: 10, font: { size: 11 } },
                          },
                        },
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Subjects Offered" subtitle="14 subjects" />
                <CardBody className="flex flex-wrap gap-2">
                  {SUBJECTS_OFFERED.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
