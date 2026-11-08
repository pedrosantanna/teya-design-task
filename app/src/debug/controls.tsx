// Small controls of the panel: plain DOM elements styled by panel.css (web-only chrome, see chrome.web.ts).
import { useState, type ReactNode } from 'react';

import type { Option } from '@/design-system';

/** Which sections the viewer collapsed, kept while the panel is closed and opened again. */
const folded = new Map<string, boolean>();

/**
 * A titled, collapsible group of controls, like a section of Figma's right sidebar. `hidden` names the section's
 * controls that change nothing on the current screen: they are left out and listed in one line at the end. A section
 * where none applies (`idle`) folds to its title with a short reason and can't be opened.
 */
export function Section({
  title,
  children,
  defaultOpen = true,
  hidden = [],
  idle = false,
}: {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  hidden?: readonly string[];
  idle?: boolean;
}) {
  const [open, setOpen] = useState(!(folded.get(title) ?? !defaultOpen));
  const toggle = () => {
    folded.set(title, open);
    setOpen(!open);
  };
  if (idle) {
    return (
      <section className="dbg-sec is-idle">
        <h3 className="dbg-sec-h">
          <span className="dbg-sec-t" aria-disabled="true" title={hidden.length > 0 ? `No effect on this screen: ${hidden.join(', ')}` : undefined}>
            {title}
            <small className="dbg-sec-why">No effect on this screen</small>
          </span>
        </h3>
      </section>
    );
  }
  return (
    <section className="dbg-sec">
      <h3 className="dbg-sec-h">
        <button type="button" className="dbg-sec-t" aria-expanded={open} onClick={toggle}>
          {title}
        </button>
      </h3>
      {open ? (
        <div className="dbg-sec-b">
          {children}
          {hidden.length > 0 ? <p className="dbg-off">{`No effect on this screen: ${hidden.join(', ')}.`}</p> : null}
        </div>
      ) : null}
    </section>
  );
}

function optionText<T extends string>(o: Option<T>) {
  return o.detail ? `${o.label} · ${o.detail}` : o.label;
}

/** A small native select with its label to the left. Options may sit in named groups. */
export function Select<T extends string>({
  label,
  options,
  groups,
  value,
  onChange,
}: {
  label: string;
  options?: readonly Option<T>[];
  groups?: readonly { label: string; options: readonly Option<T>[] }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <label className="dbg-row">
      <span className="dbg-lab" title={label}>
        {label}
      </span>
      <select
        className="dbg-select"
        value={value}
        onChange={(e) => {
          onChange(e.target.value as T);
          // A focused select would swallow the D shortcut.
          e.target.blur();
        }}
      >
        {options?.map((o) => (
          <option key={o.value} value={o.value}>
            {optionText(o)}
          </option>
        ))}
        {groups?.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.options.map((o) => (
              <option key={o.value} value={o.value}>
                {optionText(o)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

/** A labelled row of choices; the chosen one sits raised on the track. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="dbg-row">
      <span className="dbg-lab" title={label}>
        {label}
      </span>
      <div className="dbg-seg" role="group" aria-label={label}>
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A switch, label on the left. */
export function Toggle({ label, detail, value, onChange }: { label: string; detail?: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="dbg-check">
      <span className="dbg-check-t">
        {label}
        {detail ? <small>{detail}</small> : null}
      </span>
      <input type="checkbox" role="switch" className="dbg-switch" checked={value} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

/** A checkbox, box on the left. */
export function Check({ label, detail, checked, onChange }: { label: string; detail?: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="dbg-check is-box">
      <input type="checkbox" className="dbg-box" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="dbg-check-t">
        {label}
        {detail ? <small>{detail}</small> : null}
      </span>
    </label>
  );
}

export function Button({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <button type="button" className="dbg-btn" onClick={onPress}>
      {label}
    </button>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return <p className="dbg-sub">{children}</p>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="dbg-note">{children}</p>;
}
