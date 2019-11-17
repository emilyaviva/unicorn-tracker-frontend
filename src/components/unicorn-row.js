import React from 'react'
import './unicorn-row.css'

import API from '../lib/API'

class UnicornRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      editMode: false,
      initialName: this.props.name,
      initialColor: this.props.color,
      initialFood: this.props.food,
      initialLocation: this.props.location,
      editedName: '',
      editedColor: '',
      editedFood: '',
      editedLocation: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleChange (e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
      [`edited${name.charAt(0).toUpperCase() + name.slice(1)}`]: value
    })
  }

  handleEditToggle () {
    // Always blank edited values
    this.setState({
      editedName: '',
      editedColor: '',
      editedFood: '',
      editedLocation: '',
      editMode: !this.state.editMode
    })
  }

  async handleSave () {
    const {
      initialName,
      initialColor,
      initialFood,
      initialLocation,
      editedName,
      editedColor,
      editedFood,
      editedLocation
    } = this.state
    const newAttributes = {
      name: editedName || initialName,
      color: editedColor || initialColor,
      food: editedFood || initialFood,
      location: editedLocation || initialLocation
    }
    try {
      const res = await API.put(`/unicorns/${this.props.unicornId}`, newAttributes)
      if (res.status === 204) {
        this.setState({
          initialName: newAttributes.name,
          initialColor: newAttributes.color,
          initialFood: newAttributes.food,
          initialLocation: newAttributes.location
        })
        this.handleEditToggle()
      } else {
        throw new Error('Did not receive the appropriate API response for updating an item')
      }
    } catch (e) {
      console.error(`Failed API request: ${e}`)
    }
  }

  render () {
    const {
      initialName,
      initialColor,
      initialFood,
      initialLocation,
      editMode
    } = this.state

    if (!editMode) {
      return (
        <tr>
          <td>{initialName}</td>
          <td>{initialColor}</td>
          <td>{initialFood}</td>
          <td>{initialLocation}</td>
          <td>
            <button onClick={this.handleEditToggle}>Edit</button>
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td><input name='name' type='text' defaultValue={initialName} onChange={this.handleChange} /></td>
          <td><input name='color' type='text' defaultValue={initialColor} onChange={this.handleChange} /></td>
          <td><input name='food' type='text' defaultValue={initialFood} onChange={this.handleChange} /></td>
          <td>
            <select name='location' defaultValue={initialLocation} onChange={this.handleChange}>
              <option value='Barn'>Barn</option>
              <option value='Trails'>Trails</option>
              <option value='Pasture'>Pasture</option>
              <option value='Swimming Pool'>Swimming Pool</option>
            </select>
          </td>
          <td>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleEditToggle}>Cancel</button>
          </td>
        </tr>
      )
    }
  }
}

export default UnicornRow
