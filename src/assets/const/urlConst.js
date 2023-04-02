const URL = {
  POSTS: 'https://jsonplaceholder.typicode.com/posts',
  COMMENTS: (id) => `https://jsonplaceholder.typicode.com/posts/${id}/comments`
}

export default URL
