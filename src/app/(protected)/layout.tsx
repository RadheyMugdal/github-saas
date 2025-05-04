import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";
import AppSidebar from "./dashboard/app-sidebar";
import UserButton from "@/components/user/UserButton";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex h-screen w-screen">
      <AppSidebar />
      <main className="m-2 flex flex-1 flex-col">
        <div className="border-sidebar-border bg-sidebar flex items-center justify-end gap-2 rounded-md border p-2 px-4 shadow">
          <UserButton />
        </div>
        <div className="border-sidebar-border bg-sidebar mt-2 flex-1 overflow-y-auto rounded-md border p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
