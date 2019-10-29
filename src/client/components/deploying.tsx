import * as React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const Deploying = () => {
  // Material-UI uses "CSS in JS" styling
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { // currently not being used - maybe delete later
      display: 'flex',
      // flexGrow: 1
    },
    text: {
      align: 'center',
      margin: '0 0 50px 0', // will adjust later
    }
  }),
  );

  const classes = useStyles();
  
  return (
    <div id="uploadDiv">
      <div className='gcpImageContainer'>
        <img className='kubLogo' src={'https://i.gifer.com/4P4X.gif'}/>
        <div className="landingTitle">
        <Typography className={classes.text} variant="h3">KuberOptic</Typography>
        <Typography className={classes.text} variant="h6">deploying/fetching...</Typography>
          {/* <h3 className='title'></h3> */}
          {/* <h6 className='text'>deploying/fetching...</h6> */}
        </div>
      </div>
    </div>
  )
}

export default Deploying;