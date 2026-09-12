import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout.jsx';
import { supabase } from '../../supabase.js';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('portfolio_work')
        .select('category')
        .neq('category', 'site_page');
      
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        // Count frequencies of each category
        const counts = {};
        data.forEach(item => {
          const cat = item.category || 'Uncategorized';
          counts[cat] = (counts[cat] || 0) + 1;
        });
        
        // Convert to array
        const catArray = Object.keys(counts).map(key => ({
          name: key,
          count: counts[key]
        }));
        
        setCategories(catArray.sort((a, b) => b.count - a.count));
      }
      setLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <DashboardLayout activeTab="categories">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Categories Management</h2>
      </div>

      <div className="admin-card">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
            No categories found. Create a project first.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Category Name</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Total Projects</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--admin-text)' }}>
                    {c.name}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--admin-text-muted)' }}>
                    {c.count} {c.count === 1 ? 'project' : 'projects'}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--admin-gold)', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
