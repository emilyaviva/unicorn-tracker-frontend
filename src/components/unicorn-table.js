import React from 'react'
import './unicorn-table.css'

import UnicornRow from './unicorn-row'

const UnicornTable = ({ unicorns, loading }) => {
  if (loading) {
    return <div className='loading'>Loading…</div>
  }
  return (
    <div className='UnicornTable'>
      <table>
        <thead>
          <tr>
            <th>Unicorn Name</th>
            <th>Favorite Color</th>
            <th>Favorite Food</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {unicorns.map(unicorn => (
            <UnicornRow
              key={unicorn.name}
              unicornId={unicorn.id}
              name={unicorn.name}
              color={unicorn.color}
              food={unicorn.food}
              location={unicorn.location}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UnicornTable
