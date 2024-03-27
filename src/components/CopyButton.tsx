import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Copy from '@/components/icons/Copy';
import Check from '@/components/icons/Check';
import { cn } from '@/lib/utils';

export default function CopyButton({
  children,
  color,
  setCopiedColor,
  copiedColor,
  timerId,
  className = '',
}: {
  children?: React.ReactNode;
  color: string;
  setCopiedColor: React.Dispatch<React.SetStateAction<string>>;
  copiedColor: string;
  timerId: React.MutableRefObject<any>;
  className?: string;
}) {
  const { toast } = useToast();

  const copyColor = async (color: string) => {
    try {
      navigator.clipboard.writeText(color);
      toast({
        description: (
          <p>
            ✅ Copied <span className="font-bold">{color}</span> to clipboard! 📋
          </p>
        ),
      });
      setCopiedColor(color);
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      timerId.current = setTimeout(() => setCopiedColor(''), 5000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button variant="outline" className={className} onClick={() => copyColor(color)}>
      {children}
      <>
        <Copy className={cn('w-4 h-4', color === copiedColor && 'hidden')} />
        <Check className={cn('w-4 h-4', color !== copiedColor && 'hidden')} />
      </>
    </Button>
  );
}
