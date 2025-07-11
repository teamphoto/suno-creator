import './globals.css';

export const metadata = {
  title: 'SUNO Creator',
  description: 'AI 음악 프롬프트/가사 생성기',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-900 text-white min-h-screen">{children}</body>
    </html>
  );
}
