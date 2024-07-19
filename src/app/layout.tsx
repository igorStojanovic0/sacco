"use client"
import { MyProvider } from "@/context/MyContext";
import { Inter } from "next/font/google";
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const helmetContext = {}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    }
  }
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <title>Welcome to Twezimbe</title>
      <body >
        <Toaster visibleToasts={1} position='top-right' richColors />
          <QueryClientProvider client={queryClient} >
          <MyProvider>
            <HelmetProvider context={helmetContext}>
                  {children}
            </HelmetProvider>
            </MyProvider>
          </QueryClientProvider>
      </body>
    </html>
  );
}
