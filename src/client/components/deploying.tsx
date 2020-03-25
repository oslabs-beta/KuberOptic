import * as React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

//page renders and displays following a request to Fetch or Deploy

const Deploying = () => {
  // Material-UI uses "CSS in JS" styling
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      text: {
        align: 'center',
        margin: '0 0 50px 0',
      },
    }),
  );

  const classes = useStyles();

  return (
    <div id="uploadDiv">
      <div className="gcpImageContainer">
        <img className="kubLogo" src={'https://i.gifer.com/4P4X.gif'} />
        <div className="landingTitle">
          <Typography className={classes.text} variant="h3">
            KuberOptic
          </Typography>
          <Typography className={classes.text} variant="h6">
            talking with the cloud...
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Deploying;
