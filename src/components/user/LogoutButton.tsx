"use client";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter()
  return (
    <DropdownMenuItem className="flex items-center" onClick={async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in")
          }
        }
      })
    }}>
      <LogOut />
      Logout
    </DropdownMenuItem>
  );
};

export default LogoutButton;
