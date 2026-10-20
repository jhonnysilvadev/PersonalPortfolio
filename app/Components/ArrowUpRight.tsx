type ArrowUpRightProps = {
  className?: string;
};

export default function ArrowUpRight({ className }: ArrowUpRightProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`inline-block h-[1em] w-[1em] align-middle${className ? ` ${className}` : ""}`}
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
