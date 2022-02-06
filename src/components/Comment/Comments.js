import React from 'react';

//code của mình
import CommentItem from './CommentItem';

const commnonKey = "post-comment"
const Comments = React.memo(({comments}) => {
  return <div>
    {comments.map((comment,index)=>(
      <CommentItem
        key={`${commnonKey}-${comment._id}-${index}`}
        {...comment}
      />
    ))}
  </div>
});

export default Comments;