import BlogViewToggle from './BlogViewToggle';
// import blogService from '../services/blogs';
import { useState } from 'react';

const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
  const [likes, setLikes] = useState(blog.likes);

  const updateBlog = async (e) => {
    e.preventDefault();
    const id = await blog.id;
    setLikes(likes + 1);

    handleUpdate(
      {
        likes: likes,
      },
      id
    );
    // setLikes(blog.likes);
  };

  const loggedInUser = blog.user.username;

  const deleteOne = async (e) => {
    e.preventDefault();
    const id = await blog.id;
    if (user) {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        await handleDelete(id);
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <BlogViewToggle
        title={blog.title}
        author={blog.author}
        buttonLabel1="view"
        buttonLabel2="hide"
      >
        <div>
          <span>{blog.url}</span> <br />
          <span>
            likes <span className="likes-count">{likes}</span>{' '}
          </span>{' '}
          <button id="like-btn" onClick={updateBlog}>
            like
          </button>{' '}
          <br />
          {/* {blog.author}{' '} */}
          {user === loggedInUser ? (
            <button
              id="delete-btn"
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={deleteOne}
            >
              remove
            </button>
          ) : (
            ''
          )}
        </div>
      </BlogViewToggle>
    </div>
  );
};

export default Blog;
