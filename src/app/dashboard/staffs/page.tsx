'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { Table, THead, TH, TBody, TR, TD, ActionButtons } from '@/components/ui/table';
import { AppChart } from '@/components/charts/app-chart';
import { EmptyStaffs, EmptyRecentActivity } from '@/components/ui/empty-state';
import { NotificationList } from '@/components/dashboard/notification-list';
import { TEACHERS, TEACHER_ACTIVITY } from '@/data/staffs';
import { AVATAR_COLORS } from '@/utils/helpers';

export default function StaffsPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Staff Management"
        subtitle="Staff directory, ratings and workload tracking"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty((v) => !v)}>
              <i className="bi bi-eye" />
              {isEmpty ? 'Show Data' : 'Preview Empty'}
            </Button>
            <Button variant="ghost" size="sm">
              <i className="bi bi-file-earmark-arrow-up" />
              Import
            </Button>
            <Button variant="primary" size="sm">
              <i className="bi bi-person-plus-fill" />
              Add Teacher
            </Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyStaffs />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon="bi bi-person-workspace"
              color="blue"
              value="84"
              label="Total Staff"
              compact
            />
            <StatCard
              icon="bi bi-person-check-fill"
              color="green"
              value="79"
              label="Active"
              compact
            />
            <StatCard
              icon="bi bi-clock-history"
              color="orange"
              value="3"
              label="On Leave"
              compact
            />
            <StatCard
              icon="bi bi-star-fill"
              color="purple"
              value="4.7"
              label="Avg Rating"
              compact
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader
                title="Teacher Directory"
                subtitle="84 staff members"
                action={
                  <Button variant="ghost" size="sm">
                    <i className="bi bi-funnel" />
                    Filter
                  </Button>
                }
              />
              <Table>
                <THead>
                  <TH>Teacher</TH>
                  <TH>Subject</TH>
                  <TH>Students</TH>
                  <TH>Lessons/Wk</TH>
                  <TH>Rating</TH>
                  <TH>Status</TH>
                  <TH>Action</TH>
                </THead>
                <TBody>
                  {TEACHERS.map((t, i) => (
                    <TR key={t.name}>
                      <TD>
                        <NameCell
                          name={t.name}
                          sub={t.subject}
                          index={(i + 3) % AVATAR_COLORS.length}
                        />
                      </TD>
                      <TD>
                        <Tag>{t.subject}</Tag>
                      </TD>
                      <TD className="font-semibold">{t.students}</TD>
                      <TD className="font-semibold">{t.lessons}</TD>
                      <TD>
                        <div className="flex items-center gap-1">
                          <i className="bi bi-star-fill text-[13px] text-orange" />
                          <span className="text-[13px] font-bold">{t.rating}</span>
                        </div>
                      </TD>
                      <TD>
                        <Badge color={t.status === 'Active' ? 'green' : 'orange'}>{t.status}</Badge>
                      </TD>
                      <TD>
                        <ActionButtons />
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </Card>

            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader title="Workload by Dept" />
                <CardBody>
                  <AppChart
                    type="bar"
                    height={180}
                    data={{
                      labels: ['Maths', 'English', 'Physics', 'Biology', 'Chem', 'Econ', 'Gov'],
                      datasets: [
                        {
                          data: [18, 16, 14, 15, 13, 12, 10],
                          backgroundColor: AVATAR_COLORS,
                          borderRadius: 7,
                        },
                      ],
                    }}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Recent Activity" action={<Badge color="green">Live</Badge>} />
                <CardBody className="py-2">
                  {TEACHER_ACTIVITY.length === 0 ? (
                    <EmptyRecentActivity />
                  ) : (
                    <NotificationList
                      items={TEACHER_ACTIVITY.map((a) => ({
                        icon: a.icon,
                        bg: 'var(--color-bg)',
                        iconColor: a.color,
                        text: a.text,
                        time: a.time,
                      }))}
                    />
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
