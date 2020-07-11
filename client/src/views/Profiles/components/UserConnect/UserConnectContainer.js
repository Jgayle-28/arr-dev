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
import Avatar from '@material-ui/core/Avatar';
import { FaMobileAlt } from 'react-icons/fa';
import { IoLogoWhatsapp, IoIosMail, IoLogoYoutube } from 'react-icons/io';

const useStyles = makeStyles({
  detailWrapper: {
    marginTop: 20,
  },
  header: { borderBottom: '1px solid #E4E4E4' },
  sectionWrapper: {
    width: '47%',
    margin: '0 10px 10px',
  },
  sectionContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px 10px',
  },
  sectionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: '#3E3F42', //8E9CB7
  },
  title: { color: '#3E3F42', fontWeight: 500, letterSpacing: '.7px' },
  iconWrapper: {
    backgroundColor: '#fff',
    border: '1px solid #BCBDC1',
    height: 30,
    width: 30,
    marginRight: 8,
  },
  titleIcon: {
    // marginRight: 8 ,
    color: '#BCBDC1',
    fontSize: 18,
  },

  detailText: { paddingBottom: 10 },
  locationDetail: {
    marginRight: 8,
  },
  infoText: { color: '#848484', margin: 0, padding: 0 },
  connectWrapper: { display: 'flex', flexWrap: 'wrap' },
  // link: { color: '#848484',  '& hover': { color: '#1665D8' } },
});

const UserConnectContainer = ({ profile, user }) => {
  console.log('profile', profile);
  const classes = useStyles();

  return (
    <Fade in={true} timeout={600}>
      <Card className={classes.detailWrapper} variant='outlined'>
        <CardHeader
          className={classes.header}
          title='Connect'
          // subheader="September 14, 2016"
        />
        <CardContent className={classes.connectWrapper}>
          {/* PHONE NUMBER */}
          {profile && profile.phone && (
            <div className={classes.sectionWrapper}>
              <div className={classes.sectionContainer}>
                <Avatar className={classes.iconWrapper}>
                  <FaMobileAlt className={classes.titleIcon} />
                </Avatar>
                <p className={classes.infoText}>{profile.phone}</p>
              </div>
              <Divider />
            </div>
          )}
          {/* EMAIL */}
          {user && user.email && (
            <div className={classes.sectionWrapper}>
              <div className={classes.sectionContainer}>
                <Avatar className={classes.iconWrapper}>
                  <IoIosMail className={classes.titleIcon} />
                </Avatar>
                <a
                  target='_blank'
                  href={`mailto:${user.email}`}
                  className={classes.infoText}>
                  {user.email}
                </a>
              </div>
              <Divider />
            </div>
          )}
          {/* WHATS APP */}
          {profile && profile.whatsApp && (
            <div className={classes.sectionWrapper}>
              <div className={classes.sectionContainer}>
                <Avatar className={classes.iconWrapper}>
                  <IoLogoWhatsapp className={classes.titleIcon} />
                </Avatar>
                <a href={`https://api.whatsapp.com/send?phone=50660333807`}>
                  {/* <a
                  href={`https://api.whatsapp.com/send?phone=${profile.whatsApp}`}> */}
                  {profile.whatsApp}
                </a>
                {/* <p className={classes.infoText}>{profile.whatsApp}</p> */}
              </div>
              {/* <Divider /> */}
            </div>
          )}
          {/* YOU TUBE */}
          {profile && profile.youTube && (
            <div className={classes.sectionWrapper}>
              <div className={classes.sectionContainer}>
                <Avatar className={classes.iconWrapper}>
                  <IoLogoYoutube className={classes.titleIcon} />
                </Avatar>
                <a target='_blank' href={profile.youTube}>
                  {profile.youTube}
                </a>
              </div>
              {/* <Divider /> */}
            </div>
          )}

          {/* <div className={classes.sectionContainer}>
            <div className={classes.sectionTitleWrapper}>
              <Avatar className={classes.iconWrapper}>
                <IoIosLink className={classes.titleIcon} />
              </Avatar>
              <p className={classes.title}>Connect</p>
            </div>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.detailText}>
              {profile && profile.phone}
            </Typography>
            <Divider />
          </div> */}

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
        {/*   <CardActions>
          <Button size='small'>Learn More</Button>
        </CardActions> */}
      </Card>
    </Fade>
  );
};

export default UserConnectContainer;
