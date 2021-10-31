import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Input,
  Label,
} from 'reactstrap'
import './styles.scss'

const NavbarComponent = (props) => {
  const { className, handleSetInputValue } = props
  return (
    <div>
      <Navbar color='dark' dark expand='md' className={className}>
        <NavbarBrand href='/'>Vietnamese's University</NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className='me-auto' navbar>
            {/* <NavItem>
              <NavLink href='/components/'>Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap'>GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
          <Input
            id='distance'
            bsSize='sm'
            type='number'
            placeholder='Nhập khoảng cách cần đo (KM)'
            onInput={(e) => handleSetInputValue(e.target.value)}
          />
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarComponent
