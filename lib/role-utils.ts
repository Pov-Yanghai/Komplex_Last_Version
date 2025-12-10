import type { UserRole } from "./auth-context"

// <CHANGE> Update role routes to include admin and analyst
export const roleRoutes: Record<UserRole, string> = {
  admin: "/dashboard",
  educator: "/dashboard",
  student: "/dashboard/student",
  analyst: "/dashboard/analyst",
}

export const getRoleSpecificRoute = (role: UserRole, route: string): string | null => {
  // Routes that are role-specific
  const roleRestrictedRoutes: Record<string, Partial<Record<UserRole, boolean>>> = {
    "/dashboard": { admin: true, educator: true, analyst: true, student: false },
    "/dashboard/student": { student: true },
    "/dashboard/analyst": { analyst: true },
    "/admin": { admin: true },
    "/educator": { educator: true },
    "/courses": { admin: true, educator: true },
    "/students": { admin: true, educator: true },
    "/grades": { admin: true, educator: true },
    "/messages": { admin: true, educator: true, student: true },
    "/browse-courses": { student: true },
    "/my-courses": { student: true },
    "/my-work": { student: true },
  }

  // Check if route has role restrictions
  for (const [restrictedRoute, roles] of Object.entries(roleRestrictedRoutes)) {
    if (route === restrictedRoute || route.startsWith(restrictedRoute + "/")) {
      if (!roles[role]) {
        return roleRoutes[role] // Redirect to role's home
      }
    }
  }

  return null // Route is allowed for this role
}
