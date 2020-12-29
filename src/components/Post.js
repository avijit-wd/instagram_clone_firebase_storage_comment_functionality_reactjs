import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import firebase from "firebase";
import { db } from "../firebase";
const Post = ({ postId, imageURL, user, username, caption, timestamp }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
      return () => {
        unsubscribe();
      };
    }
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    if (comment && user) {
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
          alt="Avijit Biswas"
        />
        <div className="post__info">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>

      <img className="post__image" src={imageURL} alt="" />
      {caption && (
        <h4 className="post__text">
          {" "}
          <strong>{username}</strong> : {caption}
        </h4>
      )}

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      <form className="post__commentBox">
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="post__input"
        />
        <button
          disabled={!comment && !user}
          className="post__button"
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
