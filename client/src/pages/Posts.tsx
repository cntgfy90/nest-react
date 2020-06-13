import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../reducers';
import fetchPosts from '../actions/posts';
import Card from '../components/Card';
import { IPost, IPostsState } from '../types/post.types';
import { ThunkDispatch } from '../types/common.types';
import Loader from '../components/Loader';

interface IPostsProps {
  posts?: IPostsState;
  fetchPosts?: () => Promise<void>;
}

function Posts(props: IPostsProps = {}): JSX.Element {
  const { posts, fetchPosts } = props;

  useEffect(() => {
    if (!posts?.isLoaded && fetchPosts) fetchPosts();
  }, []);

  return posts?.isLoaded ? (
    <div>
      {posts?.items.map((post: IPost) => {
        return <Card key={post.id} title={post.title} body={post.body} />;
      })}
    </div>
  ) : (
    <Loader />
  );
}

const mapStateToProps = (state: IAppState): IPostsProps => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch): IPostsProps => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
