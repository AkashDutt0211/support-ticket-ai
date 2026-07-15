import type { Comment } from '../../types/ticket';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="muted">No comments yet.</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-item">
          <p>{comment.message}</p>
          <p className="muted">
            {comment.createdBy.name} · {new Date(comment.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
