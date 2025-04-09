import { useTheme } from '@/contexts/theme-context';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="ml-4"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}