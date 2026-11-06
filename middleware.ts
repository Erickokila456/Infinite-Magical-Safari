import { NextResponse } from "next/server";
import { auth } from "./app/auth";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  
  // If they are trying to access /admin but aren't an ADMIN
  if (isAdminRoute && req.auth?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow all other routes to pass through
  return NextResponse.next();
});

export const config = {
  // This forces Next.js to run this middleware on the Node.js runtime (where Prisma works)
  runtime: "nodejs",
  matcher: ["/admin/:path*"], 
};