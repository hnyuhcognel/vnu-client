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
        {/* <NavbarBrand href='/'>aaaaaaaaaaaaa</NavbarBrand> */}
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className='me-auto' navbar></Nav>
          {/* <Input id='area' name='area' type='select' bsSize='sm'>
            <option selected>Tất cả miền</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          <Input id='city' name='city' type='select' bsSize='sm'>
            <option selected>Tất cả tỉnh</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          <Input id='group' name='group' type='select' bsSize='sm'>
            <option selected>Tất cả nhóm</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          <Input bsSize='sm' id='school' name='school' placeholder='Tên trường...' /> */}
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
            placeholder='Bán kính cần đo (KM)'
            onInput={(e) => handleSetInputValue(e.target.value)}
          />
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarComponent
