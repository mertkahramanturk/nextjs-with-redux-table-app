import "../assets/styles/styles.scss";

import { Inter } from "next/font/google";
import StoreProvider from "../stores/store-provider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // const { category }: any = Store.getState().category.category;
  return (
    <html>
      <body className={inter.className}>
        <StoreProvider preloadedState={{
          // category: {
          //   category
          // }
        }}>
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
