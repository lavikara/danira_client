'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { Table, THead, TH, TBody, TR, TD, Pagination, TableSkeleton } from '@/components/ui/table';
import { PaginationMeta, Role } from '@/types/definitions';
import { AppChart } from '@/components/charts/app-chart';
import { EmptyTableRow } from '@/components/ui/empty-state';
import { SearchComponent } from '@/components/ui/search-component';
import { SelectSchool } from '@/components/ui/select-school';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useSubjectStore } from '@/store/subjectStore';

export default function SubjectsPage() {
  const [viewSchools, setViewSchools] = useState(false);
  const [showGroupData, setShowGroupData] = useState(true);
  const [singleSchoolId, setSingleSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const apiCall = useRef(false);
  const query = useRef({ page: 1, limit: 20, search: null as string | null });

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolSubjectAnalytics,
    schoolSubjectDetails,
    groupSubjectDetails,
    groupSubjectAnalytics,
    paginationMeta,
    subjectLoading,
    subjectAnalyticsLoading,
    fetchAllSchoolSubject,
    fetchSchoolSubjectAnalytics,
    fetchAllGroupSchoolSubject,
    fetchGroupSubjectAnalytics,
  } = useSubjectStore();

  const stats = showGroupData ? groupSubjectAnalytics : schoolSubjectAnalytics;
  const subjectDetails = showGroupData ? groupSubjectDetails : schoolSubjectDetails;

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    const handleError = (errorMessage: string) => {
      error('Unable to get student details', { description: errorMessage });
    };

    if (data?.groupId) {
      setShowGroupData(true);
      Promise.all([
        fetchAllGroupSchoolSubject(user?.role as Role, data.groupId, query.current, {
          onError: handleError,
        }),
        fetchGroupSubjectAnalytics(user?.role as Role, data.groupId, { onError: handleError }),
      ]);
      return;
    }

    setShowGroupData(false);
    setSchoolName(data?.schools[0].schoolName as string);

    Promise.all([
      fetchAllSchoolSubject(user?.role as Role, data?.schoolIds[0] as string, query.current, {
        onError: handleError,
      }),
      fetchSchoolSubjectAnalytics(user?.role as Role, data?.schoolIds[0] as string, {
        onError: handleError,
      }),
    ]);
  }, [user?.role]);

  const updateTableData = (query: { page: number; limit: number; search: string | null }) => {
    const handleError = (errorMessage: string) => {
      error('Unable to get student details', { description: errorMessage });
    };

    if (data?.groupId && singleSchoolId === '') {
      fetchAllGroupSchoolSubject(user?.role as Role, data?.groupId as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId === '') {
      fetchAllSchoolSubject(user?.role as Role, data?.schoolIds[0] as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId !== '') {
      fetchAllSchoolSubject(user?.role as Role, singleSchoolId, query, { onError: handleError });
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
      fetchAllSchoolSubject(user?.role as Role, id, query.current, {
        onError: handleError,
      }),
      fetchSchoolSubjectAnalytics(user?.role as Role, id, {
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
      fetchAllGroupSchoolSubject(user?.role as Role, data?.groupId as string, query.current, {
        onError: handleError,
      }),
      fetchGroupSubjectAnalytics(user?.role as Role, data?.groupId as string, {
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
        title="Subjects"
        subtitle={showGroupData ? `${data?.group?.groupName} Subjects` : `${schoolName} Subjects`}
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
              Add Subject
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
              loading={subjectAnalyticsLoading || !stats}
              icon="bi bi-book-half"
              color="blue"
              value={showGroupData ? String(stats?.totalSubjects) : String(stats?.totalSubjects)}
              label="Total Subjects"
              compact
            />
            <StatCard
              loading={subjectAnalyticsLoading || !stats}
              icon="bi bi-bookmark-star-fill"
              color="green"
              value={showGroupData ? String(stats?.coreSubjects) : String(stats?.coreSubjects)}
              label="Core Subjects"
              compact
            />
            <StatCard
              loading={subjectAnalyticsLoading || !stats}
              icon="bi bi-bookmark-fill"
              color="orange"
              value={
                showGroupData ? String(stats?.electiveSubjects) : String(stats?.electiveSubjects)
              }
              label="Elective Subjects"
              compact
            />
            <StatCard
              loading={subjectAnalyticsLoading || !stats}
              icon="bi bi-bookmark-fill"
              color="purple"
              value={showGroupData ? String(stats?.mixedSubjects) : String(stats?.mixedSubjects)}
              label="Co-Curricular"
              compact
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 mb-5">
            <Card className="lg:col-start-1 lg:col-end-4">
              <CardHeader title="Subjects by Student" />
              <CardBody>
                <div className="h-50">
                  {!subjectAnalyticsLoading && (
                    <AppChart type="bar" data={stats?.subjectByStudentChart.chart as any} />
                  )}
                </div>
              </CardBody>
            </Card>

            <Card className="lg:col-start-4 lg:col-end-5">
              <CardHeader title="Subjects by Department" />
              <CardBody>
                <div className="h-50">
                  {!subjectAnalyticsLoading && (
                    <AppChart
                      type="doughnut"
                      data={stats?.subjectByDepartmentChart.chart as any}
                      options={{
                        cutout: '70%',
                      }}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader
                title="All Subjects"
                subtitle={String(`${paginationMeta?.total} subjects`)}
                action={
                  <SearchComponent
                    id="subject_search"
                    placeholder="Subject Name, Code"
                    onSearchInput={setSearch}
                    className="w-full"
                  />
                }
              />
              <Table>
                <THead>
                  <TH>#</TH>
                  <TH>Subject</TH>
                  <TH>Department</TH>
                  <TH>Category</TH>
                  <TH>Teacher</TH>
                  <TH>Classes</TH>
                  <TH>Students</TH>
                  <TH>Avg Score</TH>
                </THead>
                {subjectLoading ? (
                  <TableSkeleton rows={5} columns={10} />
                ) : (
                  <TBody>
                    {subjectDetails.length === 0 ? (
                      <EmptyTableRow colSpan={8} icon="bi-book-half" message="No subjects added" />
                    ) : (
                      (subjectDetails ?? []).map((subject, index) => {
                        const rowNumber =
                          (query.current.page - 1) * query.current.limit + index + 1;
                        return (
                          <TR key={subject.id}>
                            <TD className="w-10 font-semibold text-t3">{rowNumber}</TD>
                            <TD>
                              <div className="font-semibold whitespace-nowrap">{subject.name}</div>
                              <div className="mt-0.5 text-[11.5px] text-t3">{subject.code}</div>
                            </TD>
                            <TD>
                              <Tag>{subject.department.name}</Tag>
                            </TD>
                            <TD>
                              <Badge color={subject.category === 'Core' ? 'blue' : 'purple'}>
                                {subject.category}
                              </Badge>
                            </TD>
                            <TD>
                              <Tag>{subject.subjectTeacher}</Tag>
                            </TD>
                            <TD className="font-semibold">{subject.studentClassCount.classes}</TD>
                            <TD className="font-semibold">{subject.studentClassCount.students}</TD>
                            <TD>
                              <Badge
                                color={
                                  subject.averageScore >= 70
                                    ? 'green'
                                    : subject.averageScore >= 60
                                      ? 'orange'
                                      : 'red'
                                }
                              >
                                {subject.averageScore}%
                              </Badge>
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
          </div>
        </>
      )}
    </div>
  );
}
