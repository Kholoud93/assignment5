const postRepository = require('../repositories/post.repository');

/*
Question:
Create a new post using a new instance and save.
Get the post data from the body.
URL: POST /posts
*/

const createPost = ({ title, content, userId }) => {
  return postRepository.create({ title, content, userId });
};

/*
Question:
Delete a post by its id.
Only the owner of the post can perform this action.
Send the acting user id in the body as userId.
URL: DELETE /posts/:postId
*/

const deletePost = async (postId, userId) => {
  const post = await postRepository.findById(postId);

  if (!post) {
    const error = new Error('Post not found');
    error.status = 404;
    throw error;
  }

  if (Number(post.userId) !== Number(userId)) {
    const error = new Error('Only the owner of the post can delete it');
    error.status = 403;
    throw error;
  }

  await postRepository.remove(post);
  return { message: 'Post deleted' };
};

/*
Question:
Retrieve all posts, including the user who created each post and the associated comments.
Show only id and title for the post, id and name for the user, and id and content for the comments.
URL: GET /posts/details
*/

const getPostsDetails = () => {
  return postRepository.findAllWithDetails();
};

/*
Question:
Retrieve all posts and count the number of comments associated with each post.
URL: GET /posts/comment-count
*/

const getPostsCommentCount = () => {
  return postRepository.findAllWithCommentCount();
};

module.exports = {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsCommentCount,
};
