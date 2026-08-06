'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { Table, THead, TH, TBody, TR, TD, Pagination, TableSkeleton } from '@/components/ui/table';
import { AppChart } from '@/components/charts/app-chart';
import { SelectInput } from '@/components/ui/select-input';
import { EmptyTableRow } from '@/components/ui/empty-state';
import { PaginationMeta, Role } from '@/types/definitions';
import { formatToStringDate, formatClock, getTimezone } from '@/utils/helpers';
import { SearchComponent } from '@/components/ui/search-component';
import { SelectSchool } from '@/components/ui/select-school';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useAttendanceStore } from '@/store/attendanceStore';

export default function AttendancePage() {
  const [viewSchools, setViewSchools] = useState(false);
  const [showGroupData, setShowGroupData] = useState(true);
  const [tableDataList, setTableDataList] = useState(['Staffs', 'Students']);
  const [singleSchoolId, setSingleSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const apiCall = useRef(false);
  const selectTable = useRef('Staffs');
  const query = useRef({ page: 1, limit: 20, search: null as string | null });

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolAttendanceAnalytics,
    schoolAttendanceDetails,
    groupAttendanceDetails,
    groupAttendanceAnalytics,
    paginationMeta,
    attendanceLoading,
    attendanceAnalyticsLoading,
    fetchAllSchoolAttendance,
    fetchSchoolAttendanceAnalytics,
    fetchAllGroupSchoolAttendance,
    fetchGroupAttendanceAnalytics,
  } = useAttendanceStore();

  const stats = showGroupData ? groupAttendanceAnalytics : schoolAttendanceAnalytics;
  const attendanceDetails = showGroupData ? groupAttendanceDetails : schoolAttendanceDetails;

  const handleError = (errorMessage: string) => {
    error('Unable to get attendance details', { description: errorMessage });
  };

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    if (data?.groupId) {
      setShowGroupData(true);
      Promise.all([
        fetchAllGroupSchoolAttendance(
          user?.role as Role,
          data.groupId,
          query.current,
          selectTable.current,
          {
            onError: handleError,
          },
        ),
        fetchGroupAttendanceAnalytics(user?.role as Role, data.groupId, selectTable.current, {
          onError: handleError,
        }),
      ]);
      return;
    }

    setShowGroupData(false);
    setSchoolName(data?.schools[0].schoolName as string);
    Promise.all([
      fetchAllSchoolAttendance(
        user?.role as Role,
        data?.schoolIds[0] as string,
        query.current,
        selectTable.current,
        {
          onError: handleError,
        },
      ),
      fetchSchoolAttendanceAnalytics(
        user?.role as Role,
        data?.schoolIds[0] as string,
        selectTable.current,
        {
          onError: handleError,
        },
      ),
    ]);
  }, [user?.role]);

  const updateTableData = (query: { page: number; limit: number; search: string | null }) => {
    if (data?.groupId && singleSchoolId === '') {
      fetchAllGroupSchoolAttendance(
        user?.role as Role,
        data?.groupId as string,
        query,
        selectTable.current,
        {
          onError: handleError,
        },
      );
      return;
    }

    if (singleSchoolId === '') {
      fetchAllSchoolAttendance(
        user?.role as Role,
        data?.schoolIds[0] as string,
        query,
        selectTable.current,
        {
          onError: handleError,
        },
      );
      return;
    }

    if (singleSchoolId !== '') {
      fetchAllSchoolAttendance(user?.role as Role, singleSchoolId, query, selectTable.current, {
        onError: handleError,
      });
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
      fetchAllSchoolAttendance(user?.role as Role, id, query.current, selectTable.current, {
        onError: handleError,
      }),
      fetchSchoolAttendanceAnalytics(user?.role as Role, id, selectTable.current, {
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

    Promise.all([
      fetchAllGroupSchoolAttendance(
        user?.role as Role,
        data?.groupId as string,
        query.current,
        selectTable.current,
        {
          onError: handleError,
        },
      ),
      fetchGroupAttendanceAnalytics(
        user?.role as Role,
        data?.groupId as string,
        selectTable.current,
        {
          onError: handleError,
        },
      ),
    ]);
  };

  const updateAnalytics = () => {
    if (data?.groupId && singleSchoolId === '') {
      fetchGroupAttendanceAnalytics(
        user?.role as Role,
        data?.groupId as string,
        selectTable.current,
        {
          onError: handleError,
        },
      );
      return;
    }

    if (singleSchoolId === '') {
      fetchSchoolAttendanceAnalytics(
        user?.role as Role,
        data?.schoolIds[0] as string,
        selectTable.current,
        {
          onError: handleError,
        },
      );
      return;
    }

    if (singleSchoolId !== '') {
      fetchSchoolAttendanceAnalytics(user?.role as Role, singleSchoolId, selectTable.current, {
        onError: handleError,
      });
      return;
    }
  };

  const selectSchool = () => {
    setViewSchools((view) => !view);
  };

  const setPage = (page: number) => {
    if (page === query.current.page) return;
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = event.target;
    selectTable.current = value;
    query.current.page = 1;
    updateTableData(query.current);
    updateAnalytics();
  };

  return (
    <div className="min-w-0">
      <PageHeader
        title="Attendance"
        subtitle={
          showGroupData ? `${data?.group?.groupName} Attendance` : `${schoolName} Attendance`
        }
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
              <i className="bi bi-check2-square" />
              Mark Attendance
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
              loading={attendanceAnalyticsLoading || !stats}
              icon="bi bi-people-fill"
              color="blue"
              value={showGroupData ? String(stats?.presentToday) : String(stats?.presentToday)}
              label={`${selectTable.current} Present Today`}
              compact
            />
            <StatCard
              loading={attendanceAnalyticsLoading || !stats}
              icon="bi bi-person-x-fill"
              color="red"
              value={showGroupData ? String(stats?.absentToday) : String(stats?.absentToday)}
              label={`${selectTable.current} Absent Today`}
              compact
            />
            <StatCard
              loading={attendanceAnalyticsLoading || !stats}
              icon="bi bi-clock-history"
              color="orange"
              value={showGroupData ? String(stats?.lateToday) : String(stats?.lateToday)}
              label={`${selectTable.current} Late Arrivals`}
              compact
            />
            <StatCard
              loading={attendanceAnalyticsLoading || !stats}
              icon="bi bi-graph-up"
              color="green"
              value={
                showGroupData
                  ? `${String(stats?.thirtyDayAttendanceRate)}%`
                  : ` ${String(stats?.thirtyDayAttendanceRate)}%`
              }
              label={`${selectTable.current} 30-Day Attendance`}
              compact
            />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader title="30-Day Trend" subtitle="School-wide average" />
              <CardBody>
                <div className="h-50">
                  {!attendanceAnalyticsLoading && (
                    <AppChart type="line" data={stats?.thirtyDaysTrend.chart as any} />
                  )}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Attendance by Department" subtitle="Today's snapshot" />
              <CardBody>
                <div className="h-50">
                  {!attendanceAnalyticsLoading && (
                    <AppChart type="bar" data={stats?.attendanceByDepartment.chart as any} />
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader
              title={`${selectTable.current} Attendance Register`}
              subtitle="Real-time check-ins"
              action={
                <>
                  <SelectInput
                    id="country"
                    defaultOption="Switch Tables"
                    list={tableDataList}
                    value={selectTable.current}
                    onChange={handleInputChange}
                  />
                  <SearchComponent
                    id="attendance_search"
                    placeholder="Name, ID, Status"
                    onSearchInput={setSearch}
                    className="w-full"
                  />
                </>
              }
            />
            <Table>
              <THead>
                <TH>#</TH>
                <TH>Name</TH>
                <TH>ID No.</TH>
                <TH>Position</TH>
                <TH>{selectTable.current === 'Staffs' ? 'Employment' : 'Lesson'}</TH>
                <TH>Time In</TH>
                <TH>Time Out</TH>
                <TH>Status</TH>
              </THead>
              {attendanceLoading ? (
                <TableSkeleton rows={5} columns={8} />
              ) : (
                <TBody>
                  {attendanceDetails.length === 0 ? (
                    <EmptyTableRow
                      colSpan={8}
                      icon="bi-calendar-x"
                      message="No attendance recorded"
                    />
                  ) : (
                    (attendanceDetails ?? []).map((attendance, index) => {
                      const rowNumber = (query.current.page - 1) * query.current.limit + index + 1;
                      return (
                        <TR key={attendance.id}>
                          <TD className="w-10 font-semibold text-t3">{rowNumber}</TD>
                          <TD>
                            <NameCell
                              name={
                                selectTable.current === 'Staffs'
                                  ? `${attendance.staff?.users.firstName} ${attendance.staff?.users.lastName}`
                                  : `${attendance.student?.users.firstName} ${attendance.student?.users.lastName}`
                              }
                              index={index}
                            />
                          </TD>
                          <TD className="text-xs text-t2 whitespace-nowrap">
                            {selectTable.current === 'Staffs'
                              ? `${attendance.staff?.staffId}`
                              : `${attendance.student?.studentId}`}
                          </TD>
                          <TD>
                            <Tag>
                              <div className="whitespace-nowrap">
                                {selectTable.current === 'Staffs'
                                  ? `${attendance.staff?.position}`
                                  : `${attendance.student?.position}`}
                              </div>
                            </Tag>
                          </TD>
                          <TD className="truncate">
                            <div className="font-semibold whitespace-nowrap">
                              {selectTable.current === 'Staffs'
                                ? `${attendance?.staff?.employmentStatus}`
                                : `${attendance?.lesson?.name}`}
                            </div>
                            <div className="mt-0.5 text-[11.5px] text-t3">
                              {selectTable.current === 'Staffs'
                                ? `${attendance?.staff?.users?.status}`
                                : `${attendance?.lesson?.classInfo.name}`}
                            </div>
                          </TD>
                          <TD className="font-medium text-t2 whitespace-nowrap">
                            <div className="font-semibold whitespace-nowrap">
                              {formatClock(attendance.clockIn, getTimezone())}
                            </div>
                            <div className="mt-0.5 text-[11.5px] text-t3">
                              {formatToStringDate(attendance.clockIn, false)}
                            </div>
                          </TD>
                          <TD className="font-medium text-t2 whitespace-nowrap">
                            <div className="font-semibold whitespace-nowrap">
                              {formatClock(attendance.clockOut, getTimezone())}
                            </div>
                            <div className="mt-0.5 text-[11.5px] text-t3">
                              {formatToStringDate(attendance.clockOut, false)}
                            </div>
                          </TD>
                          <TD>
                            <Badge
                              color={
                                selectTable.current === 'Staffs'
                                  ? attendance?.status === 'PRESENT'
                                    ? 'green'
                                    : attendance?.status === 'LATE'
                                      ? 'yellow'
                                      : 'red'
                                  : attendance?.attendance === 'PRESENT'
                                    ? 'green'
                                    : attendance?.attendance === 'LATE'
                                      ? 'yellow'
                                      : 'red'
                              }
                            >
                              {selectTable.current === 'Staffs'
                                ? `${attendance?.status}`
                                : `${attendance?.attendance}`}
                            </Badge>
                          </TD>
                        </TR>
                      );
                    })
                  )}
                </TBody>
              )}
            </Table>{' '}
            <Pagination
              pagination={
                { ...(paginationMeta ?? {}), limit: query.current.limit } as PaginationMeta
              }
              onPageChange={setPage}
              onLimitChange={setPageLimit}
              limitOptions={[10, 20, 40, 80, 100]}
            />
          </Card>
        </>
      )}
    </div>
  );
}
