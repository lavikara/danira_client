'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppChart } from '@/components/charts/app-chart';
import { EmptyTimetable } from '@/components/ui/empty-state';
import {
  TIMETABLE_DAYS,
  TIMETABLE_SLOTS,
  SUBJECT_COLORS,
  SUBJECT_TEACHERS,
  TODAY_SCHEDULE,
  ROOM_UTILIZATION,
} from '@/data/timetable';
import { Role } from '@/types/definitions';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useTimetablesStore } from '@/store/timetableStore';

export default function TimetablePage() {
  const [isEmpty, setIsEmpty] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const schoolId = searchParams.get('schoolId');

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const apiCall = useRef(false);
  const { timetableLoading, timetableDetails, fetchTimetableById } = useTimetablesStore();

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    const handleError = (errorMessage: string) => {
      error('Unable to get timetable details', { description: errorMessage });
    };

    const query = { timetableId: id as string };
    console.log(timetableDetails);
    fetchTimetableById(user?.role as Role, schoolId as string, query, {
      onError: handleError,
    });
  }, [user?.role, timetableDetails]);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Timetable"
        subtitle={timetableDetails?.name}
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty((v) => !v)}>
              <i className="bi bi-eye" />
              {isEmpty ? 'Show Data' : 'Preview Empty'}
            </Button>
            <Button variant="primary" size="sm">
              <i className="bi bi-pencil-square" />
              Edit
            </Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyTimetable />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader title="Weekly Timetable" subtitle="SS 3A • Room A-101" />
            <div className="overflow-x-auto p-4">
              <table className="w-full min-w-145 border-collapse">
                <thead>
                  <tr>
                    <th
                      style={{ borderBottomColor: 'var(--border-light)', color: 'var(--t3)' }}
                      className="w-20 border-b-2 p-2 text-left text-[10px] font-bold uppercase"
                    >
                      Time
                    </th>
                    {TIMETABLE_DAYS.map((d) => (
                      <th
                        key={d}
                        style={{ borderBottomColor: 'var(--border-light)', color: 'var(--t3)' }}
                        className="border-b-2 p-2 text-left text-[10px] font-bold uppercase"
                      >
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIMETABLE_SLOTS.map((slot, idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottomColor: 'var(--border-light)' }}
                      className="border-b last:border-b-0"
                    >
                      <td
                        style={{ color: 'var(--t3)' }}
                        className="p-2 text-[11px] font-semibold whitespace-nowrap"
                      >
                        {slot.time}
                      </td>

                      {slot.subjects === null ? (
                        <td
                          colSpan={5}
                          style={{ backgroundColor: 'var(--surface-2)', color: 'var(--t3)' }}
                          className="p-1.5 text-center text-[10px] font-bold tracking-wide uppercase"
                        >
                          Break
                        </td>
                      ) : (
                        slot.subjects.map((subj, j) => {
                          const colors = SUBJECT_COLORS[subj] ?? {
                            accent: 'var(--t3)',
                            bgVar: 'var(--surface-2)',
                          };
                          return (
                            <td key={j} className="p-1">
                              <div
                                style={{
                                  backgroundColor: colors.bgVar,
                                  borderLeft: `3px solid ${colors.accent}`,
                                }}
                                className="rounded-lg px-2 py-1.5"
                              >
                                <div
                                  style={{ color: colors.accent }}
                                  className="text-[11px] font-bold leading-tight"
                                >
                                  {subj}
                                </div>
                                <div style={{ color: 'var(--t3)' }} className="mt-0.5 text-[10px]">
                                  {SUBJECT_TEACHERS[subj]}
                                </div>
                              </div>
                            </td>
                          );
                        })
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader title="Today's Schedule" subtitle="Wed, 14 May" />
              <CardBody className="py-2">
                {TODAY_SCHEDULE.length === 0 ? (
                  <div style={{ color: 'var(--t3)' }} className="py-6 text-center text-[13px]">
                    No classes scheduled today.
                  </div>
                ) : (
                  TODAY_SCHEDULE.map((s, i) => {
                    const colors = SUBJECT_COLORS[s.subject];
                    return (
                      <div
                        key={i}
                        style={{ borderBottomColor: 'var(--border-light)' }}
                        className="flex gap-3 border-b py-2.5 last:border-b-0"
                      >
                        <div
                          style={{ color: colors?.accent ?? 'var(--color-primary)' }}
                          className="w-12 shrink-0 text-[12px] font-bold"
                        >
                          {s.time}
                        </div>
                        <div>
                          <div
                            style={{ color: colors?.accent ?? 'var(--t1)' }}
                            className="text-[13px] font-semibold"
                          >
                            {s.subject}
                          </div>
                          <div style={{ color: 'var(--t3)' }} className="mt-0.5 text-[11px]">
                            {s.teacher} · {s.cls} · {s.room}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Room Utilization" action={<Badge color="blue">This week</Badge>} />
              <CardBody>
                <AppChart
                  type="bar"
                  height={160}
                  data={{
                    labels: ROOM_UTILIZATION.labels,
                    datasets: [
                      { data: ROOM_UTILIZATION.data, backgroundColor: '#2563EB', borderRadius: 6 },
                    ],
                  }}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
