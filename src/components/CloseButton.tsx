export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="rounded-md p-1 text-slate-950/50 opacity-80 transition-opacity hover:text-slate-950 focus:opacity-100 focus:outline-none focus:ring-2 hover:opacity-100 dark:text-slate-50/50 dark:hover:text-slate-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-x h-4 w-4"
      >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
  );
}
