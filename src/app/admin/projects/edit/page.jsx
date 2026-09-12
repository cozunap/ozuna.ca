'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const EditProject = dynamic(() => import('../../../../components/admin/EditProject.jsx'), {
  ssr: false,
  loading: () => <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Cargando editor...</div>
});

export default function AdminEditProjectPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>}>
      <EditProject />
    </Suspense>
  );
}
