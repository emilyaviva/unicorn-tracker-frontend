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
            <td>Unicorn Name</td>
            <td>Favorite Color</td>
            <td>Favorite Food</td>
            <td>Location</td>
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
