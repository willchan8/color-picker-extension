const Check = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      id="check"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10.49 7.31"
      className={className}
      fill="currentColor"
    >
      <path d="M10.31.16c.24.22.24.58 0 .78L4.12 7.13c-.2.24-.56.24-.78 0L.16 3.94c-.22-.2-.22-.56 0-.78.22-.22.58-.22.8 0l2.79 2.79L9.54.16c.22-.22.58-.22.78 0Z"></path>
    </svg>
  );
};

export default Check;
