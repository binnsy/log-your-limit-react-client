import React, { Component } from 'react'
import { quotes } from './MotivationalQuotesList'
// import Button from 'react-bootstrap/Button'

class Quote extends Component {
  constructor (props) {
    super(props)
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
    // const randomNumber = (Math.floor(Math.random() * 1))
    // console.log(randomNumber)
    // const newQuote = quotes[randomNumber].content
    // console.log(newQuote)
    const newQuote = () => this.setState({ quote: this.getQuote() })
    setInterval(newQuote, 24000)
    // this.setState({ content: quotes })
    // this.setState({ quotes })
    // setInterval(getQuotes, 10000)
  }
  getQuote =() => {
    const random = (Math.random() * quotes.length) | 0
    return quotes[random]
  }
  //
  // getQuote = () => {
  //

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
