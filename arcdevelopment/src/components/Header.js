import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import logo from '../assets/logo.svg'

const ElevationScroll = (props) => {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em'
  },
  logo: {
    height: '8em'
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px'
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px'
  }
}))

const Header = () => {
  const [tabValue, setTabValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const handleTabChange = (event, value) => {
    setTabValue(value)
    setOpen(true)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
    setOpen(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    if (window.location.pathname === '/' && tabValue !== 0) {
      setTabValue(0)
    } else if (window.location.pathname === '/services' && tabValue !== 1) {
      setTabValue(1)
    } else if (window.location.pathname === '/revolution' && tabValue !== 2) {
      setTabValue(2)
    } else if (window.location.pathname === '/about' && tabValue !== 3) {
      setTabValue(3)
    } else if (window.location.pathname === '/contact' && tabValue !== 4) {
      setTabValue(4)
    }
  },[tabValue])

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => setTabValue(0)}
            >
              <img className={classes.logo} alt="company logo" src={logo} />
            </Button>
            <Tabs 
              value={tabValue}
              onChange={handleTabChange}
              className={classes.tabContainer}
              indicatorColor="primary"
              >
              <Tab 
                component={Link} to="/"
                className={classes.tab}
                label="Home" />
              <Tab 
                onClick={(event) => handleClick(event)}
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? true : undefined}
                component={Link}
                to="/services"
                className={classes.tab}
                label="Services" />
              <Tab 
                component={Link}
                to="/revolution"
                className={classes.tab}
                label="The Revolution" />
              <Tab 
                component={Link}
                to="/about" className={classes.tab}
                label="About Us" />
              <Tab 
                component={Link}
                to="/contact"
                className={classes.tab}
                label="Contact Us" />
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>
              Free Estimate
            </Button>
            <Menu id="simple-menu"
            anchor={anchorEl}
            open={open}
            onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                Custom Software Development
              </MenuItem>
              <MenuItem onClick={handleClose}>
                Mobile App Development
              </MenuItem>
              <MenuItem onClick={handleClose}>
                Website Development
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}

export default Header