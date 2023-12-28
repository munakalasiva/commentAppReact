import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', textInput: '', commentsList: []}

  toggleLikeImage = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachOne => {
        if (eachOne.id === id) {
          return {...eachOne, isLiked: !eachOne.isLiked}
        }
        return eachOne
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeTextInput = event => {
    this.setState({textInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const randomBackgroundColor = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const {nameInput, textInput} = this.state
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: textInput,
      time: new Date(),
      isLiked: false,
      initialClassName: randomBackgroundColor,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      textInput: '',
    }))
  }

  render() {
    const {nameInput, textInput, commentsList} = this.state

    return (
      <div className="bg-con">
        <h1>Comments</h1>
        <div className="card">
          <form onSubmit={this.onAddComment} className="form-style">
            <p>Say something about 4.0 Technologies</p>

            <input
              className="name-input"
              placeholder="Your Name"
              onChange={this.onChangeNameInput}
              value={nameInput}
            />

            <textarea
              placeholder="Your Comment"
              onChange={this.onChangeTextInput}
              value={textInput}
              rows="6"
            />

            <button type="button" className="btn" onClick={this.onAddComment}>
              Add Comment
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <p>
          <span className="span">{commentsList.length}</span>Comments
        </p>
        <ul>
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              eachComment={eachComment}
              deleteComment={this.deleteComment}
              toggleLikeImage={this.toggleLikeImage}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
