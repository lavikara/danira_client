"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge, Tag } from "@/components/ui/badge";
import { NameCell } from "@/components/ui/avatar";
import { Table, THead, TH, TBody, TR, TD, ActionButtons } from "@/components/ui/table";
import { AppChart } from "@/components/charts/app-chart";
import { EmptyParents, EmptyMeetings } from "@/components/ui/empty-state";
import { PARENTS, TODAYS_MEETINGS } from "@/data/parents";

const MEETING_BG = ["var(--color-primary-50)","var(--color-green-bg)","var(--color-purple-bg)"];
const MEETING_FG = ["var(--color-primary)","var(--color-green)","var(--color-purple)"];

export default function ParentsPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Parent Management"
        subtitle="Parent directory, communication and ward information"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty(v => !v)}>
              <i className="bi bi-eye" />{isEmpty ? "Show Data" : "Preview Empty"}
            </Button>
            <Button variant="ghost"   size="sm"><i className="bi bi-envelope" />Bulk Email</Button>
            <Button variant="primary" size="sm"><i className="bi bi-person-plus-fill" />Add Parent</Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyParents />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon="bi bi-people-fill"        color="blue"   value="986" label="Total Parents"   compact />
            <StatCard icon="bi bi-chat-dots-fill"     color="green"  value="342" label="Active Chats"    compact />
            <StatCard icon="bi bi-calendar-event"     color="orange" value="18"  label="Meetings Today"  compact />
            <StatCard icon="bi bi-envelope-check-fill" color="purple" value="94%" label="Email Open Rate" compact />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader title="Parent Directory" subtitle="986 registered parents"
                action={
                  <div className="relative w-[160px] sm:w-[200px]">
                    <i className="bi bi-search absolute top-1/2 left-3 -translate-y-1/2 text-[14px] text-t3" />
                    <input placeholder="Search…"
                      className="w-full rounded-[9px] border-[1.5px] border-border bg-surface py-1.5 pl-9 pr-3 text-[13px] outline-none focus:border-primary" />
                  </div>
                }
              />
              <Table>
                <THead>
                  <TH>Parent</TH><TH>Ward</TH><TH>Class</TH>
                  <TH>Last Contact</TH><TH>Fee Status</TH><TH>Action</TH>
                </THead>
                <TBody>
                  {PARENTS.map((p, i) => (
                    <TR key={p.name}>
                      <TD><NameCell name={p.name} sub={p.phone} index={i + 2} /></TD>
                      <TD className="whitespace-nowrap text-[13px]">{p.ward}</TD>
                      <TD><Tag>{p.cls}</Tag></TD>
                      <TD className="whitespace-nowrap text-xs text-t2">{p.lastContact}</TD>
                      <TD><Badge color={p.fee === "Paid" ? "green" : "orange"}>{p.fee}</Badge></TD>
                      <TD><ActionButtons /></TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </Card>

            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader title="Communication Stats" />
                <CardBody>
                  <AppChart type="line" height={160} data={{
                    labels: ["Jan","Feb","Mar","Apr","May"],
                    datasets: [
                      { data: [120,145,132,160,148], borderColor: "#2563EB", fill: false, tension: 0.4, borderWidth: 2, pointRadius: 3 },
                      { data: [60,75,68,82,71],      borderColor: "#10B981", fill: false, tension: 0.4, borderWidth: 2, pointRadius: 3, borderDash: [4,4] },
                    ],
                  }} />
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Today's Meetings"
                  action={<Button variant="ghost" size="sm"><i className="bi bi-plus" />Schedule</Button>} />
                <CardBody className="py-2">
                  {TODAYS_MEETINGS.length === 0 ? (
                    <EmptyMeetings />
                  ) : (
                    TODAYS_MEETINGS.map((m, i) => (
                      <div key={m.name} className="flex gap-2.5 border-b border-border-light py-2.5 last:border-b-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]"
                          style={{ backgroundColor: MEETING_BG[i] }}>
                          <i className="bi bi-calendar-check" style={{ color: MEETING_FG[i] }} />
                        </div>
                        <div>
                          <div className="text-[12.5px] text-t2">
                            <strong className="font-semibold text-t1">{m.name}</strong> — {m.reason}
                          </div>
                          <div className="mt-0.5 text-[11px] text-t3"><i className="bi bi-clock" /> {m.time} today</div>
                        </div>
                      </div>
                    ))
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
