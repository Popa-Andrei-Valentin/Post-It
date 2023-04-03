const URL = {
  POSTS: 'https://jsonplaceholder.typicode.com/posts',
  SELECT_POST: (id) => `https://jsonplaceholder.typicode.com/posts/${id}`,
  COMMENTS: (id) => `https://jsonplaceholder.typicode.com/posts/${id}/comments`
}

export default URL
