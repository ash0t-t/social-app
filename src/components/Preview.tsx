import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getPost, handleComment } from "../helpers/api";
import { BASE, DEF } from "../helpers/default";
import { useEffect, useState } from "react";
import { IPost } from "../helpers/types";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};

interface IProps {
  isOpen: boolean;
  close: () => void;
  post: number;
}

export function Preview({ isOpen, close, post }: IProps) {
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);
  const [commentText, setCommentText] = useState<string>("");

  useEffect(() => {
    if (isOpen && post) {
      getPost(post).then((response) => {
        setCurrentPost(response.payload);
      });
    }
  }, [isOpen, post]);

  const writeComment = () => {
    if (commentText.trim() !== "" && currentPost) {
      handleComment(currentPost.id, { text: commentText }).then((response) => {
        setCommentText("");
        setCurrentPost((post) => {
          if (post) {
            return {
              ...post,
              comments: [...post.comments, response.payload],
            };
          }
          return post;
        });
      });
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {currentPost ? (
          <>
            <div style={{ flex: 1, marginRight: "16px" }}>
              <img
                src={BASE + currentPost.picture}
                alt="Post"
                style={{ width: "400px", height: "400px", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div>
                <strong>{currentPost.likes.length} likes</strong>,{" "}
                <strong>{currentPost.comments.length} comments</strong>
              </div>

              <p>
                <strong>Likes:</strong>
              </p>
              <div
                style={{
                  maxHeight: "120px",
                  overflowY: "auto",
                  marginBottom: "8px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                {currentPost.likes.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <img
                      src={user.picture ? BASE + user.picture : DEF}
                      alt={`${user.name} ${user.surname}`}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                    <Link to={`/profile/${user.id}`} onClick={close}>
                      {user.name} {user.surname}
                    </Link>
                  </div>
                ))}
              </div>
              <p>
                <strong>Comments:</strong>
              </p>
              <div
                style={{
                  maxHeight: "120px",
                  overflowY: "auto",
                  marginBottom: "8px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                {currentPost.comments.map((comment) => (
                  <div key={comment.id} style={{ marginBottom: "8px" }}>
                    <strong>{comment.user.name} says:</strong>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
              <br></br>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What do you think?"
                style={{ width: "100%", padding: "8px", marginTop: "8px" }}
              />
              <button
                onClick={writeComment}
                style={{ marginTop: "8px", width: "100%" }}
              >
                Comment
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Modal>
  );
}
