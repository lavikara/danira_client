'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table';
import { ProgressRow } from '@/components/ui/progress-bar';
import { AppChart } from '@/components/charts/app-chart';
import { EmptySubjects, EmptyTableRow } from '@/components/ui/empty-state';
import { SUBJECTS, SUBJECTS_BY_DEPARTMENT, TOP_SUBJECTS_BY_ENROLLMENT } from '@/data/subjects';

export default function SubjectsPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  const total = SUBJECTS.length;
  const core = SUBJECTS.filter((s) => s.category === 'Core').length;
  const elective = total - core;
  const avgScore = (SUBJECTS.reduce((sum, s) => sum + s.avgScore, 0) / total).toFixed(1);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Subjects"
        subtitle="Manage subjects, departments and curriculum allocation"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty((v) => !v)}>
              <i className="bi bi-eye" />
              {isEmpty ? 'Show Data' : 'Preview Empty'}
            </Button>
            <Button variant="primary" size="sm">
              <i className="bi bi-plus-circle-fill" />
              Add Subject
            </Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptySubjects />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon="bi bi-book-half"
              color="blue"
              value={String(total)}
              label="Total Subjects"
              compact
            />
            <StatCard
              icon="bi bi-bookmark-star-fill"
              color="green"
              value={String(core)}
              label="Core Subjects"
              compact
            />
            <StatCard
              icon="bi bi-bookmark-fill"
              color="orange"
              value={String(elective)}
              label="Elective Subjects"
              compact
            />
            <StatCard
              icon="bi bi-graph-up-arrow"
              color="purple"
              value={`${avgScore}%`}
              label="Avg Score"
              compact
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader
                title="All Subjects"
                subtitle={`${total} subjects across the curriculum`}
                action={
                  <Button variant="ghost" size="sm">
                    <i className="bi bi-funnel" />
                    Filter
                  </Button>
                }
              />
              <Table>
                <THead>
                  <TH>Subject</TH>
                  <TH>Department</TH>
                  <TH>Category</TH>
                  <TH>Teacher</TH>
                  <TH>Classes</TH>
                  <TH>Students</TH>
                  <TH>Avg Score</TH>
                </THead>
                <TBody>
                  {SUBJECTS.length === 0 ? (
                    <EmptyTableRow colSpan={7} icon="bi-book-half" message="No subjects added" />
                  ) : (
                    SUBJECTS.map((s, i) => (
                      <TR key={s.code}>
                        <TD>
                          <div className="font-semibold whitespace-nowrap">{s.name}</div>
                          <div className="mt-0.5 text-[11.5px] text-t3">{s.code}</div>
                        </TD>
                        <TD>
                          <Tag>{s.department}</Tag>
                        </TD>
                        <TD>
                          <Badge color={s.category === 'Core' ? 'blue' : 'purple'}>
                            {s.category}
                          </Badge>
                        </TD>
                        <TD>
                          <NameCell name={s.teacher} index={i % 10} />
                        </TD>
                        <TD className="font-semibold">{s.classes}</TD>
                        <TD className="font-semibold">{s.students}</TD>
                        <TD>
                          <Badge
                            color={s.avgScore >= 70 ? 'green' : s.avgScore >= 60 ? 'orange' : 'red'}
                          >
                            {s.avgScore}%
                          </Badge>
                        </TD>
                      </TR>
                    ))
                  )}
                </TBody>
              </Table>
            </Card>

            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader title="Subjects by Department" />
                <CardBody>
                  <div className="h-50">
                    <AppChart
                      type="doughnut"
                      data={{
                        labels: SUBJECTS_BY_DEPARTMENT.labels,
                        datasets: [
                          {
                            data: SUBJECTS_BY_DEPARTMENT.data,
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
                <CardHeader title="Top Subjects by Enrollment" />
                <CardBody className="flex flex-col gap-3.5">
                  {TOP_SUBJECTS_BY_ENROLLMENT.map((s) => (
                    <ProgressRow
                      key={s.name}
                      label={s.name}
                      value={s.students}
                      pct={(s.students / TOP_SUBJECTS_BY_ENROLLMENT[0].students) * 100}
                      color={s.color}
                    />
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
