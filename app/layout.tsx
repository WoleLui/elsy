import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Praluse | Pâtisserie Artisanale',
  description: 'Découvrez les créations gourmandes de Praluse, pâtisserie artisanale. Gâteaux, viennoiseries et douceurs faits maison avec passion depuis 2010.',
  keywords: ['pâtisserie', 'artisanale', 'Paris', 'gâteaux', 'croissants', 'chocolat', 'boulangerie'],
  authors: [{ name: 'Praluse' }],
  openGraph: {
    title: 'Praluse | Pâtisserie Artisanale',
    description: "L'art de la gourmandise depuis 2010",
    images: ['/images/croissants.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Praluse | Pâtisserie Artisanale',
    description: "L'art de la gourmandise depuis 2010",
    images: ['/images/croissants.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-inter antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
