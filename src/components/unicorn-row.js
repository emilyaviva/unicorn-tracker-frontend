import React from 'react'
import './unicorn-row.css'

class UnicornRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      editMode: false,
      location: this.props.location
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleChange (e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleEdit () {
    this.setState({
      editMode: true
    })
  }

  handleCancel () {
    this.setState({
      editMode: false
    })
  }

  handleSave () {
    this.setState({
      editMode: false
    })
  }

  render () {
    const { name, color, food } = this.props
    const { location, editMode } = this.state

    if (!editMode) {
      return (
        <tr>
          <td>{name}</td>
          <td>{color}</td>
          <td>{food}</td>
          <td>{location}</td>
          <td>
            <button onClick={this.handleEdit}>Edit</button>
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td><input type='text' value={name} /></td>
          <td><input type='text' value={color} /></td>
          <td><input type='text' value={food} /></td>
          <td>
            <select value={location} onChange={this.handleChange}>
              <option value='Barn'>Barn</option>
              <option value='Trails'>Trails</option>
              <option value='Pasture'>Pasture</option>
              <option value='Swimming Pool'>Swimming Pool</option>
            </select>
          </td>
          <td>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </td>
        </tr>
      )
    }
  }
}

export default UnicornRow
