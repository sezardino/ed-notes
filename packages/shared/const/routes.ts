export const AuthRoutes = {
  SingIn: "/auth/sign-in",
  SingUP: "/auth/sign-up",
} as const;

export const DashboardRoutes = {
  Dashboard: "/dashboard",
  Notes: "/dashboard/notes",
  Note: "/dashboard/notes/",
  AddNote: "/dashboard/add-note",
} as const;

export const ProfileRoutes = {
  General: "/profile",
} as const;
