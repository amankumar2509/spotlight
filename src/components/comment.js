import React, { useState, useEffect } from 'react';
import '../css/comment.css';
import ClearIcon from '@material-ui/icons/Clear';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../providers/stateProvider';
import { db } from '../files/firebase';

function Comment({ id, message, username }) {
    const [posts, setposts] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [Input, setInput] = useState('');
    const [seen, setseen] = useState(true);

    useEffect(() => {
        db.collection("comments").orderBy("timestamp", "desc").where("id", "==", id).onSnapshot(snapshot => {
            setposts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const d = new Date();
        let minutes = d.getMinutes();

        db.collection("comments").add({
            'id': id,
            'username': username,
            'message': message,
            'commentername': user.displayName,
            'commenterprofile': user.photoURL,
            'timestamp': minutes,
            'comment': Input
        })
        setInput("");
    }

    return <div className="modal">
        {seen ?
            <div className="modal_content">
                <form>
                    <ClearIcon className='clear__icon' style={{ float: "right" }} onClick={() => setseen(!seen)} />
                    <div className='user__detail'>
                        <Avatar src={user.photoURL} />
                        <p>{user.displayName}</p>
                    </div>
                </form>

                {
                    posts.map((data) => {
                        return <div className='comment' key={data.data.id}>
                            <div className='commenter__detail'>
                                <Avatar src={data.data.commenterprofile} />
                                <p>{data.data.commentername} &ensp; {data.data.comment}</p>

                            </div>
                            <div className='time__stamp'><p>{data.data.timestamp} minutes ago</p></div>
                        </div>
                    })
                }
                <form onSubmit={handleSubmit}>
                    <div className='enter__comment'>
                        <input type="text" value={Input} onChange={(e) => { setInput(e.target.value) }} placeholder='Enter Comment...' />
                        <button type='submit'>Hidden Submit</button>
                    </div>
                </form>

            </div> : null}
    </div>;
}

export default Comment;
