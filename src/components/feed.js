import React, { useState, useEffect } from 'react';
import '../css/feed.css';
import MessageSender from './messageSender';
import Post from './post';
import StoryReel from './storyReel';
import { db } from '../files/firebase';


function Feed() {
    const [posts, setposts] = useState([]);
    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setposts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        });
    }, []);

    return <div className='feed'>
        <StoryReel />
        <MessageSender />

        {posts.map((post) => {
            return <Post key={post.data.id} profilePic={post.data.profilePic}
                message={post.data.message} timestamp={post.data.timestamp}
                username={post.data.username} image={post.data.image} id={post.data.id} />
        })}
    </div>;
}

export default Feed;
