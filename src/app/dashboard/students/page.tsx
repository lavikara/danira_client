'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { StatBar } from '@/components/ui/progress-bar';
import { Table, THead, TH, TBody, TR, TD, ActionButtons } from '@/components/ui/table';
import { EmptyStudents, EmptySearch, EmptyTableRow } from '@/components/ui/empty-state';
import { STUDENTS } from '@/data/students';

function attendanceColor(att: number) {
  if (att >= 90) return 'var(--color-green)';
  if (att >= 75) return 'var(--color-orange)';
  return 'var(--color-red)';
}

export default function StudentsPage() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Student Management"
        subtitle="Manage and monitor all 1,248 enrolled students"
        actions={
          <>
            {/* Demo toggle — remove in production */}
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
              Add Student
            </Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyStudents />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon="bi bi-people-fill"
              color="blue"
              value="1,248"
              label="Total Enrolled"
              compact
            />
            <StatCard
              icon="bi bi-person-check-fill"
              color="green"
              value="1,201"
              label="Active"
              compact
            />
            <StatCard
              icon="bi bi-person-plus-fill"
              color="orange"
              value="47"
              label="New This Term"
              compact
            />
            <StatCard icon="bi bi-person-x-fill" color="red" value="12" label="Suspended" compact />
          </div>

          <Card className="mb-5">
            <div className="flex flex-wrap items-end gap-2 p-4">
              <div className="relative min-w-45 flex-1">
                <i className="bi bi-search absolute top-1/2 left-3 -translate-y-1/2 text-[14px] text-t3" />
                <input
                  type="text"
                  placeholder="Search by name, ID, class…"
                  className="w-full rounded-[9px] border-[1.5px] border-border bg-surface py-2 pl-9 pr-3 text-[13px] text-t1 outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]"
                />
              </div>
              <select className="rounded-[9px] border-[1.5px] border-border bg-surface px-3 py-2 text-[13px] text-t1 outline-none focus:border-primary">
                <option>All Classes</option>
                {['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select className="rounded-[9px] border-[1.5px] border-border bg-surface px-3 py-2 text-[13px] text-t1 outline-none focus:border-primary">
                <option>All Status</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>
              <Button variant="primary" size="sm" onClick={() => setSearchEmpty((v) => !v)}>
                <i className="bi bi-funnel-fill" />
                Filter
              </Button>
              <Button variant="ghost" size="sm">
                <i className="bi bi-download" />
                Export
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="All Students"
              subtitle="1,248 enrolled"
              action={
                <>
                  <Button variant="ghost" size="sm" className="px-2.5">
                    <i className="bi bi-table" />
                  </Button>
                  <Button variant="primary" size="sm" className="px-2.5">
                    <i className="bi bi-grid" />
                  </Button>
                </>
              }
            />
            <Table>
              <THead>
                <TH>
                  <input type="checkbox" />
                </TH>
                <TH>Student</TH>
                <TH>Adm. No.</TH>
                <TH>Class</TH>
                <TH>Gender</TH>
                <TH>Attendance</TH>
                <TH>Fees</TH>
                <TH>Status</TH>
                <TH>Action</TH>
              </THead>
              <TBody>
                {searchEmpty ? (
                  <EmptyTableRow
                    colSpan={9}
                    icon="bi-search"
                    message="No students match your search"
                  />
                ) : (
                  STUDENTS.map((s, i) => (
                    <TR key={s.id}>
                      <TD>
                        <input type="checkbox" />
                      </TD>
                      <TD>
                        <NameCell name={s.name} sub={s.id} index={i} />
                      </TD>
                      <TD className="text-xs text-t2 whitespace-nowrap">{s.id}</TD>
                      <TD>
                        <Tag>{s.cls}</Tag>
                      </TD>
                      <TD>
                        <Badge color={s.gender === 'Female' ? 'pink' : 'blue'}>{s.gender}</Badge>
                      </TD>
                      <TD className="min-w-27.5">
                        <StatBar pct={s.attendance} color={attendanceColor(s.attendance)} />
                      </TD>
                      <TD>
                        <Badge
                          color={
                            s.fee === 'Paid' ? 'green' : s.fee === 'Partial' ? 'orange' : 'red'
                          }
                        >
                          {s.fee}
                        </Badge>
                      </TD>
                      <TD>
                        <Badge color={s.status === 'Active' ? 'green' : 'red'}>{s.status}</Badge>
                      </TD>
                      <TD>
                        <ActionButtons />
                      </TD>
                    </TR>
                  ))
                )}
              </TBody>
            </Table>
            {!searchEmpty && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-light px-4 py-3">
                <span className="text-xs text-t3">Showing 1–10 of 1,248</span>
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
                  <span className="self-center px-1 text-t3">…</span>
                  <Button variant="ghost" size="sm">
                    125
                  </Button>
                  <Button variant="ghost" size="sm">
                    <i className="bi bi-chevron-right" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
