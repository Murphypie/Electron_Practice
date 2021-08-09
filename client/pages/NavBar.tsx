import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Menu,
  Theme,
  ThemeOptions,
  Typography,
  Toolbar,
  Button,
  IconButton,
  AppBar,
  MenuItem,
  Grid,
  Container,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import '../css/NavBar.css';

interface IState {
  prevState: null;
}

const useStyles = makeStyles((theme?: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#E7ECEF',
    color: '#274C77',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: ['Sacramento', 'cursive'].join(','),
    margin: '20px',
  },
}));

const SplashPage = () => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const classes = useStyles();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    //console.log(event.currentTarget.type) // This showed that this was a button which means event.currentTarget is a button. So React.useState<HTMLButtonElement | null>
    //console.log(event.currentTarget) identifies the current target for the event, as the event traverses the DOM.
    // It always refers to the element to which the event handler has been attached,
    // as opposed to Event.target, which identifies the element on which the event occurred and which may be its descendant.
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSnipClick = async () => {
    const { desktopCapturer, remote, shell } = window.require('electron');
    const screen = remote.screen;
    const path = window.require('path');
    const os = window.require('os');
    const fs = window.require('fs')
    const win = remote.getCurrentWindow();
    const windowRect = win.getBounds();

    win.hide();

    try {
      const screenSize = screen.getPrimaryDisplay().workAreaSize;
      const maxDimension = Math.max(screenSize.width, screenSize.height);
      const sources = await desktopCapturer.getSources({ 
        types: ['screen'],
        thumbnailSize:{
          width: maxDimension * window.devicePixelRatio,
          height: maxDimension * window.devicePixelRatio
        } 
      });

      //for (const source of sources) {
        //console.log(source);
        //   console.log(source.name)
        //   console.log(typeof source.name)
      //}
      
      const entireScreenSource = sources.find(
        (source: any) => source.name === 'Entire Screen' || source.name === "Screen 1"
      );
      if (entireScreenSource) {
        //console.log(entireScreenSource);
        const outputPath = path.join(os.tmpdir(), 'screenshot.png');
        const image = entireScreenSource.thumbnail.resize({
          width: screenSize.width,
          height: screenSize.height
        })
        .crop(windowRect)
        .toPNG();

        fs.writeFile(outputPath, image, (err: string | null | undefined) => {
          win.show();
          
          if(err) return console.error(err);
          shell.openExternal(`file://${outputPath}`);
        })
      }else{
        window.alert('Screen source not found')
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className='navbar'>
      <div >
        <AppBar position='static' className={classes.root}>
          <Toolbar>
            <Grid container spacing={2} alignItems='center' className = 'navbar-grid'>
              <Grid item xs={1} justifyContent='center'>
                <Button
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <MenuIcon />
                </Button>

                <Menu
                  id='simple-menu'
                  classes={{ paper: classes.root }}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  keepMounted
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => history.push('/snipping')}>
                    Snipping Tools
                  </MenuItem>
                </Menu>
              </Grid>

              <Grid item xs={1}>
                <SettingsIcon></SettingsIcon>
                <Typography display='inline'>Settings</Typography>
              </Grid>

              <Grid item xs={1}>
                <HelpIcon></HelpIcon>
                <Typography display='inline'>Help</Typography>
              </Grid>

              <Grid item xs={2}>
                <CameraAltIcon onClick={onSnipClick}></CameraAltIcon>
                <Typography display='inline'>Take a snapshot</Typography>
              </Grid>

              <Grid item xs={6}></Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </Container>
  );
};

export default SplashPage;
