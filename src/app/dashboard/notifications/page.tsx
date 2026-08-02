'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
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
import { SelectSchool } from '@/components/ui/select-school';
import { PaginationMeta, Role } from '@/types/definitions';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { formatToStringDate, truncate } from '@/utils/helpers';
import { SearchComponent } from '@/components/ui/search-component';

export default function NotificationsPage() {
  const [viewSchools, setViewSchools] = useState(false);
  const [showGroupData, setShowGroupData] = useState(true);
  const [singleSchoolId, setSingleSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const apiCall = useRef(false);
  const query = useRef({ page: 1, limit: 20, search: null as string | null });

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolNotificationDetails,
    groupNotificationDetails,
    schoolNotificationAnalytics,
    groupNotificationAnalytics,
    paginationMeta,
    notificationLoading,
    notificationAnalyticsLoading,
    fetchSchoolNotificationAnalytics,
    fetchGroupNotificationAnalytics,
    fetchAllSchoolNotification,
    fetchAllGroupNotification,
  } = useNotificationStore();

  const stats = showGroupData ? groupNotificationAnalytics : schoolNotificationAnalytics;
  const notificationDetails = showGroupData ? groupNotificationDetails : schoolNotificationDetails;

  const handleError = (errorMessage: string) => {
    error('Unable to get notification details', { description: errorMessage });
  };

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    if (data?.groupId) {
      setShowGroupData(true);
      Promise.all([
        fetchAllGroupNotification(user?.role as Role, data.groupId, query.current, {
          onError: handleError,
        }),
        fetchGroupNotificationAnalytics(user?.role as Role, data.groupId, { onError: handleError }),
      ]);
      return;
    }

    setShowGroupData(false);
    setSchoolName(data?.schools[0].schoolName as string);

    Promise.all([
      fetchAllSchoolNotification(user?.role as Role, data?.schoolIds[0] as string, query.current, {
        onError: handleError,
      }),
      fetchSchoolNotificationAnalytics(user?.role as Role, data?.schoolIds[0] as string, {
        onError: handleError,
      }),
    ]);
  }, [user?.role]);

  const updateTableData = (query: { page: number; limit: number; search: string | null }) => {
    if (data?.groupId && singleSchoolId === '') {
      fetchAllGroupNotification(user?.role as Role, data?.groupId as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId === '') {
      fetchAllSchoolNotification(user?.role as Role, data?.schoolIds[0] as string, query, {
        onError: handleError,
      });
      return;
    }

    if (singleSchoolId !== '') {
      fetchAllSchoolNotification(user?.role as Role, singleSchoolId, query, {
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
      fetchAllSchoolNotification(user?.role as Role, id, query.current, {
        onError: handleError,
      }),
      fetchSchoolNotificationAnalytics(user?.role as Role, id, {
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
      fetchAllGroupNotification(user?.role as Role, data?.groupId as string, query.current, {
        onError: handleError,
      }),
      fetchGroupNotificationAnalytics(user?.role as Role, data?.groupId as string, {
        onError: handleError,
      }),
    ]);
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

  return (
    <div className="min-w-0">
      <PageHeader
        title="Notifications & Announcements"
        subtitle={
          showGroupData ? `${data?.group?.groupName} Notifications` : `${schoolName} Notifications`
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
              <i className="bi bi-megaphone-fill" />
              New Announcement
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
              loading={notificationAnalyticsLoading || !stats}
              icon="bi bi-bell-fill"
              color="blue"
              value={String(stats?.unreadCount)}
              label="Unread"
              compact
            />
            <StatCard
              loading={notificationAnalyticsLoading || !stats}
              icon="bi bi-megaphone-fill"
              color="green"
              value={String(stats?.last30DaysTotal)}
              label="Sent This Month"
              compact
            />
            <StatCard
              loading={notificationAnalyticsLoading || !stats}
              icon="bi bi-envelope-check-fill"
              color="orange"
              value={`${String(stats?.avgOpenRateLast30Days)}%`}
              label="30 Day Avg"
              compact
            />
            <StatCard
              loading={notificationAnalyticsLoading || !stats}
              icon="bi bi-people-fill"
              color="purple"
              value={String(stats?.totalReach)}
              label="30 Days Total"
              compact
            />
          </div>

          <Card>
            <CardHeader
              title="All Notifications"
              subtitle={String(`${paginationMeta?.total} notifications`)}
              action={
                <SearchComponent
                  id="notification_search"
                  placeholder="Title, Type, Priority"
                  onSearchInput={setSearch}
                  className="w-full"
                />
              }
            />
            <Table>
              <THead>
                <TH>#</TH>
                <TH>Title</TH>
                <TH>Type</TH>
                <TH>Date</TH>
                <TH>Delivered</TH>
                <TH>Total Opened</TH>
                <TH>Priority</TH>
                <TH>Action</TH>
              </THead>
              {notificationLoading ? (
                <TableSkeleton rows={5} columns={9} />
              ) : (
                <TBody>
                  {notificationDetails.length === 0 ? (
                    <EmptyTableRow
                      colSpan={8}
                      icon="bi-bell-slash-fill"
                      message="No notifications found"
                    />
                  ) : (
                    (notificationDetails ?? []).map((noti, index) => {
                      const rowNumber = (query.current.page - 1) * query.current.limit + index + 1;
                      const viewed =
                        noti.recipients
                          ?.map((recipient) => recipient.isRead === true)
                          .filter(Boolean).length || 0;
                      return (
                        <TR key={noti.title}>
                          <TD className="w-10 font-semibold text-t3">{rowNumber}</TD>
                          <TD className="flex items-center font-semibold truncate">
                            <div
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[9px] mr-2"
                              style={{ backgroundColor: noti.bgColor }}
                            >
                              <i className={noti.icon} style={{ color: noti.iconColor }} />
                            </div>
                            {truncate(noti.title, 24)}
                          </TD>
                          <TD>
                            <div className="text-[10px] text-t2">{noti.type}</div>
                          </TD>
                          <TD>
                            <div className="whitespace-nowrap">
                              {formatToStringDate(noti.createdAt, false)}
                            </div>
                          </TD>
                          <TD>
                            <Tag>{noti.recipients.length}</Tag>
                          </TD>
                          <TD className="font-medium">
                            <Tag>{viewed}</Tag>
                          </TD>
                          <TD>
                            <Badge
                              color={
                                noti.priority === 'HIGH'
                                  ? 'yellow'
                                  : noti.priority === 'NORMAL'
                                    ? 'blue'
                                    : 'purple'
                              }
                            >
                              {noti.priority}
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
