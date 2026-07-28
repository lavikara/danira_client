'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { formatToStringDate } from '@/utils/helpers';
import { TimetableCardSkeleton } from '@/components/ui/skeletons/TimetableCardSkeleton';
import { Role } from '@/types/definitions';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useTimetablesStore } from '@/store/timetableStore';

export default function TimetablePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const schoolId = searchParams.get('schoolId');

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const apiCall = useRef(false);
  const { timetableLoading, timetablePeriods, timetableDetails, fetchTimetableById } =
    useTimetablesStore();

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    const handleError = (errorMessage: string) => {
      error('Unable to get timetable details', { description: errorMessage });
    };

    const query = { timetableId: id as string };
    fetchTimetableById(user?.role as Role, schoolId as string, query, {
      onError: handleError,
    });
  }, [user?.role]);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Timetable"
        subtitle={timetableDetails?.name}
        loading={timetableLoading}
        actions={
          <>
            <Button variant="primary" size="sm">
              <i className="bi bi-pencil-square" />
              Edit
            </Button>
          </>
        }
      />

      {timetableLoading && !timetablePeriods ? (
        <TimetableCardSkeleton />
      ) : (
        <div>
          <Card className="mb-5">
            <div className="overflow-x-auto">
              <CardHeader title="Today's Schedule" subtitle={formatToStringDate(Date.now())} />
              <CardBody className="flex flex-wrap justify-start xl:justify-between py-2">
                {timetablePeriods?.TODAY_SCHEDULE.length === 0 ? (
                  <div style={{ color: 'var(--t3)' }} className="py-6 text-center text-[13px]">
                    No classes scheduled today.
                  </div>
                ) : (
                  timetablePeriods?.TODAY_SCHEDULE.map((schedule, index) => {
                    const colors = timetablePeriods?.SUBJECT_COLORS[schedule.subject];
                    return (
                      <div
                        key={index + schedule.time}
                        style={{ borderBottomColor: 'var(--border-light)' }}
                        className=" gap-3 border-b py-2.5 last:border-b-0 mx-2"
                      >
                        <div
                          style={{ color: colors?.accent ?? 'var(--color-primary)' }}
                          className="w-12 shrink-0 text-[12px] font-bold"
                        >
                          {schedule.time}
                        </div>
                        <div>
                          <div
                            style={{ color: colors?.accent ?? 'var(--t1)' }}
                            className="text-[13px] font-semibold truncate"
                          >
                            {schedule.subject}
                          </div>
                          <div
                            style={{ color: 'var(--t3)' }}
                            className="mt-0.5 text-[11px] truncate"
                          >
                            {schedule.teacher}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardBody>
            </div>
          </Card>
          <Card>
            <CardHeader
              title={`${timetableDetails?.term.type} Timetable`}
              subtitle={timetableDetails?.class.name}
            />
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
                    {timetablePeriods?.DAYS?.map((day) => (
                      <th
                        key={day}
                        style={{ borderBottomColor: 'var(--border-light)', color: 'var(--t3)' }}
                        className="border-b-2 p-2 text-left text-[10px] font-bold uppercase"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetablePeriods?.TIMETABLE_SLOTS?.map((slot, index) => (
                    <tr
                      key={index}
                      style={{ borderBottomColor: 'var(--border-light)' }}
                      className="border-b last:border-b-0"
                    >
                      <td
                        style={{ color: 'var(--t3)' }}
                        className="p-2 text-[11px] font-semibold whitespace-nowrap"
                      >
                        {slot?.time}
                      </td>

                      {slot?.subjects === null ? (
                        <td
                          colSpan={5}
                          style={{ backgroundColor: 'var(--surface-2)', color: 'var(--t3)' }}
                          className="p-1.5 text-center text-[10px] font-bold tracking-wide uppercase"
                        >
                          Break
                        </td>
                      ) : (
                        slot.subjects.map((subj, index) => {
                          const colors = timetablePeriods?.SUBJECT_COLORS?.[
                            subj?.subject as string
                          ] ?? {
                            accent: 'var(--t3)',
                            bgVar: 'var(--surface-2)',
                          };
                          return (
                            subj && (
                              <td key={index + subj?.subject} className="p-1">
                                <div
                                  style={{
                                    backgroundColor: colors?.bgVar,
                                    borderLeft: `3px solid ${colors?.accent}`,
                                  }}
                                  className="rounded-lg px-2 py-1.5"
                                >
                                  <div
                                    style={{ color: colors?.accent }}
                                    className="text-[11px] font-bold leading-tight truncate"
                                  >
                                    {subj.subject}
                                  </div>
                                  <div
                                    style={{ color: 'var(--t3)' }}
                                    className="mt-0.5 text-[10px] truncate"
                                  >
                                    {subj.teacher}
                                  </div>
                                </div>
                              </td>
                            )
                          );
                        })
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
