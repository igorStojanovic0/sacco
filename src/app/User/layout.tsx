import React from "react";

export default function UserLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex flex-col min-h-screen">
        {children}
    </div>
  )
}
