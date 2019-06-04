import React, { Component } from 'react'
import { quotes } from './MotivationalQuotesList'

class Quote extends Component {
  constructor () {
    super()
    this.state = {
      quote: this.getQuote()
    }
  }
  // handleClick = () => {
  //   this.setState({
  //     quote: 'new quote'
  //   })
  // }
  componentDidMount () {
    const getQuote = () => this.setState({ quote: this.newQuote() })
    const randomNumber = (Math.floor(Math.random() * quotes.lenth))
    const newQuote = quotes[randomNumber]
    console.log(newQuote)
    console.log(getQuote)
  }

  render () {
    const { quote } = this.state
    return (
      <div>
        <h1> { this.state.newQuote } </h1>
        <h1> { quote.getQuote} </h1>
      </div>
    )
  }
}

export default Quote
