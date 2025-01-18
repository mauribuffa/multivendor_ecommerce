import { Logo } from "@/components/shared/logo";
import { currentUser } from "@clerk/nextjs/server";
import { UserInfo } from "@/components/dashboard/sidebar/user-info";
import { SidebarNavAdmin } from "@/components/dashboard/sidebar/nav-admin";
import { adminDashboardSidebarOptions } from "@/constants/data";

interface SidebarProps {
  children?: React.ReactNode;
  isAdmin: boolean;
}

export const Sidebar = async ({ isAdmin }: SidebarProps) => {
  const user = await currentUser();

  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0">
      <Logo width="100%" height="180px" />
      <span className="mt-3" />
      <UserInfo user={user!} />
      {isAdmin && (
        <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />
      )}
    </div>
  );
};
