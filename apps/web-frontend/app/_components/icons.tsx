type IconProps = { className?: string };

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M3 4.5C3 3.67 3.67 3 4.5 3h7c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5H7l-2.5 2v-2H4.5C3.67 11 3 10.33 3 9.5v-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="7" r="0.8" fill="currentColor" />
      <circle cx="8.5" cy="7" r="0.8" fill="currentColor" />
      <circle cx="11" cy="7" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function StreamIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M2 8c2-3 4-3 6 0s4 3 6 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M2 4c2-3 4-3 6 0s4 3 6 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M2 12c2-3 4-3 6 0s4 3 6 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function AlertIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M8 2.5L14 12.5H2L8 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 7v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.3" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M8 2v4M8 10v4M2 8h4M10 8h4M4 4l2.5 2.5M9.5 9.5L12 12M12 4L9.5 6.5M6.5 9.5L4 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M8 2l5 2v4c0 3-2.5 5.5-5 6.5-2.5-1-5-3.5-5-6.5V4l5-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6 8.2l1.6 1.6L10.5 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M9 2L4 9h3l-1 5 5-7H8l1-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <path
        d="M3 7.5l2.5 2.5L11 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
