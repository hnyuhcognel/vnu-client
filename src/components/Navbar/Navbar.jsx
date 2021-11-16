import React from 'react'
import ReactTooltip from 'react-tooltip'
import { Button, Collapse, Input, Nav, Navbar, NavbarToggler } from 'reactstrap'
import './styles.scss'

const NavbarComponent = (props) => {
  const { className, handleSetInputValue, handleFindByDistance, isFindByDistance } = props
  const inputRef = React.useRef(null)
  React.useEffect(() => {
    ReactTooltip.show(inputRef.current)
  }, [])

  return (
    <div>
      <Navbar color='dark' dark expand='md' className={className}>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className='me-auto' navbar></Nav>
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
          {isFindByDistance && (
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
          )}
          {!isFindByDistance && (
            <Button id='submit__button' onClick={handleFindByDistance}>
              Tìm trường theo bán kính
            </Button>
          )}
          {isFindByDistance && (
            <Button id='submit__button' onClick={handleFindByDistance}>
              Hủy
            </Button>
          )}
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarComponent
