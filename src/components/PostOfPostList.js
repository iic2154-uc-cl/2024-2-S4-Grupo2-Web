/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PostImage from './PostImage';
import PostBody from './PostBody';

export default function PostOfPostList(props) {
  const { publication, type } = props;

  return (
    <div
      id="publication"
      className="my-5 mb-10 flex h-auto w-full flex-row items-center justify-center gap-5"
    >
      <div
        id="image_container"
        className="flex h-full w-1/4 items-center justify-end p-0"
      >
        <PostImage publication={publication} width={800} height={600} />
      </div>
      <div
        id="information_container"
        className="h-full min-h-full w-3/4 items-center justify-end p-0"
      >
        <PostBody publication={publication} type={type} />
      </div>
    </div>
  );
}
