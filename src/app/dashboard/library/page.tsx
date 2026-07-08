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
import { EmptyLibrary, EmptyOverdueBooks, EmptyBorrowRecords, EmptyTableRow } from "@/components/ui/empty-state";
import { LIBRARY_BOOKS, OVERDUE_BOOKS, BORROW_RECORDS, BOOKS_BY_CATEGORY } from "@/data/library";

export default function LibraryPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Library Management"
        subtitle="Catalog, lending and overdue tracking"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty(v => !v)}>
              <i className="bi bi-eye" />{isEmpty ? "Show Data" : "Preview Empty"}
            </Button>
            <Button variant="ghost"   size="sm"><i className="bi bi-arrow-return-left" />Return Book</Button>
            <Button variant="primary" size="sm"><i className="bi bi-plus-circle-fill" />Add Book</Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyLibrary />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon="bi bi-book-half"                 color="blue"   value="4,280" label="Total Books" compact />
            <StatCard icon="bi bi-bookmark-check-fill"       color="green"  value="3,612" label="Available"   compact />
            <StatCard icon="bi bi-arrow-left-right"          color="orange" value="668"   label="Borrowed"    compact />
            <StatCard icon="bi bi-exclamation-triangle-fill" color="red"    value="14"    label="Overdue"     compact />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader title="Book Catalog" subtitle="4,280 titles" />
              <Table>
                <THead>
                  <TH>Title</TH><TH>Author</TH><TH>Category</TH><TH>Copies</TH><TH>Available</TH><TH>Action</TH>
                </THead>
                <TBody>
                  {LIBRARY_BOOKS.length === 0 ? (
                    <EmptyTableRow colSpan={6} icon="bi-book" message="No books in catalog" />
                  ) : (
                    LIBRARY_BOOKS.map((b) => (
                      <TR key={b.title}>
                        <TD className="font-semibold">{b.title}</TD>
                        <TD className="whitespace-nowrap text-t2">{b.author}</TD>
                        <TD><Tag>{b.category}</Tag></TD>
                        <TD>{b.copies}</TD>
                        <TD><span className={b.available < 12 ? "font-bold text-orange" : "font-bold text-green"}>{b.available}</span></TD>
                        <TD><ActionButtons /></TD>
                      </TR>
                    ))
                  )}
                </TBody>
              </Table>
            </Card>
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader title="Books by Category" />
                <CardBody>
                  <div className="h-[180px]">
                    <AppChart type="doughnut" data={{
                      labels: BOOKS_BY_CATEGORY.labels,
                      datasets: [{ data: BOOKS_BY_CATEGORY.data, backgroundColor: ["#2563EB","#10B981","#F59E0B","#8B5CF6","#94A3B8"], borderWidth: 0 }],
                    }} options={{ plugins: { legend: { display: true, position: "bottom", labels: { boxWidth: 9, font: { size: 10.5 } } } } }} />
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader title="Overdue Books" action={<Badge color="red">{OVERDUE_BOOKS.length}</Badge>} />
                <CardBody className="py-2">
                  {OVERDUE_BOOKS.length === 0 ? (
                    <EmptyOverdueBooks />
                  ) : (
                    OVERDUE_BOOKS.map((o) => (
                      <div key={o.name + o.book} className="flex items-center justify-between border-b border-border-light py-2.5 last:border-b-0">
                        <div>
                          <div className="text-[12.5px] font-semibold text-t1">{o.name}</div>
                          <div className="text-[11px] text-t3">{o.book} · due {o.due}</div>
                        </div>
                        <Badge color="red">{o.daysOverdue}d</Badge>
                      </div>
                    ))
                  )}
                </CardBody>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader title="Borrowing Records" subtitle="Active and recent loans" />
            {BORROW_RECORDS.length === 0 ? (
              <EmptyBorrowRecords />
            ) : (
              <Table>
                <THead>
                  <TH>Student</TH><TH>Book</TH><TH>Borrowed</TH><TH>Due</TH><TH>Returned</TH><TH>Status</TH>
                </THead>
                <TBody>
                  {BORROW_RECORDS.map((r, i) => (
                    <TR key={r.name + r.book}>
                      <TD><NameCell name={r.name} index={i + 3} /></TD>
                      <TD className="text-t2">{r.book}</TD>
                      <TD className="whitespace-nowrap text-t2">{r.borrowed}</TD>
                      <TD className="whitespace-nowrap text-t2">{r.due}</TD>
                      <TD className="whitespace-nowrap text-t2">{r.returned}</TD>
                      <TD><Badge color={r.status === "Active" ? "blue" : "green"}>{r.status}</Badge></TD>
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
