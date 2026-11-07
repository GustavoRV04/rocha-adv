import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { readAdminSession } from "@/lib/admin-auth";
import { query } from "@/lib/db";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionEmail = await readAdminSession();

  if (!sessionEmail) {
    redirect("/login");
  }

  const result = await query<{ count: number }>(
    "SELECT COUNT(*)::int AS count FROM compromissos",
  );

  return (
    <AdminShell commitmentsCount={result.rows[0]?.count ?? 0}>{children}</AdminShell>
  );
}
