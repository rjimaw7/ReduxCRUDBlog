import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect, useState } from "react";
import PostsExcerpt from "./PostsExcerpt";
// import Header from "../../components/Header";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts
      .filter((data) => data.title.toLowerCase().includes(query))
      .map((post) => <PostsExcerpt key={post.id} post={post} />);
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      {/* <Header /> */}
      <div className="">
        <div className="w-4/6 z-50 relative mx-auto mt-3">
          <div className="bg-white w-full h-16 rounded-xl mb-3 shadow-lg p-2">
            <form>
              <input
                type="text"
                placeholder="Search"
                className="w-full h-full  text-2xl rounded-lg focus:outline-none"
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      <section>{content}</section>
    </>
  );
};
export default PostsList;
