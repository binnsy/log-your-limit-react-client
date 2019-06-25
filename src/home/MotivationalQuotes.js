import React, { Component } from 'react'
import { quotes } from './MotivationalQuotesList'

class Quote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: this.getQuote()
    }
  }

  componentDidMount () {
    const newQuote = () => this.setState({ quote: this.getQuote() })
    setInterval(newQuote, 24000)
  }
  getQuote =() => {
    const random = (Math.random() * quotes.length) | 0
    return quotes[random]
  }

  render () {
    const { quote } = this.state
    // console.log(quote)

    return (
      <div>
        <h4 className='quote'> { quote.quote } </h4>
      </div>
    )
  }
}

export default Quote
