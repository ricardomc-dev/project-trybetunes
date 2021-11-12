import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
