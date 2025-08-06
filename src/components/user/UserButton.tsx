
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const UserButton = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return redirect("/sign-in");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={session?.user?.image as string}
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2">
          <div>
            <Image
              src={session?.user?.image as string}
              alt="user"
              width={30}
              height={30}
              className="shrink-0 rounded-full"
            />
          </div>
          <div className="flex flex-col py-2">
            <p className="text-xs">{session.user.email}</p>
            <p className="text-xs opacity-80">{session.user.name}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
