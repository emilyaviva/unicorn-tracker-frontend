import React from 'react'
import './App.css'

import API from './lib/API'
import UnicornTable from './components/unicorn-table'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      unicorns: []
    }
  }

  async componentDidMount () {
    try {
      const res = await API.get('/unicorns')
      const unicorns = res.data
      this.setState({
        loading: false,
        unicorns
      })
    } catch (e) {
      console.error(`Failed API request: ${e}`)
    }
  }

  render () {
    const { loading, unicorns } = this.state
    return (
      <div className='App'>
        <h1>Emily's Unicorn Ranch</h1>
        <UnicornTable loading={loading} unicorns={unicorns} />
      </div>
    )
  }
}

export default App
