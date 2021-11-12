import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      isLoading: false,
    };
    this.getApiInfo = this.getApiInfo.bind(this);
  }

  componentDidMount() {
    this.getApiInfo();
  }

  getApiInfo() {
    this.setState({ isLoading: true });
    getUser()
      .then((response) => this.setState({ loginName: response.name },
        () => this.setState({ isLoading: false })));
  }

  render() {
    const { loginName, isLoading } = this.state;
    const renderName = <p data-testid="header-user-name">{ loginName }</p>;
    return (
      <header data-testid="header-component">
        { isLoading ? <Loading /> : renderName }
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
