import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ShareModal from './ShareModal';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    maxWidth: 'auto',
    height: 150,
    maxHeight: 'auto',
  },
  title: {
    fontSize: '19px',
    [theme.breakpoints.up('lg')]: {
      fontSize: '27px',
      paddingBottom: theme.spacing(1),
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '5px 25px 5px'
  },
  cover: {
    width: '150px',
    maxWidth: '150x',
    maxHeight: '150px',
  },
  controls: {
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  controlsMobile: {
    marginLeft: 'auto'
  },
  image: {
    // margin: '30px 0px 0px 16px',
  },
  rootMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
    maxWidth: 'auto',
  }
}));

function NewsCard(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const { article, isAuthenticated } = props;
  const dateTime = article.publishedAt.split('T').join(' ');
  const [open, setOpen] = useState(false);

  const titleFunc = (title) => {
    if (title && title.length !== 0) {
      let splitedString = title.split(' - ')[0];
      if (splitedString.length > 54)
        splitedString = splitedString.substring(0, 54) + '...';

      return splitedString;
    }
    return '';
  }

  const handleClickOpen = () => {
    if (isAuthenticated) {
      setOpen(true);
    } else {
      toast.info("Please Login");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const desktopView = (
    <Card raised className={classes.root} >
      <CardMedia
        style={{ margin: '20px 0px 0px 16px', height: '110px', width: '145px' }}
        component="img"
        className={classes.cover}
        image={article.urlToImage || "https://www.brijeshdalmia.com/wp-content/uploads/2018/03/NEWS.png"}
        title={`Photo By ${article.author || article.source.name}`}
        onError={(e) => {
          e.target.src = "https://www.brijeshdalmia.com/wp-content/uploads/2018/03/NEWS.png";
          e.target.onerror = null;
        }}
      />
      <CardContent className={classes.content}>
        <Typography title={article.description || article.title} className={classes.title} component="h3" variant="h3">
          {titleFunc(article.title)}
          <IconButton aria-label="open in new">
            <Link href={article.url} color="inherit" underline="none" target="_blank">
              <OpenInNewIcon />
            </Link>
          </IconButton>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <Link href={article.url.split('.com')[0] + '.com'} target="_blank">
            {article.source.name}
          </Link>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <TimeAgo
            datetime={dateTime}
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing={true}>
        <IconButton onClick={handleClickOpen} className={classes.controls} aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card >
  );

  const mobileView = (
    <Card raised className={classes.rootMobile}>
      <CardActionArea>
        <Link href={article.url} color="inherit" underline="none" target="_blank">
          <CardMedia
            component="img"
            height="140"
            image={article.urlToImage || "https://www.brijeshdalmia.com/wp-content/uploads/2018/03/NEWS.png"}
            title={article.author}
            onError={(e) => {
              e.target.src = "https://www.brijeshdalmia.com/wp-content/uploads/2018/03/NEWS.png";
              e.target.onerror = null;
            }}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <Link href={article.url} color="inherit" underline="none" target="_blank">
              {titleFunc(article.title)}
            </Link>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <Link href={article.url.split('.com')[0] + '.com'} target="_blank">
              {article.source.name}
            </Link>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <TimeAgo
              datetime={dateTime}
            />
          </Typography>
        </CardContent>
        <CardActions style={{ paddingTop: '0', margin: '0' }}>
          <IconButton onClick={handleClickOpen} edge='end' className={classes.controlsMobile} component="span" aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </CardActionArea>

    </Card>
  );

  return (
    <>
      {desktopView}
      {mobileView}
      {open && <ShareModal open={open} title={article.title} handleClose={handleClose} url={article.url} />}
    </>
  );
}

export default NewsCard;