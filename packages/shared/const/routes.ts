export const AuthRoutes = {
  SingIn: "/auth/sign-in",
  SingUP: "/auth/sign-up",
} as const;

export const DashboardRoutes = {
  Dashboard: "/dashboard",
  Notes: "/notes",
  Note: "/notes/",
  AddNote: "/notes/add",
  EditNote: (id: string) => `${DashboardRoutes.Note}${id}/edit`,
} as const;

export const ProfileRoutes = {
  General: "/profile",
} as const;
