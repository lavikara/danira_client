"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge, Tag } from "@/components/ui/badge";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/table";
import { AppChart } from "@/components/charts/app-chart";
import { EmptyExams, EmptyExamResults, EmptyTableRow } from "@/components/ui/empty-state";
import { UPCOMING_EXAMS, SUBJECT_RESULTS, SCORE_DISTRIBUTION } from "@/data/exams";

export default function ExamsPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Exams & Results"
        subtitle="Second Term Examination — 2024/25 Academic Session"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty(v => !v)}>
              <i className="bi bi-eye" />{isEmpty ? "Show Data" : "Preview Empty"}
            </Button>
            <Button variant="ghost"   size="sm"><i className="bi bi-upload" />Upload Results</Button>
            <Button variant="primary" size="sm"><i className="bi bi-calendar-plus" />Schedule Exam</Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyExams />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon="bi bi-calendar-check" color="blue"   value="6"     label="Exams Scheduled" compact />
            <StatCard icon="bi bi-graph-up"       color="green"  value="68.4%" label="Overall Average"  compact />
            <StatCard icon="bi bi-trophy-fill"    color="orange" value="82.6%" label="Pass Rate"        compact />
            <StatCard icon="bi bi-award-fill"     color="purple" value="98"    label="Highest Score"    compact />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader title="Upcoming Exams" subtitle="Term 2 schedule" />
              <Table>
                <THead>
                  <TH>Subject</TH><TH>Class</TH><TH>Date</TH><TH>Duration</TH><TH>Status</TH>
                </THead>
                <TBody>
                  {UPCOMING_EXAMS.length === 0 ? (
                    <EmptyTableRow colSpan={5} icon="bi-calendar" message="No exams scheduled" />
                  ) : (
                    UPCOMING_EXAMS.map((e) => (
                      <TR key={e.name + e.cls}>
                        <TD className="font-semibold whitespace-nowrap">{e.name}</TD>
                        <TD><Tag>{e.cls}</Tag></TD>
                        <TD className="text-t2 whitespace-nowrap">{e.date}</TD>
                        <TD className="text-t2 whitespace-nowrap">{e.duration}</TD>
                        <TD><Badge color={e.status === "Upcoming" ? "blue" : "gray"}>{e.status}</Badge></TD>
                      </TR>
                    ))
                  )}
                </TBody>
              </Table>
            </Card>
            <Card>
              <CardHeader title="Score Distribution" subtitle="SS3 Mathematics — Term 2" />
              <CardBody>
                <AppChart type="bar" height={210} data={{
                  labels: SCORE_DISTRIBUTION.labels,
                  datasets: [{ data: SCORE_DISTRIBUTION.data, backgroundColor: SCORE_DISTRIBUTION.colors, borderRadius: 7 }],
                }} />
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader title="Subject Performance Summary" subtitle="Term 2 results by subject" />
            {SUBJECT_RESULTS.length === 0 ? (
              <EmptyExamResults />
            ) : (
              <Table>
                <THead>
                  <TH>Subject</TH><TH>Teacher</TH><TH>Average</TH><TH>Pass Rate</TH><TH>Highest</TH><TH>Lowest</TH>
                </THead>
                <TBody>
                  {SUBJECT_RESULTS.map((r) => (
                    <TR key={r.subject}>
                      <TD className="font-semibold whitespace-nowrap">{r.subject}</TD>
                      <TD className="text-t2 whitespace-nowrap">{r.teacher}</TD>
                      <TD className="font-bold text-primary">{r.avg}%</TD>
                      <TD><Badge color={r.pass >= 85 ? "green" : r.pass >= 70 ? "orange" : "red"}>{r.pass}%</Badge></TD>
                      <TD className="font-semibold text-green">{r.high}</TD>
                      <TD className="font-semibold text-red">{r.low}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
