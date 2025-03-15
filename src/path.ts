
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
  postShow(topic: string, postId: string) {
    return `/topics/${topic}/posts/${postId}`;
  }
}

export default path;
