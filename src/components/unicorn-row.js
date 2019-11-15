import React from 'react'
import './unicorn-row.css'

class UnicornRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      location: this.props.location
    }
  }

  handleChange (e) {
    this.setState({
      location: e.target.value
    })
  }

  render () {
    const { name, color, food } = this.props
    const { location } = this.state
    return (
      <tr>
        <td>{name}</td>
        <td>{color}</td>
        <td>{food}</td>
        <td>
          <select value={location} onChange={this.handleChange.bind(this)}>
            <option value='Barn'>Barn</option>
            <option value='Trails'>Trails</option>
            <option value='Pasture'>Pasture</option>
            <option value='Swimming Pool'>Swimming Pool</option>
          </select>
        </td>
      </tr>
    )
  }
}

export default UnicornRow
