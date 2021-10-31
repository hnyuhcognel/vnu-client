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
import ReactTooltip from 'react-tooltip'

const NavbarComponent = (props) => {
  const { className, handleSetInputValue } = props
  const inputRef = React.useRef(null)
  React.useEffect(() => {
    ReactTooltip.show(inputRef.current)
  }, [])

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
          <ReactTooltip
            id='distance required'
            effect='solid'
            place='left'
            type='light'
            // backgroundColor='#fff'
            textColor='#333'
            // borderColor='blue'
            offset={{ top: -15 }}
          >
            Nhập vào khoảng cách(KM), <br /> sau đó nhấn vào 1 điểm trên bảng đồ <br /> để tìm những
            trường gần đó <br /> trong bán kính bạn vừa nhập
          </ReactTooltip>
          <Input
            id='distance'
            name='distance'
            data-tip
            data-for='distance required'
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
