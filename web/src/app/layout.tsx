import './styles/global.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ height: '100%' }}>{children}</body>
    </html>
  )
}
