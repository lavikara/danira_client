'use client';

import type React from 'react';

// Mirrors TIMETABLE_SLOTS: true = break row, false = lesson row
const SLOT_IS_BREAK = [false, false, true, false, false, true, false, false];
// 5 day columns per lesson row
const DAYS = 5;

// -------------------------------------------------------------------
// Pulse atom — a single animated shimmer block
// -------------------------------------------------------------------
interface PulseProps {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
  style?: React.CSSProperties;
}

function Pulse({
  width = '100%',
  height = '12px',
  radius = '6px',
  className = '',
  style,
}: PulseProps) {
  return (
    <div
      className={`sk-pulse ${className}`}
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

// -------------------------------------------------------------------
// One skeleton lesson cell — mirrors the real tt-cell pill.
// NOTE: this returns the pill's inner markup only — no <td> here.
// The caller (the row loop) owns the single <td> wrapper.
// -------------------------------------------------------------------
function SkeletonCell() {
  return (
    <div className="sk-cell" style={{ borderRadius: 'var(--r, 8px)' }}>
      {/* Left accent stripe skeleton */}
      <div className="sk-cell-accent sk-pulse" />

      <div className="sk-cell-body">
        {/* Subject name line */}
        <Pulse height="11px" width="72%" radius="5px" />
        {/* Teacher name line */}
        <Pulse height="9px" width="52%" radius="4px" style={{ marginTop: 5 }} />
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Break row skeleton — spans all 6 columns
// -------------------------------------------------------------------
function SkeletonBreakRow() {
  return (
    <tr>
      <td colSpan={6} style={{ padding: '3px 4px' }}>
        <div className="sk-break" style={{ borderRadius: 'var(--r, 8px)' }}>
          <Pulse height="9px" width="60px" radius="4px" />
        </div>
      </td>
    </tr>
  );
}

// -------------------------------------------------------------------
// Main exported component
// -------------------------------------------------------------------
export function TimetableCardSkeleton() {
  return (
    <>
      {/* ── Keyframe + component styles injected once ── */}
      <style>{`
        @keyframes sk-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .sk-pulse {
          background: linear-gradient(
            90deg,
            var(--border-light, #F1F5F9) 25%,
            var(--border,       #E2E8F0) 50%,
            var(--border-light, #F1F5F9) 75%
          );
          background-size: 400% 100%;
          animation: sk-shimmer 1.6s ease-in-out infinite;
        }

        /* Slightly darker shimmer in dark mode */
        [data-theme="dark"] .sk-pulse {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,.05) 25%,
            rgba(255,255,255,.10) 50%,
            rgba(255,255,255,.05) 75%
          );
          background-size: 400% 100%;
        }

        /* Cell pill */
        .sk-cell {
          display: flex;
          gap: 7px;
          align-items: stretch;
          padding: 8px 8px 8px 0;
          background: var(--border-light, #F1F5F9);
          min-height: 54px;
          overflow: hidden;
          position: relative;
        }

        [data-theme="dark"] .sk-cell {
          background: rgba(255,255,255,.04);
        }

        /* Left accent stripe */
        .sk-cell-accent {
          width: 3px;
          flex-shrink: 0;
          border-radius: 0 3px 3px 0;
        }

        .sk-cell-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 4px;
        }

        /* Break strip */
        .sk-break {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          background: var(--border-light, #F1F5F9);
        }

        [data-theme="dark"] .sk-break {
          background: rgba(255,255,255,.04);
        }

        /* Stagger cell animations so they don't all pulse in sync */
        .sk-col-0 .sk-pulse { animation-delay:  0ms; }
        .sk-col-1 .sk-pulse { animation-delay:  80ms; }
        .sk-col-2 .sk-pulse { animation-delay: 160ms; }
        .sk-col-3 .sk-pulse { animation-delay: 240ms; }
        .sk-col-4 .sk-pulse { animation-delay: 320ms; }

        @media (prefers-reduced-motion: reduce) {
          .sk-pulse { animation: none; }
        }
      `}</style>

      <div className="card" aria-busy="true" aria-label="Loading timetable…" role="status">
        {/* ── Card header ── */}
        <div className="ch">
          <div>
            {/* Title line */}
            <Pulse width="140px" height="14px" radius="7px" />
            {/* Subtitle line */}
            <Pulse width="100px" height="10px" radius="5px" style={{ marginTop: 6 }} />
          </div>

          {/* Header right-side controls slot */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Pulse width="90px" height="30px" radius="8px" />
            <Pulse width="58px" height="30px" radius="8px" />
            <Pulse width="58px" height="30px" radius="8px" />
          </div>
        </div>

        {/* ── Scrollable table area ── */}
        <div style={{ overflowX: 'auto', padding: '12px' }}>
          <table
            style={{
              width: '100%',
              minWidth: 580,
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                {/* Time column header */}
                <th style={{ width: 80, padding: '0 8px 10px' }}>
                  <Pulse width="28px" height="9px" radius="4px" />
                </th>
                {/* Day column headers */}
                {Array.from({ length: DAYS }, (_, i) => (
                  <th key={i} style={{ padding: '0 4px 10px' }}>
                    <Pulse
                      width={['52px', '60px', '68px', '62px', '48px'][i]}
                      height="9px"
                      radius="4px"
                    />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {SLOT_IS_BREAK.map((isBreak, rowIdx) =>
                isBreak ? (
                  <SkeletonBreakRow key={rowIdx} />
                ) : (
                  <tr
                    key={rowIdx}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                    }}
                  >
                    {/* Time column */}
                    <td style={{ padding: '6px 8px', verticalAlign: 'middle' }}>
                      <Pulse width="52px" height="10px" radius="4px" />
                    </td>

                    {/* Lesson cells — one per day */}
                    {Array.from({ length: DAYS }, (_, colIdx) => (
                      <td
                        key={colIdx}
                        className={`p-1 sk-col-${colIdx}`}
                        style={{ padding: '4px' }}
                      >
                        <SkeletonCell />
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TimetableCardSkeleton;
