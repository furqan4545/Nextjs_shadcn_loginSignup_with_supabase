import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
// import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";

export default async function Dashboard() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <div>Dashboard</div>
      <p>Hello {data.user.email}</p>

      <LogoutButton />
    </>
  );
}
