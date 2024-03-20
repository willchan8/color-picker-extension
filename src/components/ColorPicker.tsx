import { useState } from 'react';
import styles from './colorPicker.module.css';

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

const App = () => {
  const [hexColor, setHexColor] = useState<string>('#5524e7');

  const openEyeDropper = async () => {
    let eyeDropper = new (window as any).EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    setHexColor(sRGBHex);
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
    <div className={styles.wrapper}>
      <h1>Color Picker</h1>
      <div className={styles.formSection}>
        <button className={styles.openPickerButton} onClick={openEyeDropper}>
          Open Eyedropper
        </button>
        <div className={styles.selectedColor}>
          <div className={styles.colorBlock} style={{ background: hexColor }}></div>
          <button className={styles.copyColorBtn} onClick={() => copyColor('hex')}>
            <span>{hexColor}</span>
          </button>
          <button className={styles.copyColorBtn} onClick={() => copyColor('rgb')}>
            <span>{hexToRGB(hexColor)}</span>
          </button>
        </div>
        <p className={styles.shoutout}>Made with ❤️ by William Chan</p>
      </div>
    </div>
  );
};

export default App;
