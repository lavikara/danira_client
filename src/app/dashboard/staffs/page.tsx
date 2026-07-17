'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { Table, THead, TH, TBody, TR, TD, ActionButtons } from '@/components/ui/table';
import { AppChart } from '@/components/charts/app-chart';
import { EmptyStaffs, EmptyRecentActivity } from '@/components/ui/empty-state';
import { NotificationList } from '@/components/dashboard/notification-list';
import { TEACHER_ACTIVITY } from '@/data/staffs';
import { Role } from '@/types/definitions';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useStaffStore } from '@/store/staffStore';
import { AVATAR_COLORS } from '@/utils/helpers';

export default function StaffsPage() {
  const [isEmpty, setIsEmpty] = useState(false);
  const apiCall = useRef(false);
  const [showGroupData, setShowGroupData] = useState(true);

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolStaffDetails,
    groupStaffDetails,
    schoolStaffAnalytics,
    groupStaffAnalytics,
    staffLoading,
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
        fetchAllGroupSchoolStaff(user.role as Role, data?.groupId, { onError: handleError }),
        fetchGroupStaffAnalytics(user.role as Role, data?.groupId, { onError: handleError }),
      ]);
      return;
    }

    setShowGroupData(false);
    fetchAllSchoolStaff(user.role as Role, data?.schoolIds[0] as string, { onError: handleError });
    fetchSchoolStaffAnalytics(user.role as Role, data?.schoolIds[0] as string, {
      onError: handleError,
    });
  }, [user?.role]);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Staff Management"
        subtitle="Staff directory, ratings and workload tracking"
        actions={
          <>
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
              Add Teacher
            </Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyStaffs />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              loading={staffLoading}
              icon="bi bi-person-workspace"
              color="blue"
              value={showGroupData ? String(stats?.totalStaffs) : String(stats?.totalStaffs)}
              label="Total Staff"
              compact
            />
            <StatCard
              loading={staffLoading}
              icon="bi bi-person-check-fill"
              color="green"
              value={showGroupData ? String(stats?.activeStaffs) : String(stats?.activeStaffs)}
              label="Active"
              compact
            />
            <StatCard
              loading={staffLoading}
              icon="bi bi-clock-history"
              color="orange"
              value={showGroupData ? String(stats?.staffsOnLeave) : String(stats?.staffsOnLeave)}
              label="On Leave"
              compact
            />
            <StatCard
              loading={staffLoading}
              icon="bi bi-star-fill"
              color="purple"
              value={showGroupData ? String(stats?.averageRating) : String(stats?.averageRating)}
              label="Avg Rating"
              compact
            />
          </div>

          <Card>
            <CardHeader
              title="Teacher Directory"
              subtitle={
                showGroupData
                  ? `${String(stats?.totalStaffs)} staff members`
                  : `${String(stats?.totalStaffs)} staff members`
              }
              action={
                <Button variant="ghost" size="sm">
                  <i className="bi bi-funnel" />
                  Filter
                </Button>
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
              <TBody>
                {(staffDetails ?? []).map((staff, index) => {
                  const subjectNames = Array.isArray(staff.subjects)
                    ? staff.subjects
                        .map((subject) => subject?.name)
                        .filter(Boolean)
                        .join(', ')
                    : '—';
                  const rating = staff.users?.ratings ?? '0';
                  const status = staff.users?.status;

                  return (
                    <TR key={staff.id ?? `${staff.userId}-${index}`}>
                      <TD className="w-10 font-semibold text-t3)]">{index + 1}</TD>
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
                            status === 'ACTIVE' ? 'green' : status === 'LEAVE' ? 'orange' : 'gray'
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
                })}
              </TBody>
            </Table>
          </Card>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-5">
            <Card>
              <CardHeader title="Staff Workload" />
              <CardBody>
                {!staffLoading && (
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
