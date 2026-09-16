import { useState } from "react";
import Layout, { type Page } from "./components/Layout";
import Overview from "./pages/Overview";
import UserManagement from "./pages/UserManagement";
import FakeReportModeration from "./pages/FakeReportModeration";
import GrievanceManagement from "./pages/GrievanceManagement";
import Analytics from "./pages/Analytics";
import AuditLogs from "./pages/AuditLogs";
import ShelterManagement from "./pages/ShelterManagement";
import HelplineManagement from "./pages/HelplineManagement";
import SafetyGuidelines from "./pages/SafetyGuidelines";
import SystemSettings from "./pages/SystemSettings";

const PAGES: Record<Page, React.ReactNode> = {
  overview: <Overview />,
  users: <UserManagement />,
  moderation: <FakeReportModeration />,
  grievances: <GrievanceManagement />,
  analytics: <Analytics />,
  audit: <AuditLogs />,
  shelters: <ShelterManagement />,
  helplines: <HelplineManagement />,
  guidelines: <SafetyGuidelines />,
  settings: <SystemSettings />,
};

export default function App() {
  const [page, setPage] = useState<Page>("overview");

  return (
    <Layout current={page} onNavigate={setPage}>
      {PAGES[page]}
    </Layout>
  );
}
