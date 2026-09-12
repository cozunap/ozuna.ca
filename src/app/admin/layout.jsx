import '../../components/admin/AdminGlobal.css';

export const metadata = {
  title: 'Admin Dashboard | Ozuna Portfolio',
  description: 'Ozuna Portfolio Content Management System',
};

export default function AdminRootLayout({ children }) {
  return (
    <div className="admin-mode" style={{ minHeight: '100vh', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)' }}>
      {children}
    </div>
  );
}
