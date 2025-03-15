
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
  }
}

export default path;
