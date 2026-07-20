'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { StatBar } from '@/components/ui/progress-bar';
import {
  Table,
  THead,
  TH,
  TBody,
  TR,
  TD,
  Pagination,
  ActionButtons,
  TableSkeleton,
} from '@/components/ui/table';
import { EmptyTableRow } from '@/components/ui/empty-state';
import { PaginationMeta, Role } from '@/types/definitions';
import { SearchComponent } from '@/components/ui/search-component';
import { AppChart } from '@/components/charts/app-chart';
import { SelectSchool } from '@/components/ui/select-school';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useStudentStore } from '@/store/studentStore';

function attendanceColor(att: number) {
  if (att >= 90) return 'var(--color-green)';
  if (att >= 75) return 'var(--color-orange)';
  return 'var(--color-red)';
}

export default function StudentsPage() {
  const [viewSchools, setViewSchools] = useState(false);
  const [showGroupData, setShowGroupData] = useState(true);
  const [singleSchoolId, setSingleSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const apiCall = useRef(false);
  const query = useRef({ page: 1, limit: 20, search: null as string | null });

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolStudentAnalytics,
    schoolStudentDetails,
    groupStudentDetails,
    paginationMeta,
    groupStudentAnalytics,
    studentAnalyticsLoading,
    studentLoading,
    fetchAllSchoolStudent,
    fetchSchoolStudentAnalytics,
    fetchAllGroupSchoolStudent,
    fetchGroupStudentAnalytics,
  } = useStudentStore();

  const stats = showGroupData ? groupStudentAnalytics : schoolStudentAnalytics;
  const schoolDetails = showGroupData ? groupStudentDetails : schoolStudentDetails;

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    const handleError = (errorMessage: string) => {
      error('Unable to get staff details', { description: errorMessage });
    };

    if (data?.groupId) {
      setShowGroupData(true);
      Promise.all([
        fetchAllGroupSchoolStudent(user?.role as Role, data.groupId, query.current, {
          onError: handleError,
        }),
        fetchGroupStudentAnalytics(user?.role as Role, data.groupId, { onError: handleError }),
      ]);
      return;
    }

    setShowGroupData(false);
    setSchoolName(data?.schools[0].schoolName as string);

    Promise.all([
      fetchAllSchoolStudent(user?.role as Role, data?.schoolIds[0] as string, query.current, {
        onError: handleError,
      }),
      fetchSchoolStudentAnalytics(user?.role as Role, data?.schoolIds[0] as string, {
        onError: handleError,
      }),
    ]);
  }, [user?.role]);

  const updateTableData = (query: { page: number; limit: number; search: string | null }) => {
    const handleError = (errorMessage: string) => {
      error('Unable to get staff details', { description: errorMessage });
    };

    if (data?.groupId && singleSchoolId === '') {
      fetchAllGroupSchoolStudent(user?.role as Role, data?.groupId as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId === '') {
      fetchAllSchoolStudent(user?.role as Role, data?.schoolIds[0] as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId !== '') {
      fetchAllSchoolStudent(user?.role as Role, singleSchoolId, query, { onError: handleError });
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
      error('Unable to get staff details', { description: errorMessage });
    };
    query.current = { page: 1, limit: 20, search: null };
    Promise.all([
      fetchAllSchoolStudent(user?.role as Role, id, query.current, {
        onError: handleError,
      }),
      fetchSchoolStudentAnalytics(user?.role as Role, id, {
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
      error('Unable to get staff details', { description: errorMessage });
    };
    Promise.all([
      fetchAllGroupSchoolStudent(user?.role as Role, data?.groupId as string, query.current, {
        onError: handleError,
      }),
      fetchGroupStudentAnalytics(user?.role as Role, data?.groupId as string, {
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
        title="Student Management"
        subtitle={showGroupData ? `${data?.group?.groupName} Students` : `${schoolName} Students`}
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

      {viewSchools ? (
        <SelectSchool schools={data?.schools} getSchoolDetails={getSchoolDetails} />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              loading={studentAnalyticsLoading || !stats}
              icon="bi bi-people-fill"
              color="blue"
              value={showGroupData ? String(stats?.totalStudents) : String(stats?.totalStudents)}
              label="Total Student"
              compact
            />
            <StatCard
              loading={studentAnalyticsLoading || !stats}
              icon="bi bi-person-check-fill"
              color="green"
              value={showGroupData ? String(stats?.activeStudents) : String(stats?.activeStudents)}
              label="Active"
              compact
            />
            <StatCard
              loading={studentAnalyticsLoading || !stats}
              icon="bi bi-person-plus-fill"
              color="purple"
              value={showGroupData ? String(stats?.newIntakes) : String(stats?.newIntakes)}
              label="New Intake"
              compact
            />
            <StatCard
              loading={studentAnalyticsLoading || !stats}
              icon="bi bi-exclamation-circle-fill"
              color="red"
              value={
                showGroupData ? String(stats?.outstandingFees) : String(stats?.outstandingFees)
              }
              label="Students Owing"
              compact
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-5">
            <Card className="col-start-1 col-end-3">
              <CardHeader title="Students in Department" />
              <CardBody>
                {!studentAnalyticsLoading && (
                  <AppChart
                    type="bar"
                    height={230}
                    data={stats?.studentsByDepartment.chart as any}
                  />
                )}
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Gender Distribution" subtitle="Current enrollment" />
              <CardBody className="flex items-center gap-4">
                <div className="h-30 w-full shrink-0">
                  {!studentAnalyticsLoading && (
                    <div>
                      <AppChart
                        type="doughnut"
                        data={stats?.studentsByGender.chart as any}
                        options={{ cutout: '70%' }}
                      />
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-1">
                          <div
                            className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                            style={{
                              backgroundColor: String(
                                stats?.studentsByGender.chart.datasets[0].backgroundColor[1],
                              ),
                            }}
                          />
                          <span className="flex-1 text-[12px] text-t2">Female</span>
                          <strong className="text-[13px]">
                            {stats?.studentsByGender.chart.datasets[0].data[1]}
                          </strong>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                            style={{
                              backgroundColor: String(
                                stats?.studentsByGender.chart.datasets[0].backgroundColor[0],
                              ),
                            }}
                          />
                          <span className="flex-1 text-[12px] text-t2">Male</span>
                          <strong className="text-[13px]">
                            {stats?.studentsByGender.chart.datasets[0].data[0]}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader
              title="All Students"
              subtitle={
                showGroupData
                  ? `${String(stats?.totalStudents)} students.`
                  : `${String(stats?.totalStudents)} students.`
              }
              action={
                <SearchComponent
                  id="staff_search"
                  placeholder="Name, ID, Class, Email"
                  onSearchInput={setSearch}
                  className="w-full"
                />
              }
            />
            <Table>
              <THead>
                <TH>#</TH>
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
              {studentLoading ? (
                <TableSkeleton rows={5} columns={10} />
              ) : (
                <TBody>
                  {schoolDetails.length === 0 ? (
                    <EmptyTableRow colSpan={10} />
                  ) : (
                    (schoolDetails ?? []).map((student, index) => {
                      const rowNumber = (query.current.page - 1) * query.current.limit + index + 1;
                      return (
                        <TR key={student.id}>
                          <TD className="w-10 font-semibold text-t3">{rowNumber}</TD>
                          <TD>
                            <input type="checkbox" />
                          </TD>
                          <TD>
                            <NameCell
                              name={`${student.users.firstName} ${student.users.lastName}`}
                              sub={student.studentId}
                              index={index}
                            />
                          </TD>
                          <TD className="text-xs text-t2 whitespace-nowrap">{student.studentId}</TD>
                          <TD>
                            <Tag>{student.class.name}</Tag>
                          </TD>
                          <TD>
                            <Badge color={student.users.gender === 'FEMALE' ? 'pink' : 'purple'}>
                              {student.users.gender}
                            </Badge>
                          </TD>
                          <TD className="min-w-27.5">
                            <StatBar
                              pct={student.attendances as number}
                              color={attendanceColor(student.attendances as number)}
                            />
                          </TD>
                          <TD>
                            <Badge
                              color={
                                student.fees === 'PAID'
                                  ? 'green'
                                  : student.fees === 'PARTIAL'
                                    ? 'orange'
                                    : 'red'
                              }
                            >
                              {student.fees as string}
                            </Badge>
                          </TD>
                          <TD>
                            <Badge color={student.users.status === 'ACTIVE' ? 'green' : 'red'}>
                              {student.users.status}
                            </Badge>
                          </TD>
                          <TD>
                            <ActionButtons />
                          </TD>
                        </TR>
                      );
                    })
                  )}
                </TBody>
              )}
            </Table>
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
