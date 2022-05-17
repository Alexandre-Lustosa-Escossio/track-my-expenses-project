import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userAction } from '../actions';
import './Login.css';

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
      <main className="d-flex justify-content-center align-items-center vw-100 vh-100">
        <form className="rounded p-4 p-sm-3">
          <div className="mb-3">
            <label htmlFor="email">
              Email address
              <input
                id="email"
                type="email"
                name="email"
                data-testid="email-input"
                className="form-control"
                placeholder="michael.scott@dundermifflin.com"
                onChange={ (event) => this.handleInputChange(event) }
                value={ email }
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                data-testid="password-input"
                name="passwordField"
                className="form-control"
                value={ passwordField }
                onChange={ (event) => this.handleInputChange(event) }
              />
            </label>
          </div>
          <section className="d-grid align-items-center justify-content-center">
            <Link to="/carteira">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={ this.isBtnDisabled() }
                onClick={ this.handleBtnClick }
              >
                Entrar
              </button>
            </Link>
          </section>
        </form>
      </main>
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
