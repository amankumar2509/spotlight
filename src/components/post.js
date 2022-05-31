import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import '../css/post.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comment from './comment';
import { db } from '../files/firebase';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';

function Post({ profilePic, image, username, timestamp, message, id }) {
    const [seen, setseen] = useState(false);
    const [posts, setposts] = useState([]);
    const [like, setlike] = useState(true);
    useEffect(() => {
        db.collection("likedposts").where("id", "==", id).onSnapshot(snapshot => {
            setposts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        });
    }, []);

    //console.log(posts[0].data.state);
    const likeFunction = () => {
        setlike(!like);
        if (like == true) {
            db.collection("likedposts").doc(id).update('count', posts[0].data.count + 1);
        } else {
            if (posts[0].data.count == 0) {
                return
            } else {
                db.collection("likedposts").doc(id).update('count', posts[0].data.count - 1);
            }


        }
    }

    return <div className='post'>
        <div className='post__top'>
            <Avatar src={profilePic} className='post__avatar' />
            <div className='post__topInfo'>
                <h3>{username}</h3>
                <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
            </div>
        </div>
        <div className='post__bottom'>
            <p>{message}</p>
        </div>
        <div className='post__img'>
            <img src={image} alt="" />
        </div>
        <div className='post__options'>

            {
                posts.map((data, index) => {
                    return <div key={index} className='post__option'><ThumbUpIcon onClick={likeFunction} style={like == false ? { color: "#2e81f4" } : { color: "gray" }} />

                        <p>{data.data.count} Like</p> </div>
                })
            }

            <div className='post__option'>
                <ChatBubbleOutlineIcon onClick={() => setseen(!seen)} />
                <p>Comment</p>
            </div>

            <div className='post__option'>
                <WhatsappShareButton url={image} quote={message}>
                    <NearMeIcon />
                </WhatsappShareButton>
                <p>Share</p>
            </div>
            <div className='post__options'>
                <AccountCircleIcon />
                <ExpandMoreIcon />
            </div>
        </div>
        {seen ? <Comment id={id} message={message} username={username} /> : null}
    </div>;
}

export default Post;
