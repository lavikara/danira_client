'use client';

import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Tag, Badge } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table';
import { AppChart } from '@/components/charts/app-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { NotificationList } from '@/components/dashboard/notification-list';
import { CalendarWidget } from '@/components/dashboard/calendar-widget';
import { EventsList, AIInsightsCard } from '@/components/dashboard/events-and-ai';
import {
  STAT_CARDS,
  QUICK_ACTIONS,
  ENROLLMENT_TREND,
  GENDER_DISTRIBUTION,
  WEEKLY_ATTENDANCE,
  REVENUE_OVERVIEW,
  CALENDAR_EVENT_DAYS,
  CALENDAR_TODAY,
  CALENDAR_START_OFFSET,
  CALENDAR_MONTH_LABEL,
  UPCOMING_EVENTS,
  AI_DASHBOARD_INSIGHTS,
  DASHBOARD_NOTIFICATIONS,
} from '@/data/dashboard';
import { RECENT_REGISTRATIONS } from '@/data/students';
import Link from 'next/link';
import loading from './loading';

export default function DashboardPage() {
  return (
    <div className="min-w-0">
      <PageHeader
        title="Good morning, Priya 👋"
        subtitle="Greenfield Academy — Wednesday, 14 May 2025"
        actions={
          <>
            <Button variant="ghost" size="sm">
              <i className="bi bi-download" />
              Export
            </Button>
            <Button variant="primary" size="sm">
              <i className="bi bi-plus" />
              Quick Add
            </Button>
          </>
        }
      />

      {/* Stat cards — 2 cols on mobile → 3 on sm → 6 on xl */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {STAT_CARDS.map((s) => (
          <StatCard
            key={s.label}
            icon={s.icon}
            color={s.color}
            value={s.value}
            label={s.label}
            trend={s.trend}
            trendUp={s.trendUp}
            spark={[...s.spark]}
            sparkColor={s.sparkColor}
          />
        ))}
      </div>

      {/* Quick actions */}
      <Card className="mb-5">
        <CardHeader title="Quick Actions" subtitle="Frequent tasks" />
        <CardBody>
          <QuickActions actions={QUICK_ACTIONS} />
        </CardBody>
      </Card>

      {/* Enrollment + Gender */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader
            title="Student Enrollment Trend"
            subtitle="Academic Year 2024/25"
            action={<Tag>Monthly</Tag>}
          />
          <CardBody>
            <AppChart
              type="line"
              height={200}
              data={{
                labels: ENROLLMENT_TREND.labels,
                datasets: [
                  {
                    label: '2024-25',
                    data: ENROLLMENT_TREND.current,
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37,99,235,.08)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2.5,
                    pointBackgroundColor: '#2563EB',
                    pointRadius: 3,
                  },
                  {
                    label: '2023-24',
                    data: ENROLLMENT_TREND.previous,
                    borderColor: '#CBD5E1',
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    borderWidth: 1.5,
                    borderDash: [5, 4],
                    pointRadius: 0,
                  },
                ],
              }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Gender Distribution" subtitle="Current enrollment" />
          <CardBody className="flex items-center gap-4">
            <div className="h-[120px] w-[120px] shrink-0">
              <AppChart
                type="doughnut"
                data={{
                  labels: ['Male', 'Female'],
                  datasets: [
                    {
                      data: [GENDER_DISTRIBUTION.male, GENDER_DISTRIBUTION.female],
                      backgroundColor: ['#2563EB', '#EC4899'],
                      borderWidth: 0,
                      hoverOffset: 6,
                    },
                  ],
                }}
                options={{ cutout: '70%' }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              {[
                ['#2563EB', 'Male', GENDER_DISTRIBUTION.male, '54%'],
                ['#EC4899', 'Female', GENDER_DISTRIBUTION.female, '46%'],
              ].map(([color, label, val, pct]) => (
                <div key={String(label)} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                    style={{ backgroundColor: String(color) }}
                  />
                  <span className="flex-1 text-[12px] text-t2">{label}</span>
                  <strong className="text-[13px]">{val}</strong>
                  <span className="text-[11px] text-t3">{pct}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Attendance + Revenue */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader
            title="Attendance Analytics"
            subtitle="Last 7 school days"
            action={
              <Link href="/attendance">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            }
          />
          <CardBody>
            <AppChart
              type="bar"
              height={170}
              data={{
                labels: WEEKLY_ATTENDANCE.labels,
                datasets: [
                  {
                    label: 'Present',
                    data: WEEKLY_ATTENDANCE.present,
                    backgroundColor: '#2563EB',
                    borderRadius: 5,
                  },
                  {
                    label: 'Absent',
                    data: WEEKLY_ATTENDANCE.absent,
                    backgroundColor: '#FEE2E2',
                    borderRadius: 5,
                  },
                ],
              }}
              options={{ scales: { x: { stacked: true }, y: { stacked: true } } }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            title="Revenue Overview"
            subtitle="Monthly (₦M)"
            action={
              <Button variant="ghost" size="sm">
                Export
              </Button>
            }
          />
          <CardBody>
            <AppChart
              type="line"
              height={170}
              data={{
                labels: REVENUE_OVERVIEW.labels,
                datasets: [
                  {
                    data: REVENUE_OVERVIEW.data,
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139,92,246,.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2.5,
                    pointBackgroundColor: '#8B5CF6',
                    pointRadius: 3,
                  },
                ],
              }}
              options={{ scales: { y: { ticks: { callback: (v: number) => `₦${v}M` } } } }}
            />
          </CardBody>
        </Card>
      </div>

      {/* Recent registrations + calendar/notifications */}
      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader
            title="Recent Registrations"
            subtitle="Latest admitted students"
            action={
              <Link href="/students">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            }
          />
          {/* Table gets horizontal scroll inside the card */}
          <Table>
            <THead>
              <TH>Student</TH>
              <TH>Class</TH>
              <TH>Date</TH>
              <TH>Status</TH>
              <TH>Fees</TH>
            </THead>
            <TBody>
              {RECENT_REGISTRATIONS.map((r, i) => (
                <TR key={r.id}>
                  <TD>
                    <NameCell name={r.name} sub={r.id} index={i} />
                  </TD>
                  <TD>
                    <Tag>{r.cls}</Tag>
                  </TD>
                  <TD className="text-t2 whitespace-nowrap">{r.date}</TD>
                  <TD>
                    <Badge color="green">{r.status}</Badge>
                  </TD>
                  <TD>
                    <Badge
                      color={r.fee === 'Paid' ? 'green' : r.fee === 'Partial' ? 'orange' : 'red'}
                    >
                      {r.fee}
                    </Badge>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-light px-4 py-3">
            <span className="text-xs text-t3">Showing 6 of 1,248</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <i className="bi bi-chevron-left" />
              </Button>
              <Button variant="primary" size="sm">
                1
              </Button>
              <Button variant="ghost" size="sm">
                2
              </Button>
              <Button variant="ghost" size="sm">
                3
              </Button>
              <Button variant="ghost" size="sm">
                <i className="bi bi-chevron-right" />
              </Button>
            </div>
          </div>
        </Card>
        <div className="flex flex-col gap-4">
          <Card>
            <CalendarWidget
              monthLabel={CALENDAR_MONTH_LABEL}
              today={CALENDAR_TODAY}
              startOffset={CALENDAR_START_OFFSET}
              eventDays={[...CALENDAR_EVENT_DAYS]}
            />
          </Card>
          <Card>
            <CardHeader title="Notifications" action={<Badge color="blue">5 new</Badge>} />
            <CardBody className="py-2">
              <NotificationList items={[...DASHBOARD_NOTIFICATIONS]} />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Events + AI insights */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader
            title="Upcoming Events"
            subtitle="Academic calendar"
            action={
              <Button variant="ghost" size="sm">
                <i className="bi bi-plus" />
                Add
              </Button>
            }
          />
          <CardBody>
            <EventsList events={[...UPCOMING_EVENTS]} />
          </CardBody>
        </Card>
        <AIInsightsCard
          title="AI Insights"
          subtitle="Predictive Analytics"
          items={[...AI_DASHBOARD_INSIGHTS]}
        />
      </div>
    </div>
  );
}
