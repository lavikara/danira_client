'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { avatarColor, initials } from '@/utils/helpers';
import Link from 'next/link';
import { StatCard } from '@/components/ui/stat-card';
import { Pagination } from '@/components/ui/table';
import { Card, CardHeader, CardBody, CardLoading } from '@/components/ui/card';
import { SearchComponent } from '@/components/ui/search-component';
import { SelectSchool } from '@/components/ui/select-school';
import { PaginationMeta, Role } from '@/types/definitions';
import { useToastContext } from '@/contexts/toast-context';
import { EmptySearch } from '@/components/ui/empty-state';
import { useUserStore } from '@/store/userStore';
import { useTimetablesStore } from '@/store/timetableStore';

export default function TimetablePage() {
  const [viewSchools, setViewSchools] = useState(false);
  const [showGroupData, setShowGroupData] = useState(true);
  const [singleSchoolId, setSingleSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const apiCall = useRef(false);
  const query = useRef({ page: 1, limit: 20, search: null as string | null });

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolTimetableDetails,
    groupTimetableDetails,
    groupTimetableAnalytics,
    schoolTimetableAnalytics,
    paginationMeta,
    timetableLoading,
    timetableAnalyticsLoading,
    fetchAllSchoolTimetable,
    fetchAllGroupSchoolTimetable,
    fetchSchoolTimetableAnalytics,
    fetchGroupTimetableAnalytics,
  } = useTimetablesStore();

  const stats = showGroupData ? groupTimetableAnalytics : schoolTimetableAnalytics;
  const timetableDetails = showGroupData ? groupTimetableDetails : schoolTimetableDetails;

  const handleError = (errorMessage: string) => {
    error('Unable to get timetable details', { description: errorMessage });
  };

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    if (data?.groupId) {
      setShowGroupData(true);
      Promise.all([
        fetchAllGroupSchoolTimetable(user?.role as Role, data.groupId, query.current, {
          onError: handleError,
        }),
        fetchGroupTimetableAnalytics(user?.role as Role, data.groupId, { onError: handleError }),
      ]);
      return;
    }

    setShowGroupData(false);
    setSchoolName(data?.schools[0].schoolName as string);

    Promise.all([
      fetchAllSchoolTimetable(user?.role as Role, data?.schoolIds[0] as string, query.current, {
        onError: handleError,
      }),
      fetchSchoolTimetableAnalytics(user?.role as Role, data?.schoolIds[0] as string, {
        onError: handleError,
      }),
    ]);
  }, [user?.role]);

  const updateTableData = (query: { page: number; limit: number; search: string | null }) => {
    if (data?.groupId && singleSchoolId === '') {
      fetchAllGroupSchoolTimetable(user?.role as Role, data?.groupId as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId === '') {
      fetchAllSchoolTimetable(user?.role as Role, data?.schoolIds[0] as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId !== '') {
      fetchAllSchoolTimetable(user?.role as Role, singleSchoolId, query, { onError: handleError });
      return;
    }
  };

  const getSchoolDetails = (id: string) => {
    if (id === singleSchoolId) {
      setViewSchools(false);
      return;
    }

    setShowGroupData(false);
    setSingleSchoolId(id);

    query.current = { page: 1, limit: 20, search: null };
    Promise.all([
      fetchAllSchoolTimetable(user?.role as Role, id, query.current, {
        onError: handleError,
      }),
      fetchSchoolTimetableAnalytics(user?.role as Role, id, {
        onError: handleError,
      }),
    ]);
    const school = data?.schools.find((school) => school.id === id);
    setSchoolName(school?.schoolName as string);
    setViewSchools(false);
  };

  const getGroupDetails = () => {
    query.current = { page: 1, limit: 20, search: null };
    setShowGroupData(true);
    setSingleSchoolId('');

    fetchAllGroupSchoolTimetable(user?.role as Role, data?.groupId as string, query.current, {
      onError: handleError,
    });
    Promise.all([
      fetchAllGroupSchoolTimetable(user?.role as Role, data?.groupId as string, query.current, {
        onError: handleError,
      }),
      fetchGroupTimetableAnalytics(user?.role as Role, data?.groupId as string, {
        onError: handleError,
      }),
    ]);
  };

  const selectSchool = () => {
    setViewSchools((view) => !view);
  };

  const setPage = (page: number) => {
    query.current.page = page;
    updateTableData(query.current);
  };

  const setPageLimit = (limit: number) => {
    query.current.limit = limit;
    query.current.page = 1;
    updateTableData(query.current);
  };

  const setSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = event.target;
    query.current.search = value;
    query.current.page = 1;
    updateTableData(query.current);
  };

  return (
    <div className="min-w-0">
      <PageHeader
        title="Timetable"
        subtitle={showGroupData ? `${data?.group?.groupName} Subjects` : `${schoolName} Timetables`}
        actions={
          <>
            {data?.groupId && (
              <div>
                {singleSchoolId !== '' && (
                  <Button variant="ghost" size="sm" className="mr-2" onClick={getGroupDetails}>
                    Group Info
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={selectSchool}>
                  Select School
                </Button>
              </div>
            )}
            <Button variant="primary" size="sm">
              <i className="bi bi-pencil-square" />
              Edit
            </Button>
          </>
        }
      />

      {viewSchools ? (
        <SelectSchool schools={data?.schools} getSchoolDetails={getSchoolDetails} />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              loading={timetableAnalyticsLoading || !stats}
              icon="<bi bi-pencil"
              color="blue"
              value={showGroupData ? String(stats?.totalLessons) : String(stats?.totalLessons)}
              label="Total Lessons"
              compact
            />
            <StatCard
              loading={timetableAnalyticsLoading || !stats}
              icon="bi bi-stopwatch"
              color="green"
              value={showGroupData ? String(stats?.totalPeriod) : String(stats?.totalPeriod)}
              label="Total Periods"
              compact
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader
                title="All Timetables"
                subtitle={String(`${paginationMeta?.total} timetables`)}
                action={
                  <SearchComponent
                    id="timetable_search"
                    placeholder="Class Name, Term"
                    onSearchInput={setSearch}
                    className="w-full"
                  />
                }
              />
              {timetableLoading ? (
                <CardLoading />
              ) : (
                <CardBody className="grid grid-cols-1 gap-3 sm:grid-cols-4 ">
                  {timetableDetails.length === 0 ? (
                    <EmptySearch className="col-start-1 col-end-5" />
                  ) : (
                    timetableDetails.map((timetable, index) => (
                      <Link
                        href={{
                          pathname: `timetable/${timetable.class.name}`,
                          query: { id: `${timetable.id}`, schoolId: `${timetable.schoolId}` },
                        }}
                        key={timetable.id}
                        className="rounded-xl border-[1.5px] border-border-light p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card cursor-pointer"
                      >
                        <div className="mb-2.5 flex items-center justify-between">
                          <span className="text-[14px] font-bold text-t1 truncate">
                            {timetable.class.name}
                          </span>
                          <span className="rounded-md bg-primary-50 px-2 py-0.5 text-[11px] font-bold text-primary">
                            {timetable.class.type}
                          </span>
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                          <div
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[9px] font-bold text-white"
                            style={{ backgroundColor: avatarColor(index) }}
                          >
                            {initials(`${timetable.term.type}`)}
                          </div>
                          <span className="truncate text-[12px] text-t2">
                            {timetable.term.name}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-t2">
                          <span>
                            <i className="bi bi-pencil"></i> {timetable.totalLessons} lessons
                          </span>
                          <span>
                            <i className="bi bi-stopwatch"></i> {timetable.totalPeriods} periods.
                          </span>
                        </div>
                      </Link>
                    ))
                  )}
                </CardBody>
              )}
              <Pagination
                pagination={
                  { ...(paginationMeta ?? {}), limit: query.current.limit } as PaginationMeta
                }
                onPageChange={setPage}
                onLimitChange={setPageLimit}
                limitOptions={[10, 20, 40, 80, 100]}
              />
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
