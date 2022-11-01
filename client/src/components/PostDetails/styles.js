import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  recMedia: {
    paddingTop: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    objectFit: 'contain',
  },
  recCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '200px',
    width: '200px',
    position: 'relative',
    marginRight: '15px',
  },
  recCardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  recOverlay: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    color: 'white',
  },
  recTitle: {
    padding: '0 16px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: {
    dispaly: 'flex', justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: "200px", overflowY: 'auto', marginRight: "30px",
  }
}));