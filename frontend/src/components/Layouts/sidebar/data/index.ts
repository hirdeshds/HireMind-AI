import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "RECRUITER MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/",
        items: [],
      },
      {
        title: "Jobs",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Manage Jobs",
            url: "/jobs",
          },
          {
            title: "Create Job",
            url: "/jobs/create",
          },
        ],
      },
      {
        title: "Candidates",
        icon: Icons.User,
        items: [
          {
            title: "Leaderboard",
            url: "/candidates",
          },
          {
            title: "Upload Resumes",
            url: "/candidates/upload",
          },
        ],
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        title: "Admin Dashboard",
        icon: Icons.PieChart,
        url: "/admin",
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.Alphabet,
        url: "/pages/settings",
        items: [],
      },
    ],
  },
];
