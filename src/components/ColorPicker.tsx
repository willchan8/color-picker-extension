import { useState, useRef } from 'react';
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CopyButton from '@/components/CopyButton';
import { cn } from '@/lib/utils';
import CloseButton from '@/components/CloseButton';
import Eyedrop from '@/components/icons/Eyedrop';

/**
 * --- TODO:
 * 1. Save copied colors
 * 2. Upload + drag 'n drop images
 * 3. Automatically pull pallette out of webpage or image
 * 4. Calculate complimentary colors
 */

export default function ColorPicker() {
  const { toast } = useToast();
  const [colors, setColors] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string>('');
  const timerId = useRef(null);

  const openEyeDropper = async () => {
    let eyeDropper = new (window as any).EyeDropper();
    try {
      const { sRGBHex } = await eyeDropper.open();
      /*
       * Need to use the functional update form of setColors to avoid stale state issue.
       * Without it, the `colors` state captured in the `useEffect` closure might not be the latest state when the event listener is triggered.
       * https://stackoverflow.com/questions/55154186/react-hooks-usestateuseeffectevent-gives-stale-state
       */
      setColors((prevColors) => {
        if (prevColors.includes(sRGBHex)) {
          toast({
            description: `❗️ ${sRGBHex} already added to list!`,
          });
          return prevColors;
        } else {
          return [...prevColors, sRGBHex];
        }
      });
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

  const handleDelete = (hexColor: string) => {
    const colorsCopy = [...colors];
    setColors(colorsCopy.filter((color) => hexColor !== color));
  };

  return (
    <section className="w-[480px] min-h-[400px]">
      <h1 className="font-bold text-4xl mb-2 md:mb-3">Color Picker</h1>
      <div>
        <Button
          className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-600 text-white border-none text-base p-6 rounded-lg transition"
          onClick={openEyeDropper}
        >
          <Eyedrop className="w-5 h-5" />
          Open Eyedropper
        </Button>
        <p className="text-sm my-2">
          Or press <span className="border rounded-md border-black dark:border-white px-2">i</span> to open eyedropper.
          Press <span className="border rounded-md border-black dark:border-white px-2">esc</span> to close eyedropper.
        </p>
        {colors.length > 0 &&
          [...colors].map((hexColor, index) => (
            <div
              className={cn(
                'w-full h-16 flex items-center gap-3 border-b border-gray-300 dark:border-gray-700',
                index === colors.length - 1 && 'border-b-0'
              )}
              key={hexColor}
            >
              <div className="w-10 h-10 rounded-md border border-gray-300" style={{ backgroundColor: hexColor }}></div>
              {[hexColor, hexToRGB(hexColor)].map((color, index) => (
                <CopyButton
                  color={color}
                  key={index}
                  copiedColor={copiedColor}
                  setCopiedColor={setCopiedColor}
                  timerId={timerId}
                  className="flex-1 justify-between gap-2"
                >
                  {color}
                </CopyButton>
              ))}
              <CloseButton onClick={() => handleDelete(hexColor)} />
            </div>
          ))}
      </div>
    </section>
  );
}
