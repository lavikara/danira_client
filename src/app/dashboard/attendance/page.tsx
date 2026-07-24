'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { StatBar } from '@/components/ui/progress-bar';
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table';
import { AppChart } from '@/components/charts/app-chart';
import { EmptyAttendance, EmptyTableRow } from '@/components/ui/empty-state';
import { ATTENDANCE_BY_CLASS, ATTENDANCE_REGISTER, ATTENDANCE_TREND_30D } from '@/data/attendance';

function classColor(pct: number) {
  if (pct >= 90) return 'var(--color-green)';
  if (pct >= 82) return 'var(--color-orange)';
  return 'var(--color-red)';
}

export default function AttendancePage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Attendance Tracking"
        subtitle="Today, Wednesday 14 May 2025"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty((v) => !v)}>
              <i className="bi bi-eye" />
              {isEmpty ? 'Show Data' : 'Preview Empty'}
            </Button>
            <input
              type="date"
              defaultValue="2025-05-14"
              className="rounded-[9px] border-[1.5px] border-border bg-surface px-3 py-2 text-[13px] text-t1 outline-none focus:border-primary"
            />
            <Button variant="primary" size="sm">
              <i className="bi bi-check2-square" />
              Mark Attendance
            </Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyAttendance />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon="bi bi-people-fill"
              color="blue"
              value="1,141"
              label="Present Today"
              compact
            />
            <StatCard
              icon="bi bi-person-x-fill"
              color="red"
              value="68"
              label="Absent Today"
              compact
            />
            <StatCard
              icon="bi bi-clock-history"
              color="orange"
              value="39"
              label="Late Arrivals"
              compact
            />
            <StatCard
              icon="bi bi-graph-up"
              color="green"
              value="91.4%"
              label="Overall Rate"
              compact
            />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader title="Attendance by Class" subtitle="Today's snapshot" />
              <CardBody>
                <div className="flex flex-col gap-3">
                  {ATTENDANCE_BY_CLASS.map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <span className="w-13.5 shrink-0 text-[12px] font-semibold text-t2">
                        {c.name}
                      </span>
                      <StatBar pct={c.pct} color={classColor(c.pct)} />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="30-Day Trend" subtitle="School-wide average" />
              <CardBody>
                <AppChart
                  type="line"
                  height={210}
                  data={{
                    labels: Array.from({ length: 30 }, (_, i) => i + 1),
                    datasets: [
                      {
                        data: ATTENDANCE_TREND_30D,
                        borderColor: '#2563EB',
                        backgroundColor: 'rgba(37,99,235,.08)',
                        fill: true,
                        tension: 0.35,
                        borderWidth: 2,
                        pointRadius: 0,
                      },
                    ],
                  }}
                  options={{ scales: { y: { min: 75, max: 100 } } }}
                />
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader
              title="Live Attendance Register"
              subtitle="Real-time check-ins"
              action={
                <>
                  <select className="rounded-[9px] border-[1.5px] border-border bg-surface px-2.5 py-1.5 text-[12px] outline-none focus:border-primary">
                    <option>All Classes</option>
                  </select>
                  <Button variant="ghost" size="sm">
                    <i className="bi bi-download" />
                    Export
                  </Button>
                </>
              }
            />
            <Table>
              <THead>
                <TH>Student</TH>
                <TH>Adm. No.</TH>
                <TH>Class</TH>
                <TH>Time In</TH>
                <TH>Status</TH>
              </THead>
              <TBody>
                {ATTENDANCE_REGISTER.length === 0 ? (
                  <EmptyTableRow
                    colSpan={5}
                    icon="bi-calendar-x"
                    message="No attendance recorded yet"
                  />
                ) : (
                  ATTENDANCE_REGISTER.map((r, i) => (
                    <TR key={r.id}>
                      <TD>
                        <NameCell name={r.name} index={i} />
                      </TD>
                      <TD className="text-xs text-t2 whitespace-nowrap">{r.id}</TD>
                      <TD>
                        <Tag>{r.cls}</Tag>
                      </TD>
                      <TD className="font-medium text-t2 whitespace-nowrap">{r.timeIn}</TD>
                      <TD>
                        <Badge
                          color={
                            r.status === 'Present'
                              ? 'green'
                              : r.status === 'Late'
                                ? 'orange'
                                : 'red'
                          }
                        >
                          {r.status}
                        </Badge>
                      </TD>
                    </TR>
                  ))
                )}
              </TBody>
            </Table>
          </Card>
        </>
      )}
    </div>
  );
}
