'use client';

import { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
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
import { EmptyTableRow } from '@/components/ui/empty-state';

import { SelectSchool } from '@/components/ui/select-school';
import { PaginationMeta, Role } from '@/types/definitions';
import { useToastContext } from '@/contexts/toast-context';
import { useUserStore } from '@/store/userStore';
import { useFeeStore } from '@/store/feeStore';
import { formatAmount, formatToStringDate } from '@/utils/helpers';
import { SearchComponent } from '@/components/ui/search-component';
import { SelectInput } from '@/components/ui/select-input';

export default function FeesPage() {
  const [viewSchools, setViewSchools] = useState(false);
  const [showGroupData, setShowGroupData] = useState(true);
  const [tableDataList, setTableDataList] = useState(['Payment Records', 'Fees']);
  const [singleSchoolId, setSingleSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const apiCall = useRef(false);
  const selectTable = useRef('Payment Records');
  const query = useRef({ page: 1, limit: 20, search: null as string | null });

  const { error } = useToastContext();
  const { user, data } = useUserStore();
  const {
    schoolPaymentDetails,
    schoolFeeDetails,
    groupFeeDetails,
    groupPaymentDetails,
    schoolFeeAnalytics,
    groupFeeAnalytics,
    paymentPaginationMeta,
    feePaginationMeta,
    paymentRecordLoading,
    feeAnalyticsLoading,
    fetchSchoolFeeAnalytics,
    fetchGroupFeeAnalytics,
    fetchAllSchoolPaymentRecords,
    fetchAllGroupSchoolPaymentRecords,
    fetchAllGroupFees,
    fetchAllSchoolFees,
  } = useFeeStore();

  const stats = showGroupData ? groupFeeAnalytics : schoolFeeAnalytics;
  const paymentDetails = showGroupData ? groupPaymentDetails : schoolPaymentDetails;

  const handleError = (errorMessage: string) => {
    error('Unable to get fee details', { description: errorMessage });
  };

  useEffect(() => {
    if (!user?.role || apiCall.current) return;
    apiCall.current = true;

    if (data?.groupId) {
      setShowGroupData(true);
      Promise.all([
        fetchAllGroupSchoolPaymentRecords(user?.role as Role, data.groupId, query.current, {
          onError: handleError,
        }),
        fetchGroupFeeAnalytics(user?.role as Role, data.groupId, { onError: handleError }),
      ]);
      return;
    }

    setShowGroupData(false);
    setSchoolName(data?.schools[0].schoolName as string);

    Promise.all([
      fetchAllSchoolPaymentRecords(
        user?.role as Role,
        data?.schoolIds[0] as string,
        query.current,
        {
          onError: handleError,
        },
      ),
      fetchSchoolFeeAnalytics(user?.role as Role, data?.schoolIds[0] as string, {
        onError: handleError,
      }),
    ]);
  }, [user?.role]);

  const updateTableData = (query: { page: number; limit: number; search: string | null }) => {
    if (data?.groupId && singleSchoolId === '') {
      if (selectTable.current === 'Fees') {
        fetchAllGroupFees(user?.role as Role, data?.groupId as string, query, {
          onError: handleError,
        });
      } else {
        fetchAllGroupSchoolPaymentRecords(user?.role as Role, data?.groupId as string, query, {
          onError: handleError,
        });
      }

      return;
    }

    if (singleSchoolId === '') {
      if (selectTable.current === 'Fees') {
        fetchAllSchoolFees(user?.role as Role, data?.schoolIds[0] as string, query, {
          onError: handleError,
        });
      } else {
        fetchAllSchoolPaymentRecords(user?.role as Role, data?.schoolIds[0] as string, query, {
          onError: handleError,
        });
      }
      return;
    }

    if (singleSchoolId !== '') {
      if (selectTable.current === 'Fees') {
        fetchAllSchoolFees(user?.role as Role, data?.schoolIds[0] as string, query, {
          onError: handleError,
        });
      } else {
        fetchAllSchoolPaymentRecords(user?.role as Role, singleSchoolId, query, {
          onError: handleError,
        });
      }
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
      fetchAllSchoolPaymentRecords(user?.role as Role, id, query.current, {
        onError: handleError,
      }),
      fetchSchoolFeeAnalytics(user?.role as Role, id, {
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
      fetchAllGroupSchoolPaymentRecords(
        user?.role as Role,
        data?.groupId as string,
        query.current,
        {
          onError: handleError,
        },
      ),
      fetchGroupFeeAnalytics(user?.role as Role, data?.groupId as string, {
        onError: handleError,
      }),
    ]);
  };

  // const updateAnalytics = () => {
  //   if (data?.groupId && singleSchoolId === '') {
  //     fetchGroupFeeAnalytics(user?.role as Role, data?.groupId as string, {
  //       onError: handleError,
  //     });
  //     return;
  //   }

  //   if (singleSchoolId === '') {
  //     fetchSchoolFeeAnalytics(user?.role as Role, data?.schoolIds[0] as string, {
  //       onError: handleError,
  //     });
  //     return;
  //   }

  //   if (singleSchoolId !== '') {
  //     fetchSchoolFeeAnalytics(user?.role as Role, singleSchoolId, {
  //       onError: handleError,
  //     });
  //     return;
  //   }
  // };

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
    // console.log(selectTable.current);
    // if (selectTable.current === 'Fees') return;
    // updateAnalytics();
  };

  return (
    <div className="min-w-0">
      <PageHeader
        title="Fees & Payments"
        // subtitle="Track collections, balances and payment trends"
        subtitle={
          showGroupData
            ? `${data?.group?.groupName} Fees and Payment`
            : `${schoolName} Fees and Payment`
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
              <i className="bi bi-plus-circle-fill" />
              Record Payment
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
              loading={feeAnalyticsLoading || !stats}
              icon="bi bi-graph-up-arrow"
              color="blue"
              value={formatAmount(stats?.totalExpected as number, 2, stats?.currency as string)}
              label="Expected Revenue"
              compact
            />
            <StatCard
              loading={feeAnalyticsLoading || !stats}
              icon="bi bi-cash-stack"
              color="teal"
              value={formatAmount(stats?.totalCollected as number, 2, stats?.currency as string)}
              label="Total Collected"
              compact
            />
            <StatCard
              loading={feeAnalyticsLoading || !stats}
              icon="bi bi-exclamation-circle"
              color="orange"
              value={formatAmount(stats?.totalOutstanding as number, 2, stats?.currency as string)}
              label="Outstanding"
              compact
            />
            <StatCard
              loading={feeAnalyticsLoading || !stats}
              icon="bi bi-people"
              color="green"
              value={String(stats?.fullyPaidStudents)}
              label="Fully Paid Students"
              compact
            />
          </div>

          <div className="grid grid-cols-4 gap-3 mb-5">
            <div className="col-start-1 col-end-5 sm:col-start-1 sm:col-end-2">
              <div className="mb-3">
                <StatCard
                  loading={feeAnalyticsLoading || !stats}
                  icon="bi bi-collection"
                  color="indigo"
                  value={String(stats?.collectionRate)}
                  label="Collection Rate"
                  compact
                />
              </div>
              <StatCard
                loading={feeAnalyticsLoading || !stats}
                icon="bi bi-people"
                color="red"
                value={String(stats?.debtors)}
                label="Debtors"
                compact
              />
            </div>
            <Card className="col-start-1 col-end-5 sm:col-start-2 sm:col-end-5">
              <CardHeader title="Monthly Revenue" />
              <CardBody>
                {!feeAnalyticsLoading && (
                  <AppChart type="bar" height={160} data={stats?.monthlyChart?.chart as any} />
                )}
              </CardBody>
            </Card>
          </div>
          <Card>
            <CardHeader title="Revenue By Categories" />
            <CardBody>
              <div className="h-60">
                {!feeAnalyticsLoading && (
                  <AppChart type="line" data={stats?.feeTypeChart?.chart as any} />
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="mt-5">
            <CardHeader
              title="Payment Records"
              subtitle={String(`${paymentPaginationMeta?.total} Records`)}
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
                    id="payment_search"
                    placeholder="Student ID, Name, Status"
                    onSearchInput={setSearch}
                    className="w-full"
                  />
                </>
              }
            />
            <Table>
              <THead>
                <TH>#</TH>
                <TH>Student</TH>
                <TH>Term</TH>
                <TH>Period</TH>
                <TH>Total</TH>
                <TH>Paid</TH>
                <TH>Outstanding</TH>
                <TH>Status</TH>
                <TH>Action</TH>
              </THead>
              {paymentRecordLoading ? (
                <TableSkeleton rows={5} columns={9} />
              ) : (
                <TBody>
                  {paymentDetails.length === 0 ? (
                    <EmptyTableRow
                      colSpan={9}
                      icon="bi-credit-card"
                      message="No payment records found."
                    />
                  ) : (
                    (paymentDetails ?? []).map((payment, index) => {
                      const rowNumber = (query.current.page - 1) * query.current.limit + index + 1;
                      return (
                        <TR key={payment.id}>
                          <TD className="w-10 font-semibold text-t3">{rowNumber}</TD>
                          <TD>
                            <NameCell
                              name={`${payment.student.users.firstName} ${payment.student.users.lastName}`}
                              sub={payment.student.studentId}
                              index={index + 1}
                            />
                          </TD>
                          <TD>
                            <span className="whitespace-nowrap">{payment.term.name}</span>
                            <div
                              className={
                                payment.term.status === 'ONGOING'
                                  ? 'text-green text-[10px]'
                                  : 'text-red text-[10px]'
                              }
                            >
                              {payment.term.status}
                            </div>
                          </TD>
                          <TD>
                            <Tag>
                              <div className="text-[10px] whitespace-nowrap">
                                {`${formatToStringDate(payment.term.start)} `} to
                                {` ${formatToStringDate(payment.term.end)}`}
                              </div>
                            </Tag>
                          </TD>
                          <TD className="whitespace-nowrap text-t2">
                            {formatAmount(payment.totalAmount, 2, payment.currency)}
                          </TD>
                          <TD className="whitespace-nowrap font-semibold text-green">
                            {formatAmount(payment.totalPaid, 2, payment.currency)}
                          </TD>

                          <TD className="whitespace-nowrap text-t2">
                            {formatAmount(payment.totalOutstanding, 2, payment.currency)}
                          </TD>
                          <TD>
                            <Badge
                              color={
                                payment.status === 'PAID'
                                  ? 'green'
                                  : payment.status === 'PARTIAL'
                                    ? 'orange'
                                    : 'red'
                              }
                            >
                              {payment.status}
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
                { ...(paymentPaginationMeta ?? {}), limit: query.current.limit } as PaginationMeta
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
