import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <div>
            <h2>Log in to application</h2>
          </div>
          username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          password{' '}
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
