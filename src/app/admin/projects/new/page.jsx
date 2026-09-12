'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const NewProject = dynamic(() => import('../../../../components/admin/NewProject.jsx'), {
  ssr: false,
  loading: () => <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Cargando editor...</div>
});

export default function AdminNewProjectPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>}>
      <NewProject />
    </Suspense>
  );
}
