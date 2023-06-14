import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    disabled: true,
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const num6 = 6;
      const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const disabled = !(regexForEmail.test(email) && password.length >= num6);
      this.setState({ disabled });
    });
  };

  handleClick = (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, disabled, password } = this.state;

    return (
      <div>
        <input
          name="email"
          type="email"
          onChange={ (event) => this.handleChange(event) }
          value={ email }
          required
          placeholder="email"
          data-testid="email-input"
        />
        <input
          name="password"
          type="password"
          value={ password }
          required
          onChange={ (event) => this.handleChange(event) }
          placeholder="senha"
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
