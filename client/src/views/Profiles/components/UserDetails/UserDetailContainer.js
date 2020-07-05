import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  detailWrapper: {
    marginTop: 20,
  },
  header: { borderBottom: '1px solid #E4E4E4' },
  title: { color: '#344356', fontWeight: 500, letterSpacing: '.7px' },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },

  detailText: { paddingBottom: 10 },
  pos: {
    marginBottom: 12,
  },
});

const UserDetailContainer = ({ profile }) => {
  console.log('profile', profile);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Fade in={true} timeout={600}>
      <Card className={classes.detailWrapper} variant='outlined'>
        <CardHeader
          className={classes.header}
          title='My Details'
          // subheader="September 14, 2016"
        />
        <CardContent>
          <div className={classes.sectionContainer}>
            <p className={classes.title}>About</p>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.detailText}>
              {profile && profile.about}
            </Typography>
            <Divider />
          </div>

          {/* <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant='h5' component='h2'>
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            adjective
          </Typography>
          <Typography variant='body2' component='p'>
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>*/}
        </CardContent>
        <CardActions>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
    </Fade>
  );
};

export default UserDetailContainer;
