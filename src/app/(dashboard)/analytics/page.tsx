"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { AppChart } from "@/components/charts/app-chart";
import { EmptyAnalytics } from "@/components/ui/empty-state";
import { YEARLY_ENROLLMENT, ACADEMIC_PERFORMANCE, DEPT_PERFORMANCE, FEE_BREAKDOWN, GRADE_DISTRIBUTION, AI_INSIGHTS } from "@/data/analytics";

export default function AnalyticsPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Reports & Analytics"
        subtitle="School-wide performance and predictive insights"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty(v => !v)}>
              <i className="bi bi-eye" />{isEmpty ? "Show Data" : "Preview Empty"}
            </Button>
            <Button variant="ghost"   size="sm"><i className="bi bi-download" />Export</Button>
            <Button variant="primary" size="sm"><i className="bi bi-share-fill" />Share</Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyAnalytics />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon="bi bi-graph-up-arrow"            color="blue"   value="+10.6%" label="Enrollment Growth" compact />
            <StatCard icon="bi bi-award-fill"                color="green"  value="68%"    label="Avg Pass Rate"     compact />
            <StatCard icon="bi bi-cash-coin"                 color="purple" value="₦42.8M" label="Total Revenue"     compact />
            <StatCard icon="bi bi-exclamation-triangle-fill" color="red"    value="47"     label="At-Risk Students"  compact />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader title="Yearly Enrollment" subtitle="JSS vs SS" />
              <CardBody>
                <AppChart type="bar" height={210} data={{
                  labels: YEARLY_ENROLLMENT.labels,
                  datasets: [
                    { label: "JSS", data: YEARLY_ENROLLMENT.jss, backgroundColor: "#2563EB", borderRadius: 6 },
                    { label: "SS",  data: YEARLY_ENROLLMENT.ss,  backgroundColor: "#8B5CF6", borderRadius: 6 },
                  ],
                }} options={{ plugins: { legend: { display: true, position: "bottom", labels: { boxWidth: 9, font: { size: 11 } } } } }} />
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Academic Performance" subtitle="School vs State average" />
              <CardBody>
                <AppChart type="line" height={210} data={{
                  labels: ACADEMIC_PERFORMANCE.labels,
                  datasets: [
                    { label: "School",    data: ACADEMIC_PERFORMANCE.school, borderColor: "#2563EB", fill: false, tension: 0.4, borderWidth: 2, pointRadius: 2 },
                    { label: "State Avg", data: ACADEMIC_PERFORMANCE.state,  borderColor: "#94A3B8", fill: false, tension: 0.4, borderWidth: 2, borderDash: [5,4], pointRadius: 0 },
                  ],
                }} options={{ plugins: { legend: { display: true, position: "bottom", labels: { boxWidth: 9, font: { size: 11 } } } } }} />
              </CardBody>
            </Card>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader title="Department Performance" />
              <CardBody>
                <div className="h-[210px]">
                  <AppChart type="radar" data={{
                    labels: DEPT_PERFORMANCE.labels,
                    datasets: [{ data: DEPT_PERFORMANCE.data, borderColor: "#2563EB", backgroundColor: "rgba(37,99,235,.15)", pointBackgroundColor: "#2563EB" }],
                  }} options={{ scales: { r: { ticks: { display: false } } } }} />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Fee Breakdown" subtitle="₦M by category" />
              <CardBody>
                <div className="h-[210px]">
                  <AppChart type="doughnut" data={{
                    labels: FEE_BREAKDOWN.labels,
                    datasets: [{ data: FEE_BREAKDOWN.data, backgroundColor: ["#2563EB","#06B6D4","#10B981","#F59E0B","#8B5CF6"], borderWidth: 0 }],
                  }} options={{ plugins: { legend: { display: true, position: "bottom", labels: { boxWidth: 9, font: { size: 10 } } } } }} />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Grade Distribution" subtitle="WAEC-style" />
              <CardBody>
                <AppChart type="bar" height={210} data={{
                  labels: GRADE_DISTRIBUTION.labels,
                  datasets: [{ data: GRADE_DISTRIBUTION.data, backgroundColor: GRADE_DISTRIBUTION.colors, borderRadius: 5 }],
                }} />
              </CardBody>
            </Card>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1e3a8a] p-5 text-white">
            <div className="mb-4 flex items-center gap-2.5">
              <i className="bi bi-cpu text-[22px] text-white/70" />
              <div>
                <div className="text-[14.5px] font-bold">AI-Generated Insights</div>
                <div className="text-[11px] text-white/40">Predictive analytics &amp; recommendations</div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AI_INSIGHTS.map((insight) => (
                <div key={insight.title} className="rounded-xl bg-white/[0.06] p-4">
                  <i className={insight.icon} style={{ color: insight.color, fontSize: 20 }} />
                  <div className="mt-2 text-[13px] font-bold">{insight.title}</div>
                  <div className="mt-1.5 text-[12px] leading-relaxed text-white/65">{insight.text}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
