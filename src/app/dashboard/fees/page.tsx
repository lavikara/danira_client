'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, Tag } from '@/components/ui/badge';
import { NameCell } from '@/components/ui/avatar';
import { ProgressRow } from '@/components/ui/progress-bar';
import { Table, THead, TH, TBody, TR, TD, ActionButtons } from '@/components/ui/table';
import { AppChart } from '@/components/charts/app-chart';
import { EmptyFees, EmptyTableRow } from '@/components/ui/empty-state';
import {
  FEES,
  FEE_SUMMARY,
  COLLECTION_BY_CLASS,
  REVENUE_TREND,
  PAYMENT_METHODS,
} from '@/data/fees';

export default function FeesPage() {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="min-w-0">
      <PageHeader
        title="Fees & Payments"
        subtitle="Track collections, balances and payment trends"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsEmpty((v) => !v)}>
              <i className="bi bi-eye" />
              {isEmpty ? 'Show Data' : 'Preview Empty'}
            </Button>
            <Button variant="ghost" size="sm">
              <i className="bi bi-receipt" />
              Generate Invoice
            </Button>
            <Button variant="primary" size="sm">
              <i className="bi bi-plus-circle-fill" />
              Record Payment
            </Button>
          </>
        }
      />

      {isEmpty ? (
        <EmptyFees />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon="bi bi-cash-stack"
              color="green"
              value="₦42.8M"
              label="Total Collected"
              compact
            />
            <StatCard
              icon="bi bi-exclamation-circle-fill"
              color="red"
              value="₦8.1M"
              label="Outstanding"
              compact
            />
            <StatCard
              icon="bi bi-people-fill"
              color="orange"
              value="12"
              label="Overdue Accounts"
              compact
            />
            <StatCard
              icon="bi bi-graph-up-arrow"
              color="blue"
              value="84%"
              label="Collection Rate"
              compact
            />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader title="Fee Categories" />
              <CardBody className="flex flex-col gap-3.5">
                {FEE_SUMMARY.map((f) => (
                  <ProgressRow
                    key={f.label}
                    label={f.label}
                    value={f.value}
                    pct={f.pct}
                    color={f.color}
                  />
                ))}
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Revenue Trend" subtitle="Monthly (₦M)" />
              <CardBody>
                <AppChart
                  type="bar"
                  height={160}
                  data={{
                    labels: REVENUE_TREND.labels,
                    datasets: [
                      { data: REVENUE_TREND.data, backgroundColor: '#10B981', borderRadius: 6 },
                    ],
                  }}
                />
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Payment Methods" />
              <CardBody>
                <div className="h-40">
                  <AppChart
                    type="doughnut"
                    data={{
                      labels: PAYMENT_METHODS.labels,
                      datasets: [
                        {
                          data: PAYMENT_METHODS.data,
                          backgroundColor: PAYMENT_METHODS.colors,
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          labels: { boxWidth: 9, font: { size: 10.5 } },
                        },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="mb-5">
            <CardHeader title="Collection Rate by Class Level" />
            <CardBody>
              <AppChart
                type="bar"
                height={180}
                data={{
                  labels: COLLECTION_BY_CLASS.labels,
                  datasets: [
                    { data: COLLECTION_BY_CLASS.data, backgroundColor: '#2563EB', borderRadius: 6 },
                  ],
                }}
                options={{ indexAxis: 'y' }}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Payment Records"
              subtitle="Recent transactions"
              action={
                <Button variant="ghost" size="sm">
                  <i className="bi bi-download" />
                  Export
                </Button>
              }
            />
            <Table>
              <THead>
                <TH>Student</TH>
                <TH>Class</TH>
                <TH>Total</TH>
                <TH>Paid</TH>
                <TH>Balance</TH>
                <TH>Due</TH>
                <TH>Status</TH>
                <TH>Action</TH>
              </THead>
              <TBody>
                {FEES.length === 0 ? (
                  <EmptyTableRow
                    colSpan={8}
                    icon="bi-credit-card"
                    message="No payment records yet"
                  />
                ) : (
                  FEES.map((f, i) => (
                    <TR key={f.name}>
                      <TD>
                        <NameCell name={f.name} index={i + 1} />
                      </TD>
                      <TD>
                        <Tag>{f.cls}</Tag>
                      </TD>
                      <TD className="whitespace-nowrap text-t2">{f.total}</TD>
                      <TD className="whitespace-nowrap font-semibold text-green">{f.paid}</TD>
                      <TD className="whitespace-nowrap font-semibold text-red">{f.balance}</TD>
                      <TD className="whitespace-nowrap text-t2">{f.due}</TD>
                      <TD>
                        <Badge
                          color={
                            f.status === 'Paid'
                              ? 'green'
                              : f.status === 'Partial'
                                ? 'orange'
                                : 'red'
                          }
                        >
                          {f.status}
                        </Badge>
                      </TD>
                      <TD>
                        <ActionButtons />
                      </TD>
                    </TR>
                  ))
                )}
              </TBody>
            </Table>
          </Card>
        </>
      )}
    </div>
  );
}
