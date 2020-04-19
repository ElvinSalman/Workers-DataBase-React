import React from 'react'
import PropTypes from 'prop-types';
import "./Navbar.css"

import posed from 'react-pose';

import HamburgerMenu from 'react-hamburger-menu'
import {Link} from 'react-router-dom';


const Animation = posed.div({
    closed: { height: 0 },
    open: { height: 'auto' }
})

class Navbar extends React.Component{
   state={
       open:false,
   }

    //for hamburger
    handleClick() {
        this.setState({
            open: !this.state.open,
        });
    }

    render(){
        const {title} = this.props;
        const {open} = this.state
    return (
        <nav className='navbar-nav navbar navbar-expand-lg navbar-darg bg-dark mb-3 p-3'>
            <Link to='/' className='navbar-brand'>{title}</Link>

            <span  className='span-ham'>
            <HamburgerMenu
            className='ham'
            isOpen={this.state.open}
            menuClicked={this.handleClick.bind(this)}
            width={35}
            height={25}
            strokeWidth={3}
            rotate={0}
            color='white'
            borderRadius={0}
            animationDuration={0.5}
            />
            </span>
            <Animation className="animation ml-auto" pose={open? 'open' : 'closed'}>
            <ul className='navbar-nav ml-auto ul'>       
                <li className='nav-item active'> 
                    <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li className='nav-item active'> 
                    <Link to='/add' className='nav-link'>Add User</Link>
                </li>
                <li className='nav-item active'> 
                    <Link to='/github' className='nav-link'>Project Files</Link>
                </li>
            </ul>
            </Animation>
        </nav>
    )}
}

Navbar.propTypes={
    title:PropTypes.string.isRequired
}

Navbar.defaultProps={
    title:'App'
}
export default Navbar;