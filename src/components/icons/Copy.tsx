const Copy = ({ className = '' }: { className?: string }) => {
  return (
    <svg id="copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className={className} fill="currentColor">
      <path d="M6.4 9.75h1.1v.75c0 .83-.67 1.5-1.5 1.5H1.5C.67 12 0 11.33 0 10.5v-6C0 3.67.67 3 1.5 3h2.25v1.13H1.5a.38.38 0 0 0-.38.38l-.02 6c0 .21.17.38.38.38H6c.21 0 .38-.17.38-.38l.02-.75ZM12 2.19V7.5c0 .83-.67 1.5-1.5 1.5H6c-.83 0-1.5-.67-1.52-1.5v-6c0-.83.67-1.5 1.5-1.5h3.83c.2 0 .39.08.53.22l1.44 1.44c.14.14.22.33.22.53Z"></path>
    </svg>
  );
};

export default Copy;
