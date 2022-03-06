import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userAction } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    passwordField: '',
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  isBtnDisabled = () => {
    const { email, passwordField } = this.state;
    const MINIMUM_PASSWORD_LENGTH = 6;
    const RE = /^[\w-.]+@([\w-]+\.)+[\w]/;
    const isEmailOk = email.match(RE);
    return !(passwordField.length >= MINIMUM_PASSWORD_LENGTH
      && isEmailOk);
  }

  handleBtnClick = () => {
    const { saveUserLoginData } = this.props;
    const { email } = this.state;
    saveUserLoginData(email);
  }

  render() {
    const { email, passwordField } = this.state;
    return (
      <>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="michael.scott@dundermifflin.com"
          onChange={ (event) => this.handleInputChange(event) }
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          name="passwordField"
          value={ passwordField }
          onChange={ (event) => this.handleInputChange(event) }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ this.isBtnDisabled() }
            onClick={ this.handleBtnClick }
          >
            Entrar
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserLoginData: (state) => dispatch(userAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveUserLoginData: PropTypes.func.isRequired,
};
