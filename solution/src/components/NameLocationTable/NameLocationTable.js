import React from 'react';
import './NameLocationTable.css';

function NameLocationTable(props) {
  // variable for location array frpm props
  let { locations } = props;

  return (
    <table className="name-location-table table table-striped">
      <thead className="table-secondary">
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {locations && locations.map((row) => (
          <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default NameLocationTable;