import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import TimeAgo from 'timeago-react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '150px',
    maxWidth: '150x',
    maxHeight: '150px',
  },
  controls: {
    marginTop: 'auto',
    // marginLeft: 'auto',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  image: {
    margin: '16px 0px 0px 16px',
  },
  rootMobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
    maxWidth: 345,
  }
}));

function NewsCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { article } = props;
  const dateTime = article.publishedAt.split('T').join(' ');
  const titleFunc = (title) => {
    if (title && title.length !== 0) {
      let splitedString = title.split(' - ')[0];
      if (splitedString.length > 60)
        splitedString = splitedString.substring(0, 60) + '...';

      return splitedString;
    }
    return '';
  }

  const desktopView = (
    <Card className={classes.root} >
      <div className={classes.image}>
        <Link href={article.url} color="inherit" underline="none" target="_blank">
          <CardMedia
            component="img"
            className={classes.cover}
            image={article.urlToImage}
            title={article.author}
          />
        </Link>
      </div>
      {/* <div className={classes.details}> */}
      <CardContent className={classes.content}>
        <Link href={article.url} color="inherit" underline="none" target="_blank">
          <Typography component="h6" variant="h6">
            {titleFunc(article.title)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {article.source.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <TimeAgo
              datetime={dateTime}
            />
          </Typography>
        </Link>
      </CardContent>
      <CardActions disableSpacing={true}>
        <IconButton className={classes.controls} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton className={classes.controls} aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      {/* </div> */}
    </Card>
  );

  const mobileView = (
    <Card className={classes.rootMobile}>
      <CardActionArea>
        <Link href={article.url} color="inherit" underline="none" target="_blank">
          <CardMedia
            component="img"
            height="140"
            image={article.urlToImage}
            title={article.author}
          />
          <CardContent>
            <Typography style={{ fontSize: '15px' }} gutterBottom variant="h6" component="h6">
              {titleFunc(article.title)}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {article.source.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <TimeAgo
                datetime={dateTime}
              />
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      {/* <CardActions>
          <Button size="small" color="primary">
            Share
        </Button>
          <Button size="small" color="primary">
            Learn More
        </Button>
        </CardActions> */}
    </Card>
  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
}

export default NewsCard;