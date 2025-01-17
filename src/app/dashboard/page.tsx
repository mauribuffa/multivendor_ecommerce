import { currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await currentUser();
  const role = user?.privateMetadata.role;

  switch (role) {
    case undefined:
    case Role.USER:
      redirect("/");
    case Role.ADMIN:
      redirect("/dashboard/admin");
    case Role.SELLER:
      redirect("/dashboard/seller");
    default:
      throw new Error(`Unexpected role: ${role}`);
  }
}

export default DashboardPage