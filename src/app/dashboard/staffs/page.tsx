'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { SearchComponent } from '@/components/ui/search-component';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
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
import { AppChart } from '@/components/charts/app-chart';
import { EmptyTableRow, EmptyRecentActivity } from '@/components/ui/empty-state';
import { NotificationList } from '@/components/dashboard/notification-list';
import { TEACHER_ACTIVITY } from '@/data/staffs';
import { SelectSchool } from '@/components/ui/select-school';
import { PaginationMeta, Role } from '@/types/definitions';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useStaffStore } from '@/store/staffStore';
import { AVATAR_COLORS } from '@/utils/helpers';

export default function StaffsPage() {
  const [viewSchools, setViewSchools] = useState(false);
  const [showGroupData, setShowGroupData] = useState(true);
  const [singleSchoolId, setSingleSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const apiCall = useRef(false);
  const query = useRef({ page: 1, limit: 20, search: null as string | null });

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolStaffDetails,
    groupStaffDetails,
    schoolStaffAnalytics,
    groupStaffAnalytics,
    paginationMeta,
    staffLoading,
    analyticsLoading,
    fetchSchoolStaffAnalytics,
    fetchGroupStaffAnalytics,
    fetchAllSchoolStaff,
    fetchAllGroupSchoolStaff,
  } = useStaffStore();

  const stats = showGroupData ? groupStaffAnalytics : schoolStaffAnalytics;
  const staffDetails = showGroupData ? groupStaffDetails : schoolStaffDetails;

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    const handleError = (errorMessage: string) => {
      error('Unable to get staff details', { description: errorMessage });
    };

    if (data?.groupId) {
      setShowGroupData(true);
      Promise.all([
        fetchAllGroupSchoolStaff(user?.role as Role, data.groupId, query.current, {
          onError: handleError,
        }),
        fetchGroupStaffAnalytics(user?.role as Role, data.groupId, { onError: handleError }),
      ]);
      return;
    }

    setShowGroupData(false);
    setSchoolName(data?.schools[0].schoolName as string);

    Promise.all([
      fetchAllSchoolStaff(user?.role as Role, data?.schoolIds[0] as string, query.current, {
        onError: handleError,
      }),
      fetchSchoolStaffAnalytics(user?.role as Role, data?.schoolIds[0] as string, {
        onError: handleError,
      }),
    ]);
  }, [user?.role]);

  const updateTableData = (query: { page: number; limit: number; search: string | null }) => {
    const handleError = (errorMessage: string) => {
      error('Unable to get staff details', { description: errorMessage });
    };

    if (data?.groupId && singleSchoolId === '') {
      fetchAllGroupSchoolStaff(user?.role as Role, data?.groupId as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId === '') {
      fetchAllSchoolStaff(user?.role as Role, data?.schoolIds[0] as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId !== '') {
      fetchAllSchoolStaff(user?.role as Role, singleSchoolId, query, { onError: handleError });
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
      fetchAllSchoolStaff(user?.role as Role, id, query.current, {
        onError: handleError,
      }),
      fetchSchoolStaffAnalytics(user?.role as Role, id, {
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
      fetchAllGroupSchoolStaff(user?.role as Role, data?.groupId as string, query.current, {
        onError: handleError,
      }),
      fetchGroupStaffAnalytics(user?.role as Role, data?.groupId as string, {
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
        title="Staff Management"
        subtitle={showGroupData ? `${data?.group?.groupName} Staffs` : `${schoolName} Staffs`}
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
              Add Staff
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
              loading={analyticsLoading}
              icon="bi bi-person-workspace"
              color="blue"
              value={showGroupData ? String(stats?.totalStaffs) : String(stats?.totalStaffs)}
              label={singleSchoolId === '' ? `Total Group Staff` : `Total School Staff`}
              compact
            />
            <StatCard
              loading={analyticsLoading}
              icon="bi bi-person-check-fill"
              color="green"
              value={showGroupData ? String(stats?.activeStaffs) : String(stats?.activeStaffs)}
              label="Active"
              compact
            />
            <StatCard
              loading={analyticsLoading}
              icon="bi bi-clock-history"
              color="orange"
              value={showGroupData ? String(stats?.staffsOnLeave) : String(stats?.staffsOnLeave)}
              label="On Leave"
              compact
            />
            <StatCard
              loading={analyticsLoading}
              icon="bi bi-star-fill"
              color="purple"
              value={showGroupData ? String(stats?.averageRating) : String(stats?.averageRating)}
              label={singleSchoolId === '' ? `Avg Group Rating` : `Avg School Rating`}
              compact
            />
          </div>

          <Card>
            <CardHeader
              title="Staff Directory"
              subtitle={
                showGroupData
                  ? `${String(stats?.totalStaffs)} staff members`
                  : `${String(stats?.totalStaffs)} staff members`
              }
              action={
                <SearchComponent
                  id="staff_search"
                  placeholder="Staff Name"
                  onSearchInput={setSearch}
                  className="w-full"
                />
              }
            />
            <Table>
              <THead>
                <TH>#</TH>
                <TH>Teacher</TH>
                <TH>Subject</TH>
                <TH>Department</TH>
                <TH>Lessons/Wk</TH>
                <TH>Rating</TH>
                <TH>Status</TH>
                <TH>Action</TH>
              </THead>
              {staffLoading ? (
                <TableSkeleton rows={5} columns={8} />
              ) : (
                <TBody>
                  {staffDetails.length === 0 ? (
                    <EmptyTableRow colSpan={12} />
                  ) : (
                    (staffDetails ?? []).map((staff, index) => {
                      const subjectNames = Array.isArray(staff.subjects)
                        ? staff.subjects
                            .map((subject) => subject?.name)
                            .filter(Boolean)
                            .join(', ')
                        : '—';
                      const rating = staff.users?.ratings ?? '0';
                      const status = staff.users?.status;
                      const rowNumber = (query.current.page - 1) * query.current.limit + index + 1;

                      return (
                        <TR key={staff.id ?? `${staff.userId}-${index}`}>
                          <TD className="w-10 font-semibold text-t3">{rowNumber}</TD>
                          <TD>
                            <NameCell
                              name={`${staff.users?.firstName} ${staff.users?.lastName}`}
                              index={(index + 3) % AVATAR_COLORS.length}
                            />
                          </TD>
                          <TD>
                            <Tag>{subjectNames}</Tag>
                          </TD>
                          <TD className="font-semibold">{staff.department.name}</TD>
                          <TD className="font-semibold">{staff.lessonCount || '_'}</TD>
                          <TD>
                            <div className="flex items-center gap-1">
                              <i className="bi bi-star-fill text-[13px] text-orange" />
                              <span className="text-[13px] font-bold">{rating}</span>
                            </div>
                          </TD>
                          <TD>
                            <Badge
                              color={
                                status === 'ACTIVE'
                                  ? 'green'
                                  : status === 'LEAVE'
                                    ? 'orange'
                                    : 'gray'
                              }
                            >
                              {status}
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
              limitOptions={[10, 20, 40, 80, 120, 200]}
            />
          </Card>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-5">
            <Card>
              <CardHeader title="Staff Workload" />
              <CardBody>
                {!analyticsLoading && (
                  <AppChart
                    type="bar"
                    height={230}
                    data={stats?.topTeachersByWorkload.chart as any}
                  />
                )}
              </CardBody>
            </Card>
            <Card>
              <CardHeader
                title="Staff Recent Activity"
                action={<Badge color="green">Live</Badge>}
              />
              <CardBody className="py-2">
                {TEACHER_ACTIVITY.length === 0 ? (
                  <EmptyRecentActivity />
                ) : (
                  <NotificationList
                    items={TEACHER_ACTIVITY.map((a) => ({
                      icon: a.icon,
                      bg: 'var(--color-bg)',
                      iconColor: a.color,
                      text: a.text,
                      time: a.time,
                    }))}
                  />
                )}
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
