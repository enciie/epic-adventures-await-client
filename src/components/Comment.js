import React from 'react'

import '../stylesheets/Comment.css'

const Comment = ({ comment, user, deleteComment, tripId }) =>
  <div className="commentText">
    <span className="sub-text">{comment.username}</span>
    {user.id === comment.user_id ? (
      <button className="deleteComment btn" onClick={() => deleteComment(comment.id, tripId)}>X</button>
    ) : (
        null
      )}
    <p className="">{comment.content}</p>

</div>

export default Comment;
