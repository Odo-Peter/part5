import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title{' '}
            <input
              type="text"
              value={title}
              name="Title"
              id="title"
              onChange={({ target: { value } }) => setTitle(value)}
              placeholder="Enter Blog Title..."
            />
          </div>
          <div>
            author{' '}
            <input
              type="text"
              id="author"
              value={author}
              name="Author"
              onChange={({ target: { value } }) => setAuthor(value)}
              placeholder="Enter Blog Author..."
            />
          </div>
          <div>
            url{' '}
            <input
              type="url"
              value={url}
              name="Url"
              id="url"
              onChange={({ target: { value } }) => setUrl(value)}
              placeholder="Enter Blog URL..."
            />
          </div>
          <button id="submit-btn" type="submit">
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
