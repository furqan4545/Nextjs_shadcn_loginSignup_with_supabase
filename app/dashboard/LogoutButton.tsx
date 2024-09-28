"use client";

import { Button } from "@/components/ui/button";
import { logout } from "./action";

export default function LogoutButton() {
  return <Button onClick={() => logout()}>Logout</Button>;
}
