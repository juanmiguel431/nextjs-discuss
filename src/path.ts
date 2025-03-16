
const path = {
  home() {
    return '/';
  },
  topicShow(topic: string) {
    return `/topics/${topic}`;
  },
  postCreate(topic: string) {
    return `/topics/${topic}/posts/new`;
  },
  postShow(slug: string, postId: string) {
    return `/topics/${slug}/posts/${postId}`;
  },
  search(term: string) {
    return `/search?term=${encodeURIComponent(term)}`;
  }
}

export default path;
