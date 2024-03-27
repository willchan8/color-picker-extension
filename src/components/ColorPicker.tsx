import { useState } from 'react';
import useKeyboardShortcut from '../hooks/useKeyboardShortcut';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Copy from './icons/Copy';
import Check from './icons/Check';

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
  const { toast } = useToast();
  const [hexColor, setHexColor] = useState<string>('');

  const openEyeDropper = async () => {
    let eyeDropper = new (window as any).EyeDropper();
    try {
      const { sRGBHex } = await eyeDropper.open();
      setHexColor(sRGBHex);
    } catch (e) {
      console.error(e);
    }
  };

  useKeyboardShortcut({
    key: 'i',
    onKeyPress: openEyeDropper,
  });

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
      toast({
        description: `Copied ${color} to clipboard!`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-w-[400px]">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-5xl mb-2 md:mb-3">Color Picker</h1>
      <div>
        <Button
          className="w-full flex items-center justify-center bg-indigo-700 hover:bg-indigo-600 text-white border-none text-base p-6 rounded-lg transition"
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
        </Button>
        <p className="text-sm my-2">
          Or press <span className="border rounded-md border-black dark:border-white px-2">i</span> to open eyedropper.
        </p>
        {hexColor && (
          <div className="w-full h-16 flex items-center gap-3">
            <div className="w-6 h-6 rounded-md border border-gray-300" style={{ background: hexColor }}></div>
            <Button variant="outline" onClick={() => copyColor('hex')}>
              <span>{hexColor}</span>
              <i className="self-start ml-2">
                <Copy className="w-4 h-4" />
                <Check className="w-4 h-4 hidden" />
              </i>
            </Button>
            <Button variant="outline" onClick={() => copyColor('rgb')}>
              <span>{hexToRGB(hexColor)}</span>
              <i className="self-start ml-2">
                <Copy className="w-4 h-4" />
                <Check className="w-4 h-4 hidden" />
              </i>
            </Button>
          </div>
        )}
        <p className="text-xs">Made with ❤️ by William Chan</p>
      </div>
    </div>
  );
};

export default ColorPicker;
