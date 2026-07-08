"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/table";
import { AppChart } from "@/components/charts/app-chart";
import { EmptyNotificationsPage, EmptyNotifications, EmptyTableRow } from "@/components/ui/empty-state";
import { ALL_NOTIFICATIONS, ANNOUNCEMENTS, DELIVERY_STATS } from "@/data/notifications";

export default function NotificationsPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Notifications & Announcements"
        subtitle="Manage alerts and broadcast messages"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty(v => !v)}>
              <i className="bi bi-eye" />{isEmpty ? "Show Data" : "Preview Empty"}
            </Button>
            <Button variant="primary" size="sm"><i className="bi bi-megaphone-fill" />New Announcement</Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyNotificationsPage />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon="bi bi-bell-fill"           color="blue"   value="5"     label="Unread"          compact />
            <StatCard icon="bi bi-megaphone-fill"      color="green"  value="24"    label="Sent This Month" compact />
            <StatCard icon="bi bi-envelope-check-fill" color="orange" value="84%"   label="Avg Open Rate"   compact />
            <StatCard icon="bi bi-people-fill"         color="purple" value="2,318" label="Total Reach"     compact />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader title="All Notifications" action={<Badge color="blue">5 new</Badge>} />
              <CardBody className="py-2">
                {ALL_NOTIFICATIONS.length === 0 ? (
                  <EmptyNotifications />
                ) : (
                  ALL_NOTIFICATIONS.map((n, i) => (
                    <div key={i} className="flex gap-2.5 border-b border-border-light py-3 last:border-b-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]" style={{ backgroundColor: n.bg }}>
                        <i className={n.icon} style={{ color: n.iconColor }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[12.5px] leading-relaxed text-t2 [&_strong]:font-semibold [&_strong]:text-t1"
                          dangerouslySetInnerHTML={{ __html: n.text }} />
                        <div className="mt-0.5 text-[11px] text-t3">{n.time}</div>
                      </div>
                      {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                  ))
                )}
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Delivery & Open Rates" subtitle="Last 5 months" />
              <CardBody>
                <AppChart type="line" height={220} data={{
                  labels: DELIVERY_STATS.labels,
                  datasets: [
                    { label: "Delivered", data: DELIVERY_STATS.delivered, borderColor: "#2563EB", backgroundColor: "rgba(37,99,235,.08)", fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
                    { label: "Opened",    data: DELIVERY_STATS.opened,    borderColor: "#10B981", backgroundColor: "rgba(16,185,129,.08)", fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3 },
                  ],
                }} options={{ plugins: { legend: { display: true, position: "bottom", labels: { boxWidth: 9, font: { size: 11 } } } } }} />
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader title="Recent Announcements" subtitle="Broadcast history" />
            <Table>
              <THead>
                <TH>Title</TH><TH>Audience</TH><TH>Date</TH>
                <TH>Delivered</TH><TH>Open Rate</TH><TH>Status</TH>
              </THead>
              <TBody>
                {ANNOUNCEMENTS.length === 0 ? (
                  <EmptyTableRow colSpan={6} icon="bi-megaphone" message="No announcements sent yet" />
                ) : (
                  ANNOUNCEMENTS.map((a) => (
                    <TR key={a.title}>
                      <TD className="font-semibold">{a.title}</TD>
                      <TD className="whitespace-nowrap text-t2">{a.to}</TD>
                      <TD className="whitespace-nowrap text-t2">{a.date}</TD>
                      <TD className="font-medium">{a.delivered}</TD>
                      <TD className="font-medium text-primary">{a.openRate}</TD>
                      <TD><Badge color="green">{a.status}</Badge></TD>
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
