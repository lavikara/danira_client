'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody, CardLoading } from '@/components/ui/card';
import { Pagination } from '@/components/ui/table';
import { AppChart } from '@/components/charts/app-chart';
import { SearchComponent } from '@/components/ui/search-component';
import { avatarColor, initials } from '@/utils/helpers';
import { PaginationMeta, Role } from '@/types/definitions';
import { formatAmount } from '@/utils/helpers';
import { SelectSchool } from '@/components/ui/select-school';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useClassStore } from '@/store/classStore';

export default function ClassesPage() {
  const [viewSchools, setViewSchools] = useState(false);
  const [showGroupData, setShowGroupData] = useState(true);
  const [singleSchoolId, setSingleSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const apiCall = useRef(false);
  const query = useRef({ page: 1, limit: 20, search: null as string | null });

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolClassAnalytics,
    schoolClassDetails,
    groupClassDetails,
    groupClassAnalytics,
    paginationMeta,
    classLoading,
    classAnalyticsLoading,
    fetchAllSchoolClass,
    fetchSchoolClassAnalytics,
    fetchAllGroupSchoolClass,
    fetchGroupClassAnalytics,
  } = useClassStore();

  const stats = showGroupData ? groupClassAnalytics : schoolClassAnalytics;
  const classDetails = showGroupData ? groupClassDetails : schoolClassDetails;

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    const handleError = (errorMessage: string) => {
      error('Unable to get student details', { description: errorMessage });
    };

    if (data?.groupId) {
      setShowGroupData(true);
      Promise.all([
        fetchAllGroupSchoolClass(user?.role as Role, data.groupId, query.current, {
          onError: handleError,
        }),
        fetchGroupClassAnalytics(user?.role as Role, data.groupId, { onError: handleError }),
      ]);
      return;
    }

    setShowGroupData(false);
    setSchoolName(data?.schools[0].schoolName as string);

    Promise.all([
      fetchAllSchoolClass(user?.role as Role, data?.schoolIds[0] as string, query.current, {
        onError: handleError,
      }),
      fetchSchoolClassAnalytics(user?.role as Role, data?.schoolIds[0] as string, {
        onError: handleError,
      }),
    ]);
  }, [user?.role]);

  const updateTableData = (query: { page: number; limit: number; search: string | null }) => {
    const handleError = (errorMessage: string) => {
      error('Unable to get student details', { description: errorMessage });
    };

    if (data?.groupId && singleSchoolId === '') {
      fetchAllGroupSchoolClass(user?.role as Role, data?.groupId as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId === '') {
      fetchAllSchoolClass(user?.role as Role, data?.schoolIds[0] as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId !== '') {
      fetchAllSchoolClass(user?.role as Role, singleSchoolId, query, { onError: handleError });
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

    const handleError = (errorMessage: string) => {
      error('Unable to get student details', { description: errorMessage });
    };
    query.current = { page: 1, limit: 20, search: null };
    Promise.all([
      fetchAllSchoolClass(user?.role as Role, id, query.current, {
        onError: handleError,
      }),
      fetchSchoolClassAnalytics(user?.role as Role, id, {
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

    const handleError = (errorMessage: string) => {
      error('Unable to get student details', { description: errorMessage });
    };
    Promise.all([
      fetchAllGroupSchoolClass(user?.role as Role, data?.groupId as string, query.current, {
        onError: handleError,
      }),
      fetchGroupClassAnalytics(user?.role as Role, data?.groupId as string, {
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
        title="Class Management"
        subtitle={showGroupData ? `${data?.group?.groupName} Classes` : `${schoolName} Classes`}
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
              <i className="bi bi-plus-circle-fill" />
              Create Class
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
              loading={classAnalyticsLoading || !stats}
              icon="bi bi-journal-bookmark-fill"
              color="blue"
              value={showGroupData ? String(stats?.totalClasses) : String(stats?.totalClasses)}
              label="Total Classes"
              compact
            />
            <StatCard
              loading={classAnalyticsLoading || !stats}
              icon="bi bi-people-fill"
              color="green"
              value={
                showGroupData
                  ? String(stats?.averageClassSize.toFixed(1))
                  : String(stats?.averageClassSize.toFixed(1))
              }
              label="Avg Class Size"
              compact
            />
            <StatCard
              loading={classAnalyticsLoading || !stats}
              icon="bi bi-graph-up-arrow"
              color="purple"
              value={
                showGroupData
                  ? String(`${stats?.averagePerformance.toFixed(1)}%`)
                  : String(`${stats?.averagePerformance.toFixed(1)}%`)
              }
              label="% Performance"
              compact
            />
            <StatCard
              loading={classAnalyticsLoading || !stats}
              icon="bi bi-clock-history"
              color="teal"
              value={
                showGroupData
                  ? String(`${stats?.averageAttendance.toFixed(1)}%`)
                  : String(`${stats?.averageAttendance.toFixed(1)}%`)
              }
              label="% Attendance"
              compact
            />
          </div>

          <Card className="mb-5">
            <CardHeader title="Students per Class" />
            <CardBody>
              <div className="h-50">
                {!classAnalyticsLoading && (
                  <AppChart type="bar" data={stats?.topClassesByPopulation.chart as any} />
                )}
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader
                title="All Classes"
                subtitle={String(`${paginationMeta?.total} classes`)}
                action={
                  <SearchComponent
                    id="class_search"
                    placeholder="Class Name, Supervisor Name"
                    onSearchInput={setSearch}
                    className="w-full"
                  />
                }
              />
              {classLoading ? (
                <CardLoading />
              ) : (
                <CardBody className="grid grid-cols-1 gap-3 sm:grid-cols-4 ">
                  {classDetails.map((classes, index) => (
                    <div
                      key={classes.id}
                      className="rounded-xl border-[1.5px] border-border-light p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card cursor-pointer"
                    >
                      <div className="mb-2.5 flex items-center justify-between">
                        <span className="text-[14px] font-bold text-t1 truncate">
                          {classes.name}
                        </span>
                        <span className="rounded-md bg-primary-50 px-2 py-0.5 text-[11px] font-bold text-primary">
                          {classes.department.name}
                        </span>
                      </div>
                      <div className="mb-3 flex items-center gap-2">
                        <div
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[9px] font-bold text-white"
                          style={{ backgroundColor: avatarColor(index) }}
                        >
                          {initials(
                            `${classes.supervisor.users.firstName} ${classes.supervisor.users.lastName}`,
                          )}
                        </div>
                        <span className="truncate text-[12px] text-t2">{`${classes.supervisor.users.firstName} ${classes.supervisor.users.lastName}`}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-t2">
                        <span>
                          <i className="bi bi-people" /> {classes.population}
                        </span>
                        <span>
                          <i className="bi bi-book" /> {classes.subjectCount} subj.
                        </span>
                        <span className="font-bold text-primary">
                          <i className="bi bi-cash-stack text-t2" />{' '}
                          {formatAmount(
                            classes.compulsoryFeesAmount.amount,
                            2,
                            classes.compulsoryFeesAmount.currency,
                          )}
                          <span className="font-normal text-[12px] text-t2"> fees</span>
                        </span>
                      </div>
                    </div>
                  ))}
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
