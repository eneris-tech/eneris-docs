import React from 'react';

export default function PermissionsTable() {
  const rows = [
    ['See list of accounts', '✅', '✅', '✅'],
    ['Create new account', '✅', '🚫', '🚫'],
    ['Edit account', '✅', '🚫', '🚫'],
    ['Delete account', '✅', '🚫', '🚫'],
    ['See Inspector Profiles', '✅', '✅', '✅'],
    ['Create Inspector Profiles', '✅', '✅', '🚫'],
    ['Use Inspector Profiles', '✅', '✅', '✅'],
    ['Edit Inspector Profiles', '✅', '✅', '🚫'],
    ['Delete Inspector Profiles', '✅', '✅', '🚫'],
    ['See Contacts list', '✅', '✅', '🚫'],
    ['Create Contacts', '✅', '✅', '✅'],
    ['Use Contacts', '✅', '✅', '✅'],
    ['Edit Contacts', '✅', '✅', '✅'],
    ['Delete Contacts', '✅', '✅', '🚫'],
    ['See Service Agreements list', '✅', '✅', '✅'],
    ['Create Service Agreements', '✅', '✅', '🚫'],
    ['Use Service Agreements', '✅', '✅', '✅'],
    ['Edit Service Agreements', '✅', '✅', '🚫'],
    ['Delete Service Agreements', '✅', '✅', '🚫'],
    ['See Form Templates list', '✅', '✅', '✅'],
    ['Create Form Templates', '✅', '✅', '🚫'],
    ['Use Form Templates', '✅', '✅', '✅'],
    ['Edit Form Templates', '✅', '✅', '🚫'],
    ['Delete Form Templates', '✅', '✅', '🚫'],
    ['See Inspections list', '✅', '✅', '✅'],
    ['Create Inspection', '✅', '✅', '✅'],
    ['Use Inspection', '✅', '✅', '✅'],
    ['Edit Inspection', '✅', '✅', '✅'],
    ['Delete Inspection', '✅', '✅', '🚫'],
    ['See Inspection Forms', '✅', '✅', '✅'],
    ['Create Inspection Forms', '✅', '✅', '✅'],
    ['Use Inspection Forms', '✅', '✅', '✅'],
    ['Edit Inspection Forms', '✅', '✅', '✅'],
    ['Publish Inspection Forms', '✅', '✅', '✅'],
    ['Delete Inspection Forms', '✅', '✅', '🚫'],
    ['See Report', '✅', '✅', '✅'],
    ['Preview Report', '✅', '✅', '✅'],
    ['Use Report', '✅', '✅', '✅'],
    ['Edit Report', '✅', '✅', '✅'],
    ['Delete Report', '✅', '✅', '🚫'],
    ['Share Report', '✅', '✅', '✅'],
    ['Upload images and videos', '✅', '✅', '✅'],
    ['Purchase subscription', '✅', '🚫', '🚫'],
    ['Edit subscription', '✅', '🚫', '🚫'],
    ['See subscription', '✅', '🚫', '🚫']
  ];

  return (
    <table style={{ width: '75%', maxWidth: '75%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '12px 12px' }}>Permission</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>ADMIN</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>SCHEDULER</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>INSPECTOR</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td style={{ padding: '10px 12px' }}>{row[0]}</td>
            <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row[1]}</td>
            <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row[2]}</td>
            <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}