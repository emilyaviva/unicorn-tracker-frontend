import React from 'react'
import './unicorn-table.css'

import API from '../lib/API'
import UnicornRow from './unicorn-row'

class UnicornTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addingNewUnicorn: false
    }

    this.toggleAddingNewUnicorn = this.toggleAddingNewUnicorn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  toggleAddingNewUnicorn () {
    this.setState({
      addingNewUnicorn: !this.state.addingNewUnicorn
    })
  }

  async handleSave () {
    const {
      newName,
      newColor,
      newFood,
      newLocation
    } = this.state
    const newAttributes = {
      name: newName,
      color: newColor,
      food: newFood,
      location: newLocation
    }
    try {
      const res = await API.post(`/unicorns`, newAttributes)
      if (res.status === 201) {
        window.location.reload(false)
      } else {
        throw new Error('Did not receive the appropriate API response for adding an item')
      }
    } catch (e) {
      console.error(`Failed API request: ${e}`)
    }

  }

  handleChange (e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
      [`new${name.charAt(0).toUpperCase() + name.slice(1)}`]: value
    })
  }

  render() {
    const { unicorns, loading } = this.props
    const { addingNewUnicorn } = this.state
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
          <tfoot className={addingNewUnicorn ? '' : 'hidden'}>
            <tr>
              <th>
                <input name='newName' type='text' onChange={this.handleChange} placeholder='Name' />
              </th>
              <th>
                <input name='newColor' type='text' onChange={this.handleChange} placeholder='Favorite Color' />
              </th>
              <th>
                <input name='newFood' type='text' onChange={this.handleChange} placeholder='Favorite Food' />
              </th>
              <th>
                <select name='newLocation' type='text' onChange={this.handleChange} defaultValue='Barn'>
                  <option value='Barn'>Barn</option>
                  <option value='Trails'>Trails</option>
                  <option value='Pasture'>Pasture</option>
                  <option value='Swimming Pool'>Swimming Pool</option>
                </select>
              </th>
              <th>
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.toggleAddingNewUnicorn}>Cancel</button>
              </th>
            </tr>
          </tfoot>
        </table>
        <button className={addingNewUnicorn ? 'hidden' : ''} onClick={this.toggleAddingNewUnicorn}>Add New Unicorn</button>
      </div>
    )
  }
}

export default UnicornTable
