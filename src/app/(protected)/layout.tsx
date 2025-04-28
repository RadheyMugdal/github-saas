import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";
import AppSidebar from "./dashboard/app-sidebar";
import UserButton from "@/components/user/UserButton";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="h-screen w-screen">
      <AppSidebar />
      <main className="m-2 w-full">
        <div className="border-sidebar-border bg-sidebar flex items-center justify-end gap-2 rounded-md border p-2 px-4 shadow">
          <UserButton />
        </div>
        <div className="h-4"></div>
        <div className="border-sidebar-border bg-sidebar h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
