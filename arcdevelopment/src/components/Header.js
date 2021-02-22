import React, { useState, useEffect, useMemo } from 'react'
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
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

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
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em'
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    }
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
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px'

  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIconContainer: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
    marginLeft: 'auto'
  },
  drawerIcon: {
    height: '3rem',
    width: '3rem'
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    opacity: 1
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
  }
}))

const Header = ({ tabValue, setTabValue, selectedIndex, setSelectedIndex}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDrawer, setOpenDrawer] = useState(false)
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const handleTabChange = (_event, value) => {
    setTabValue(value)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpenMenu(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null)
    setOpenMenu(false)
    setSelectedIndex(index)
  }

  const menuOptions = useMemo(() => [
    {name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0},
    {name: 'Custom Software Development', link: '/customsoftware', activeIndex: 1, selectedIndex: 1},
    {name: 'Mobile App Development', link: '/mobileapps', activeIndex: 1, selectedIndex: 2} , 
    {name: 'Website Development', link: '/websites', activeIndex: 1, selectedIndex: 3}
  ], [])

  const routes = useMemo(() => [
    {name: 'Home', link: '/', activeIndex: 0},
    {name: 
      'Services',
      link: '/services',
      activeIndex: 1,
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaHasPopup: anchorEl ? true : undefined,
      onMouseOver: event => handleClick(event)
    },
    {name: 'The Revolution', link: '/revolution', activeIndex: 2},
    {name: 'About Us', link: '/about', activeIndex: 3},
    {name: 'Contact Us', link: '/contact', activeIndex: 4},
  ], [anchorEl])

  useEffect(() => {

    [...menuOptions, ...routes].forEach(route => {
      switch(window.location.pathname) {
        case `${route.link}`:
          if (tabValue !== route.activeIndex) {
            setTabValue(route.activeIndex)
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex)
            }
          }
          break
        default:
          break
      }
    })
  },[tabValue, menuOptions, selectedIndex, routes, setTabValue, setSelectedIndex])

  const tabs = (
    <React.Fragment>
      <Tabs 
        value={tabValue}
        onChange={handleTabChange}
        className={classes.tabContainer}
        indicatorColor="primary"
        >
          {routes.map((route, index) => (
            <Tab
              key={`${route.name}${index}`}
              className={classes.tab}
              component={Link}
              to={route.link}
              label={route.name}
              aria-owns={route.ariaOwns}
              aria-haspopup={route.ariaHasPopup}
              onMouseOver={route.onMouseOver}
            />
          ))}
      </Tabs>
      <Button onClick={() => setTabValue(false)} component={Link} to="/estimate" variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      classes={{paper: classes.menu}}
      open={openMenu}
      onClose={handleClose}
      MenuListProps={{ onMouseLeave: handleClose }}
      elevation={0}
      keepMounted
      style={{zIndex: 1302}}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={`${option}${index}`}
            component={Link}
            to={option.link}
            classes={{root: classes.menuItem}}
            onClick={(event) => {
              handleMenuItemClick(event, index); 
              setTabValue(1);
              handleClose()}}
            selected={index === selectedIndex && tabValue === 1}
            >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer}}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map(route => (
            <ListItem
              key={`${route.name}${route.activeIndex}`}
              selected={tabValue === route.activeIndex}
              divider
              button
              component={Link}
              to={route.link}
              onClick={() => {
                setOpenDrawer(false)
                setTabValue(route.activeIndex)
              }}>
              <ListItemText
              className={
                tabValue === route.activeIndex
                ? [classes.drawerItem, classes.drawerItemSelected].join(' ')
                : classes.drawerItem}
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            onClick={() => {
              setOpenDrawer(false)
              setTabValue(false)
            }}
            divider
            button
            component={Link}
            to="/estimate"
            className={classes.drawerItemEstimate}
            selected={tabValue === false}
          >
            <ListItemText
              disableTypography
              className={
                tabValue === false
                ? [classes.drawerItem, classes.drawerItemSelected].join(' ')
                : classes.drawerItem}
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appbar}>
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
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}

export default Header