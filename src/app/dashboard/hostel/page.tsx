"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge, Tag } from "@/components/ui/badge";
import { ProgressRow } from "@/components/ui/progress-bar";
import { Table, THead, TH, TBody, TR, TD, ActionButtons } from "@/components/ui/table";
import { AppChart } from "@/components/charts/app-chart";
import { EmptyHostel, EmptyTableRow } from "@/components/ui/empty-state";
import { HOSTEL_ROOMS, HOSTEL_FEE_STATUS, HOSTEL_OCCUPANCY } from "@/data/hostel";

export default function HostelPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Hostel Management"
        subtitle="Room allocation, occupancy and warden assignments"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty(v => !v)}>
              <i className="bi bi-eye" />{isEmpty ? "Show Data" : "Preview Empty"}
            </Button>
            <Button variant="ghost"   size="sm"><i className="bi bi-arrow-left-right" />Reassign</Button>
            <Button variant="primary" size="sm"><i className="bi bi-plus-circle-fill" />Add Room</Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyHostel />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon="bi bi-building"         color="blue"   value="3"   label="Blocks"          compact />
            <StatCard icon="bi bi-door-open-fill"   color="green"  value="48"  label="Total Rooms"     compact />
            <StatCard icon="bi bi-people-fill"      color="orange" value="384" label="Boarders"        compact />
            <StatCard icon="bi bi-house-check-fill" color="purple" value="92%" label="Occupancy Rate"  compact />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader title="Rooms" subtitle="48 rooms across 3 blocks" />
              <Table>
                <THead>
                  <TH>Room</TH><TH>Block</TH><TH>Type</TH>
                  <TH>Occupancy</TH><TH>Warden</TH><TH>Status</TH><TH>Action</TH>
                </THead>
                <TBody>
                  {HOSTEL_ROOMS.length === 0 ? (
                    <EmptyTableRow colSpan={7} icon="bi-building" message="No rooms configured" />
                  ) : (
                    HOSTEL_ROOMS.map((r) => (
                      <TR key={r.block + r.room}>
                        <TD className="font-semibold">{r.room}</TD>
                        <TD><Tag>{r.block}</Tag></TD>
                        <TD className="whitespace-nowrap text-t2">{r.type}</TD>
                        <TD className="font-medium text-t2">{r.occupied}/{r.capacity}</TD>
                        <TD className="whitespace-nowrap text-t2">{r.warden}</TD>
                        <TD><Badge color={r.status === "Full" ? "red" : "green"}>{r.status}</Badge></TD>
                        <TD><ActionButtons /></TD>
                      </TR>
                    ))
                  )}
                </TBody>
              </Table>
            </Card>
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader title="Block Occupancy" />
                <CardBody>
                  <AppChart type="bar" height={180} data={{
                    labels: HOSTEL_OCCUPANCY.labels,
                    datasets: [
                      { label: "Occupied", data: HOSTEL_OCCUPANCY.occupied, backgroundColor: "#2563EB", borderRadius: 6 },
                      { label: "Vacant", data: HOSTEL_OCCUPANCY.vacant, backgroundColor: "var(--color-border)", borderRadius: 6 },
                    ],
                  }} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Hostel Fee Status" />
                <CardBody className="flex flex-col gap-3.5">
                  {HOSTEL_FEE_STATUS.map((f) => <ProgressRow key={f.label} label={f.label} value={f.value} pct={f.pct} color={f.color} />)}
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
