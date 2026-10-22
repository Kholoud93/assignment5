const commentRepository = require('../repositories/comment.repository');

/*
Question:
Create a bulk of comments.
URL: POST /comments
Body: an array of comments, each with content, postId, and userId.
*/

const createComments = (comments) => {
  if (!Array.isArray(comments)) {
    const error = new Error('Body must be an array of comments');
    error.status = 400;
    throw error;
  }

  return commentRepository.bulkCreate(comments);
};

/*
Question:
Update the content of a specific comment by its id.
Only the owner of the comment can perform this action.
The user id is given in the body.
URL: PATCH /comments/:commentId
Body: { "userId": 3, "content": "updated" }
*/

const updateComment = async (commentId, { userId, content }) => {
  const comment = await commentRepository.findById(commentId);

  if (!comment) {
    const error = new Error('Comment not found');
    error.status = 404;
    throw error;
  }

  if (Number(comment.userId) !== Number(userId)) {
    const error = new Error('Only the owner of the comment can update it');
    error.status = 403;
    throw error;
  }

  return commentRepository.updateContent(comment, content);
};

/*
Question:
Find a comment for a specific post, user, and content.
If the comment exists, return it. Otherwise, create a new comment with the given details.
URL: POST /comments/find-or-create
*/

const findOrCreateComment = async ({ content, postId, userId }) => {
  const [comment, created] = await commentRepository.findOrCreate({ content, postId, userId });
  return { comment, created };
};

/*
Question:
Retrieve all comments that contain a specific word in their content
and return the number of comments matched. Use find and count.
URL: GET /comments/search?word=the
*/

const searchComments = async (word) => {
  if (!word) {
    const error = new Error('Word is required');
    error.status = 400;
    throw error;
  }

  const result = await commentRepository.searchByWord(word);

  return {
    count: result.count,
    comments: result.rows,
  };
};

/*
Question:
Retrieve the 3 most recent comments for a specific post, ordered by creation date.
URL: GET /comments/newest/:postId
*/

const getNewestComments = (postId) => {
  return commentRepository.findNewestByPostId(postId);
};

/*
Question:
Get a specific comment by primary key with user and post information.
URL: GET /comments/details/:id
*/

const getCommentDetails = async (id) => {
  const comment = await commentRepository.findByIdWithDetails(id);

  if (!comment) {
    const error = new Error('Comment not found');
    error.status = 404;
    throw error;
  }

  return comment;
};

module.exports = {
  createComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  getNewestComments,
  getCommentDetails,
};
