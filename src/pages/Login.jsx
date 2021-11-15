import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import Logo from '../images/logo.png';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      inputName: '',
      isLoading: false,
      logged: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleClickButton() {
    const { inputName } = this.state;
    this.setState({ isLoading: true });
    createUser({ name: inputName })
      .then(() => this.setState({ logged: true, isLoading: false }));
  }

  handleInputChange({ target: { value } }) {
    const TRES = 3;
    this.setState({ inputName: value }, () => {
      this.setState({ isDisabled: value.length < TRES });
    });
  }

  render() {
    const { isDisabled, inputName, isLoading, logged } = this.state;
    const renderForm = (
      <form>
        <img src={ Logo } alt="logo trybe tunes" />
        <input
          data-testid="login-name-input"
          type="text"
          name="inputName"
          id="login-name-input"
          placeholder="Name"
          onChange={ this.handleInputChange }
          value={ inputName }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ this.handleClickButton }
          value={ inputName }
        >
          Entrar
        </button>
      </form>);
    return (
      <div data-testid="page-login">
        { isLoading ? <Loading /> : renderForm }
        { logged && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
