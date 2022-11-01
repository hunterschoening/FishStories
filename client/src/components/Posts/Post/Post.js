import React from 'react';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const openPost = () => history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?._id === post?.creator || user?.result?.sub === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button 
                            component="span"
                            style={{color: 'white'}} 
                            size='small' 
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id);
                                }}>
                            <MoreHorizIcon fontSize='medium'/>
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography noWrap variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))} disabled={!user?.result}><ThumbUpAltIcon fontSize='small'/> Like {post.likes.length}</Button>
                {(user?.result?._id === post?.creator || user?.result?.sub === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon/> Delete</Button>
                )}
            </CardActions>
        </Card>
    )
};

export default Post;