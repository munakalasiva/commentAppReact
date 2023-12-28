import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {eachComment, toggleLikeImage, deleteComment} = props
  const {id, name, comment, isLiked, time, initialClassName} = eachComment

  const initial = name ? name[0].toUpperCase() : ''
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const toggleLike = () => {
    toggleLikeImage(id)
  }
  const onClickDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="list-item">
      <div className="comment">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>

        <p className="name">{name}</p>
        <p className="time">
          <span className="span">{formatDistanceToNow(time)}</span>ago
        </p>
      </div>

      <p>{comment}</p>

      <div className="styling">
        <div>
          <img src={likeImageUrl} alt="like" />
          <button type="button" onClick={toggleLike}>
            Like
          </button>
        </div>
        <button onClick={onClickDelete} type="button" data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
