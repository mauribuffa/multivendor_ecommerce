import { Header } from "@/components/dashboard/header/header";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout = async ({ children }: AdminDashboardLayoutProps) => {
  const user = await currentUser();
  const role = user?.privateMetadata.role;

  if (role !== Role.ADMIN) {
    redirect("/");
  }

  return (
    <div className="w-full h-full">
      <Sidebar isAdmin></Sidebar>
      <div className="w-full ml-[300px]">
        <Header />
        <div className="w-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  )
}

export default AdminDashboardLayout