import React, { Component } from 'react'
import { quotes } from './MotivationalQuotesList'
// import Button from 'react-bootstrap/Button'
class Quote extends Component {
  constructor () {
    super()
    this.state = {
      quote: this.newQuote()
    }
  }
  // handleClick = () => {
  //   this.setState({
  //     quote: 'new quote'
  //   })
  // }

  componentDidMount () {
    const getQuote = () => this.setState({ quote: this.newQuote() })
    setInterval(getQuote, 10000)
  }

newQuote = () => {
  const randomNumber = (Math.floor(Math.random() * quotes.lenth))
  return quotes[randomNumber]
}

render () {
  const { quote } = this.state
  console.log(quote)
  // const displayQuote = <h4>&quot;{quote.quote}&quot</h4>

  return (
    <div>
      <h1> { this.state.newQuote } </h1>
    </div>
  )
}
}
//
// class Quote extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       content: ''
//     }
//   }
//
//   componentDidMount () {
//     const number = (Math.floor(Math.random() * quotes.length))
//
//     const quote = quotes[number].content
//
//     this.setState({ content: quote })
//   }
//
//   render () {
//     return (
//       <div>
//         <h1>{this.state.content}</h1>
//       </div>
//     )
//   }
// }
//
// class Buttons extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.newQuote = this.newQuote.bind(this)
//   }
//
//   newQuote () {
//     alert('new quote')
//   }
//
//   render () {
//     return (
//       <div>
//         <span className="quote-button" onClick={this.newQuote}>New Quote</span>
//       </div>
//     )
//   }
// }

export default Quote
