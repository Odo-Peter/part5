import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Success from './components/Success';
import Failure from './components/Failure';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();
  // const blogRef = useRef();

  const getBlogs = async () => {
    const res = await blogService.getAll();
    setBlogs(res.sort((a, b) => b.likes - a.likes));
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    return (
      <Togglable buttonLabel1="login" buttonLabel2="cancel">
        <LoginForm
          username={username}
          password={password}
          handlePasswordChange={({ target: { value } }) => setPassword(value)}
          handleUsernameChange={({ target: { value } }) => setUsername(value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    );
  };

  const blogForm = () => {
    return (
      <Togglable
        buttonLabel1="create new blog"
        buttonLabel2="cancel"
        ref={blogFormRef}
      >
        <BlogForm createBlog={handleCreate} />
      </Togglable>
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const data = await blogService.create(blogObject);
      setBlogs(blogs.concat(data));

      setSuccessMessage(`a new blog ${data.title} by ${data.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
        getBlogs();
      }, 5000);
    } catch (err) {
      if (err.response.data.error === 'Token expired') {
        setErrorMessage('Please Login to create a new blog');
        setTimeout(() => {
          setErrorMessage(null);
          setUser(null);
        }, 5000);
      }
      if (err.response.data.error === 'All fields required') {
        setErrorMessage('All blog fields must be filled!');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  const handleUpdate = async (blogObject, id) => {
    try {
      await blogService.updateOne(blogObject, id);
      getBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      getBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {errorMessage && <Failure message={errorMessage} />}
      {user === null ? (
        <>
          <h2>Blogs</h2>
          {loginForm()}
        </>
      ) : (
        <div>
          <h2>Blogs</h2>
          {successMessage && <Success message={successMessage} />}
          <p>
            {user.name} logged in{' '}
            <button id="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </p>{' '}
          {blogForm()}
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              user={user.username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
