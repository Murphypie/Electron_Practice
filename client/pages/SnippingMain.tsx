import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/SnippingMain.css';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const SplashPage = () => {
  const history = useHistory();

  return (
    <div className='snippingmaincontainer'>
      <CameraAltIcon 
      color="primary"
      style = {{fontSize:50}}
      ></CameraAltIcon>
    </div>
  );
};

export default SplashPage;
