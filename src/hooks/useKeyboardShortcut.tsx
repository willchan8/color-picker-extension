import { useEffect } from 'react';

type UseKeyboardShortcutProps = {
  key: string;
  onKeyPress: () => void;
};

export default function useKeyboardShortcut({ key, onKeyPress }: UseKeyboardShortcutProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        onKeyPress();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
}
