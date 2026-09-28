import type * as React from 'react';

export type Status = 'draft' | 'review' | 'approved' | 'overdue' | 'retired';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = ink pill, the main action. secondary = outline pill. quiet = no border. danger = destructive. inverse = white pill on a dark panel. */
  variant?: 'primary' | 'secondary' | 'quiet' | 'danger' | 'inverse';
  size?: 'md' | 'sm';
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface EyebrowProps { children: React.ReactNode; /** A real count, shown as (04). */ count?: number; className?: string }
export declare function Eyebrow(props: EyebrowProps): React.ReactElement;

export interface StatusBadgeProps { status?: Status; /** Overrides the default label. */ children?: React.ReactNode; className?: string }
export declare function StatusBadge(props: StatusBadgeProps): React.ReactElement;

export interface GovernanceHeaderProps {
  title: React.ReactNode;
  /** Eyebrow above the title: the handbook section, e.g. "People Ops". */
  section?: string;
  summary?: React.ReactNode;
  owner?: React.ReactNode;
  status?: Status;
  /** Pre-formatted dates, e.g. "12 Sep 2026". */
  reviewed?: string;
  nextReview?: string;
  version?: string;
  className?: string;
}
export declare function GovernanceHeader(props: GovernanceHeaderProps): React.ReactElement;

export interface ProcessStep {
  title: React.ReactNode;
  body?: React.ReactNode;
  owner?: React.ReactNode;
  id?: string;
  current?: boolean;
  /** A branch: "If {if}, go to {goTo}" linking to #target. */
  decision?: { if: React.ReactNode; goTo: React.ReactNode; target?: string };
}
export interface ProcessStepsProps { steps: ProcessStep[]; className?: string }
export declare function ProcessSteps(props: ProcessStepsProps): React.ReactElement;

export interface CalloutProps { kind?: 'required' | 'recommended' | 'note'; title?: React.ReactNode; children?: React.ReactNode; className?: string }
export declare function Callout(props: CalloutProps): React.ReactElement;

export interface RaciTableProps {
  roles: string[];
  rows: { task: React.ReactNode; cells: Record<string, 'R' | 'A' | 'C' | 'I'> }[];
  caption?: React.ReactNode;
  className?: string;
}
export declare function RaciTable(props: RaciTableProps): React.ReactElement;

export interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; /** Keyboard hint, e.g. "/" or "⌘K". Hidden on phones. */ shortcut?: string }
export declare function SearchField(props: SearchFieldProps): React.ReactElement;

export interface DocNavProps {
  sections: { title: string; items: { label: React.ReactNode; href?: string; active?: boolean; status?: Status }[] }[];
  label?: string;
  className?: string;
}
export declare function DocNav(props: DocNavProps): React.ReactElement;
