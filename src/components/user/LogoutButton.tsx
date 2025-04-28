"use client";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <DropdownMenuItem className="flex items-center" onClick={() => signOut()}>
      <LogOut />
      Logout
    </DropdownMenuItem>
  );
};

export default LogoutButton;
