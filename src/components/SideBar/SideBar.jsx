import React from 'react'
import PropTypes from 'prop-types'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css'

function SideBar(props) {
  return (
    <SideNav
      onSelect={(selected) => {
        // Add your code here
        console.log(selected)
      }}
      componentClass='div'
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected='home'>
        <NavItem eventKey='home'>
          <NavIcon>
            <FontAwesomeIcon icon={faHome} />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem eventKey='charts'>
          <NavIcon>
            <i className='fa fa-fw fa-line-chart' style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>Charts</NavText>
          <NavItem eventKey='charts/linechart'>
            <NavText>Line Chart</NavText>
          </NavItem>
          <NavItem eventKey='charts/barchart'>
            <NavText>Bar Chart</NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  )
}

SideBar.propTypes = {}

export default SideBar
