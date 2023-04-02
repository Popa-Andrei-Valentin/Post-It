const POSTS = {
  ERROR: {
    NO_LOAD: {
      userId: 1,
      id: 1,
      title: 'Error: List cannot be loaded',
      body: 'Please contact support team, the posts cannot be loaded.',
      error: true
    },
    API: (code, message) => {
      const response = {
        userId: 1,
        id: 1,
        title: `Error ${code}`,
        body: `${message}`,
        error: true
      }
      return response
    }
  }
}

export default POSTS
