import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './navbar.scss';
import { logout } from './../../actions/userActions';
class NavBar extends React.Component {
  state = { showDropDown: false };

  onClickLogout = () => {
    this.props.logout();
  };
  onClickDropdown = () => {
    this.setState({ showDropDown: !this.state.showDropDown });
  };
  render() {
    return (
      <nav className='nav-bar '>
        <div className='cart-button'>
          <Link to='/' className='item'>
            <img alt='logo' src={require('./app.svg')} />
          </Link>
        </div>

        <ul className='nav-bar-items-list '>
          <li className='dropdown'>
            <img
              onClick={this.onClickDropdown}
              className='avatar'
              src='https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg'
              alt=''
            />
            <div className={`dropdown-menu  ${this.state.showDropDown ? 'animated' : 'hidden'}`}>
              <div className='dropdpwn-image'>
                <img
                  className='avatar dropdown-avatar'
                  src='https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg'
                  alt=''
                />
              </div>
              <div className='dropdown-items'>
                <div className='dropdown-item'>George Bluth</div>
                <div className='dropdown-divider'></div>
                <div className='dropdown-item' onClick={this.onClickLogout}>
                  Log out
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, { logout })(NavBar);
