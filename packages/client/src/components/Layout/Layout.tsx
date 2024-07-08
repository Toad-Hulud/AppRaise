import '../../styles/global.css';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <body>{children}</body>
    </ThemeRegistry>
  );
}
