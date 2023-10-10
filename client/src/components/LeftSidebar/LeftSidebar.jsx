import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Globe from  '../../assets/Globe.svg'

const LeftSidebar = () => {
    const loggedInUser=useSelector(state=>state.currentUserReducer)
    return (
        <div className='left-sidebar'>
            <nav className='side-nav'>
                <NavLink to='/' className='side-nav-links' activeclassname='active'>
                    <p>Home</p>
                </NavLink>
                <div className='side-nav-div'>
                    <div><p>PUBLIC</p></div>
                    <NavLink to='/Questions' className='side-nav-links' activeclassname='active'>
                        <img src={Globe} alt="Globe" />
                        <p style={{paddingLeft: "10px"}}> Questions </p>
                    </NavLink>
                    <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft: "40px"}}>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{paddingLeft: "40px"}}>
                        <p>Users</p>
                    </NavLink>
                    {loggedInUser && <NavLink to='/loginhistory' className='side-nav-links' activeclassname='active' style={{paddingLeft: "40px"}}>
                        <p>Login History</p>
                    </NavLink>}
                    
                </div>
            </nav>
        </div>
    )
}

export default LeftSidebar