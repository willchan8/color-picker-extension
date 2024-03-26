import { useState, useEffect } from 'react';

/**
 * --- TODO:
 *
 * 1. Replace alert with snackbar
 * 2. Continous color selection
 * 3. Save/delete copied colors
 * 4. Upload + drag 'n drop images
 * 5. Automatically pull pallette out of webpage or image
 * 6. Calculate complimentary colors
 */

const ColorPicker = () => {
  const [hexColor, setHexColor] = useState<string>('');

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'i') {
        openEyeDropper();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  const openEyeDropper = async () => {
    let eyeDropper = new (window as any).EyeDropper();
    try {
      const { sRGBHex } = await eyeDropper.open();
      setHexColor(sRGBHex);
    } catch (e) {
      console.error(e);
    }
  };

  const hexToRGB = (hex: string, alpha?: string | number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
  };

  const copyColor = async (type: 'hex' | 'rgb') => {
    const color = {
      hex: hexColor,
      rgb: hexToRGB(hexColor),
    }[type];

    try {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-w-[400px] min-h-[100vh]">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-5xl mb-2 md:mb-3">Color Picker</h1>
      <div>
        <button
          className="w-full flex items-center justify-center bg-indigo-700 hover:bg-indigo-600 text-white border-none text-base p-4 rounded-lg transition"
          onClick={openEyeDropper}
        >
          <i id="action-icon" className="w-8">
            <svg
              id="picker-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="m1.3 7.58 2.83-2.83 1.06 1.06-2.83 2.83c-.07.07-.11.16-.11.26v.85h.85c.1 0 .19-.04.26-.11l2.83-2.83 1.06 1.06-2.83 2.83c-.35.35-.83.55-1.33.55H2.1l-.94.62c-.3.2-.69.16-.95-.09a.755.755 0 0 1-.09-.95l.62-.94V8.9c0-.5.2-.98.55-1.33ZM11.32.69c.91.91.91 2.39 0 3.31L8.94 6.38l.22.22c.29.29.29.77 0 1.06s-.77.29-1.06 0L4.35 3.91c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l.22.22L8.01.69c.91-.91 2.4-.91 3.31 0Z"></path>
            </svg>
          </i>
          Open Eyedropper
        </button>
        <p className="text-white text-sm my-2">
          Or press <span className="border rounded-md border-white px-2">i</span> to open eyedropper.
        </p>
        {hexColor && (
          <div className="w-full h-16 flex items-center gap-3">
            <div className="w-6 h-6 rounded-md border border-gray-300" style={{ background: hexColor }}></div>
            <button
              className="border-none round-md bg-transparent grid place-items-center text-white text-md"
              onClick={() => copyColor('hex')}
            >
              <span>{hexColor}</span>
            </button>
            <button
              className="border-none round-md bg-transparent grid place-items-center text-white text-md"
              onClick={() => copyColor('rgb')}
            >
              <span>{hexToRGB(hexColor)}</span>
            </button>
            <i className="self-start mt-3 mr-3">
              <svg
                id="copy"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                className="w-4 h-4"
                fill="currentColor"
              >
                <path d="M6.4 9.75h1.1v.75c0 .83-.67 1.5-1.5 1.5H1.5C.67 12 0 11.33 0 10.5v-6C0 3.67.67 3 1.5 3h2.25v1.13H1.5a.38.38 0 0 0-.38.38l-.02 6c0 .21.17.38.38.38H6c.21 0 .38-.17.38-.38l.02-.75ZM12 2.19V7.5c0 .83-.67 1.5-1.5 1.5H6c-.83 0-1.5-.67-1.52-1.5v-6c0-.83.67-1.5 1.5-1.5h3.83c.2 0 .39.08.53.22l1.44 1.44c.14.14.22.33.22.53Z"></path>
              </svg>
              <svg
                id="check"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10.49 7.31"
                className="w-4 h-4 hidden"
                fill="currentColor"
              >
                <path d="M10.31.16c.24.22.24.58 0 .78L4.12 7.13c-.2.24-.56.24-.78 0L.16 3.94c-.22-.2-.22-.56 0-.78.22-.22.58-.22.8 0l2.79 2.79L9.54.16c.22-.22.58-.22.78 0Z"></path>
              </svg>
            </i>
          </div>
        )}
        <p className="text-base text-slate-200">Made with ❤️ by William Chan</p>
      </div>
    </div>
  );
};

export default ColorPicker;
