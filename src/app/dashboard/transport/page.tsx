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
import { EmptyTransport, EmptyTableRow } from "@/components/ui/empty-state";
import { BUS_ROUTES, BUS_ASSIGNMENTS, STUDENTS_PER_ROUTE } from "@/data/transport";

export default function TransportPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Transport Management"
        subtitle="Bus routes, drivers and student assignments"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty(v => !v)}>
              <i className="bi bi-eye" />{isEmpty ? "Show Data" : "Preview Empty"}
            </Button>
            <Button variant="ghost"   size="sm"><i className="bi bi-geo-alt" />Live Tracking</Button>
            <Button variant="primary" size="sm"><i className="bi bi-plus-circle-fill" />Add Route</Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyTransport />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon="bi bi-bus-front-fill"    color="blue"   value="6"   label="Active Routes"   compact />
            <StatCard icon="bi bi-people-fill"       color="green"  value="298" label="Students on Bus" compact />
            <StatCard icon="bi bi-person-badge-fill" color="orange" value="6"   label="Drivers"         compact />
            <StatCard icon="bi bi-tools"             color="red"    value="1"   label="In Maintenance"  compact />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader title="Bus Routes" subtitle="6 routes" />
              <Table>
                <THead>
                  <TH>Route</TH><TH>Driver</TH><TH>Bus No.</TH>
                  <TH>Students</TH><TH>Distance</TH><TH>Status</TH><TH>Action</TH>
                </THead>
                <TBody>
                  {BUS_ROUTES.length === 0 ? (
                    <EmptyTableRow colSpan={7} icon="bi-bus-front" message="No routes configured" />
                  ) : (
                    BUS_ROUTES.map((r) => (
                      <TR key={r.busNo}>
                        <TD className="font-semibold whitespace-nowrap">{r.route}</TD>
                        <TD className="whitespace-nowrap text-t2">{r.driver}</TD>
                        <TD><Tag>{r.busNo}</Tag></TD>
                        <TD className="font-medium">{r.students}</TD>
                        <TD className="text-t2">{r.distance}</TD>
                        <TD><Badge color={r.status === "Active" ? "green" : "orange"}>{r.status}</Badge></TD>
                        <TD><ActionButtons /></TD>
                      </TR>
                    ))
                  )}
                </TBody>
              </Table>
            </Card>
            <Card>
              <CardHeader title="Students per Route" />
              <CardBody>
                <AppChart type="bar" height={200} data={{
                  labels: STUDENTS_PER_ROUTE.labels,
                  datasets: [{ data: STUDENTS_PER_ROUTE.data, backgroundColor: "#06B6D4", borderRadius: 6 }],
                }} />
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader title="Student Bus Assignments" subtitle="Pickup points and fee status" />
            <Table>
              <THead>
                <TH>Student</TH><TH>Class</TH><TH>Route</TH>
                <TH>Bus No.</TH><TH>Pickup Point</TH><TH>Fee Status</TH>
              </THead>
              <TBody>
                {BUS_ASSIGNMENTS.length === 0 ? (
                  <EmptyTableRow colSpan={6} icon="bi-people" message="No students assigned to routes" />
                ) : (
                  BUS_ASSIGNMENTS.map((a, i) => (
                    <TR key={a.name}>
                      <TD><NameCell name={a.name} index={i + 2} /></TD>
                      <TD><Tag>{a.cls}</Tag></TD>
                      <TD className="whitespace-nowrap text-t2">{a.route}</TD>
                      <TD className="text-t2">{a.busNo}</TD>
                      <TD className="whitespace-nowrap text-t2">{a.pickup}</TD>
                      <TD><Badge color={a.fee === "Paid" ? "green" : "red"}>{a.fee}</Badge></TD>
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
