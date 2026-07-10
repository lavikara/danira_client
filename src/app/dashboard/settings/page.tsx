"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/table";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { cn } from "@/utils/helpers";
import { NOTIFICATION_TOGGLES, ROLES, SESSIONS } from "@/data/settings";

const TABS = [
  "General",
  "Notifications",
  "Roles & Permissions",
  "Security",
] as const;
type Tab = (typeof TABS)[number];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("General");

  return (
    <div className="min-w-0">
      <PageHeader
        title="Settings"
        subtitle="Configure school profile, notifications and access control"
        actions={
          <Button variant="primary" size="sm">
            <i className="bi bi-check2" />
            Save Changes
          </Button>
        }
      />

      <Card>
        {/* Tab bar — scrolls horizontally on small screens */}
        <div className="overflow-x-auto border-b border-border-light">
          <div className="flex min-w-max gap-1 px-3 pt-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-t-lg px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-colors",
                  tab === t
                    ? "border-b-2 border-primary text-primary"
                    : "border-b-2 border-transparent text-t3 hover:text-t1",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <CardBody>
          {tab === "General" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                {
                  label: "School Name",
                  id: "school_name",
                  val: "Greenfield Academy",
                  type: "text",
                },
                {
                  label: "Academic Session",
                  id: "session",
                  val: "2024/2025",
                  type: "text",
                },
                {
                  label: "Contact Email",
                  id: "email",
                  val: "admin@greenfieldacademy.edu.ng",
                  type: "email",
                },
                {
                  label: "Phone Number",
                  id: "phone",
                  val: "+234 803 000 0000",
                  type: "tel",
                },
              ].map((f) => (
                <div key={f.id}>
                  <label
                    className="mb-1.5 block text-[12.5px] font-semibold text-t2"
                    htmlFor={f.id}
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    defaultValue={f.val}
                    type={f.type}
                    className="w-full rounded-[9px] border-[1.5px] border-border bg-bg px-3 py-2 text-[13px] text-t1 outline-none transition-all focus:border-primary"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[12.5px] font-semibold text-t2">
                  Address
                </label>
                <textarea
                  rows={2}
                  defaultValue="14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria"
                  className="w-full rounded-[9px] border-[1.5px] border-border bg-bg px-3 py-2 text-[13px] text-t1 outline-none transition-all focus:border-primary"
                />
              </div>
            </div>
          )}

          {tab === "Notifications" && (
            <div className="flex flex-col">
              {NOTIFICATION_TOGGLES.map((n) => (
                <div
                  key={n.label}
                  className="flex items-center justify-between gap-4 border-b border-border-light py-3.5 last:border-b-0"
                >
                  <div>
                    <div className="text-[13px] font-semibold text-t1">
                      {n.label}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-t3">{n.sub}</div>
                  </div>
                  <ToggleSwitch defaultOn={n.on} />
                </div>
              ))}
            </div>
          )}

          {tab === "Roles & Permissions" && (
            <Table>
              <THead>
                <TH>Role</TH>
                <TH>Users</TH>
                <TH>Dashboard</TH>
                <TH>Students</TH>
                <TH>Finance</TH>
                <TH>Reports</TH>
                <TH>Settings</TH>
              </THead>
              <TBody>
                {ROLES.map((r) => (
                  <TR key={r.role}>
                    <TD className="font-semibold whitespace-nowrap">
                      {r.role}
                    </TD>
                    <TD>{r.users}</TD>
                    {[
                      r.dashboard,
                      r.students,
                      r.finance,
                      r.reports,
                      r.settings,
                    ].map((v, i) => (
                      <TD key={i}>
                        <i
                          className={
                            v
                              ? "bi bi-check-circle-fill text-green"
                              : "bi bi-x-circle text-t3"
                          }
                        />
                      </TD>
                    ))}
                  </TR>
                ))}
              </TBody>
            </Table>
          )}

          {tab === "Security" && (
            <div>
              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  {
                    label: "Current Password",
                    id: "cur_pw",
                    ac: "current-password",
                  },
                  { label: "New Password", id: "new_pw", ac: "new-password" },
                ].map((f) => (
                  <div key={f.id}>
                    <label className="mb-1.5 block text-[12.5px] font-semibold text-t2">
                      {f.label}
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      autoComplete={f.ac}
                      className="w-full rounded-[9px] border-[1.5px] border-border bg-bg px-3 py-2 text-[13px] text-t1 outline-none transition-all focus:border-primary"
                    />
                  </div>
                ))}
              </div>
              <div className="mb-2 text-[13px] font-bold text-t1">
                Active Sessions
              </div>
              <Table>
                <THead>
                  <TH>Device</TH>
                  <TH>IP Address</TH>
                  <TH>Location</TH>
                  <TH>Last Active</TH>
                  <TH>&nbsp;</TH>
                </THead>
                <TBody>
                  {SESSIONS.map((s) => (
                    <TR key={s.ip}>
                      <TD className="font-semibold whitespace-nowrap">
                        {s.device}
                      </TD>
                      <TD className="text-t2">{s.ip}</TD>
                      <TD className="whitespace-nowrap text-t2">{s.loc}</TD>
                      <TD className="whitespace-nowrap text-t2">{s.time}</TD>
                      <TD>
                        {s.current ? (
                          <Badge color="green">Current</Badge>
                        ) : (
                          <Button variant="danger" size="sm">
                            Revoke
                          </Button>
                        )}
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
