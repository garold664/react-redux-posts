import React, { useEffect, useState } from 'react';
import {
  Post,
  addNewPost,
  selectPostById,
  updatePost,
} from '../../store/posts/postsSlice.ts';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate, useLocation } from 'react-router-dom';

import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import { RootState } from '../../store/store.ts';

import styles from './PostForm.module.scss';
import { storage } from '../../firebase.ts';
import { nanoid } from 'nanoid';
import { Trash2, Upload } from 'lucide-react';
const PostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const users = useSelector((state: RootState) => state.users);

  let post:
    | Post
    | { title: string; content: string; id: string; imageLink?: string }
    | undefined = useSelector((state: RootState) =>
    selectPostById(state, postId!)
  );

  if (!post) {
    post = {
      title: '',
      content: '',
      id: '',
    };
  }

  const [title, setTitle] = useState(post!.title);
  const [content, setContent] = useState(post!.content);
  const [imageLink, setImageLink] = useState(post!.imageLink || '');
  const [userId, setUserId] = useState('');
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  useEffect(() => {
    if (pathname === '/newpost') {
      setTitle('');
      setContent('');
      setUserId('');
      setImageUpload(null);
      setImageLink('');
    }
  }, [pathname]);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const onAuthorChanged = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(event.target.value);

  const uploadFile = async () => {
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}_${nanoid()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);

      // console.log('Uploaded a blob or file!');
      const url = await getDownloadURL(snapshot.ref);
      return url;
    }
  };

  const deleteImage = () => {
    const desertRef = ref(storage, imageLink);
    if (imageLink) {
      deleteObject(desertRef)
        .then(() => {
          setImageLink('');
          console.log('successfully deleted the image');
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else if (imageUpload) {
      setImageUpload(null);
    }
  };

  const onSavePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && content && postId) {
      let newImageLink;
      if (imageUpload) {
        newImageLink = await uploadFile();
        if (postId) {
          dispatch(
            updatePost({
              id: postId,
              title,
              content,
              imageLink: newImageLink,
            }) as any
          );
        } else {
          await dispatch(
            addNewPost({ title, content, userId, imageLink }) as any
          ).unwrap();
        }
      } else {
        dispatch(updatePost({ id: postId, title, content, imageLink }) as any);
      }
      navigate(`/posts/${postId}`);
    }
  };

  let element = (
    <article className={styles.post}>
      <h2 className={styles.title}>
        {pathname === '/newpost' ? 'New Post' : 'Edit Post'}
      </h2>
      <form className={styles.form} onSubmit={onSavePost}>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        {pathname === '/newpost' && (
          <>
            <label htmlFor="postAuthor">Author: </label>
            <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
              <option value="" key="0"></option>
              {userOptions}
            </select>
          </>
        )}
        <label htmlFor="postContent">Post Content: </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        {imageLink && (
          <div className={styles.imagePreviewContainer}>
            <img className={styles.imagePreview} src={imageLink} alt="" />
            <button
              className={styles.deleteButton}
              type="button"
              onClick={deleteImage}
            >
              <Trash2 />
            </button>
          </div>
        )}

        {imageUpload ? (
          <div className={styles.imagePreviewContainer}>
            <img
              className={styles.imagePreview}
              src={URL.createObjectURL(imageUpload)}
              alt=""
            />

            <button
              className={styles.deleteButton}
              type="button"
              onClick={deleteImage}
            >
              <Trash2 />
            </button>
          </div>
        ) : (
          ''
        )}

        {!imageLink && !imageUpload && (
          <>
            <label className={styles.fileUpload} htmlFor="fileUpload">
              <span>
                {' '}
                <Upload className={styles.uploadIcon} /> upload the file
              </span>
              <input
                type="file"
                id="fileUpload"
                name="fileUpload"
                accept="image/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setImageUpload(event.target.files[0]);
                  }
                }}
              />
            </label>
          </>
        )}
        <button type="submit">Save Post</button>
      </form>
    </article>
  );

  if (!post!.id && pathname !== '/newpost') {
    element = (
      <article className={styles.post}>
        <h2>Post not found!</h2>
      </article>
    );
  }

  return <section className="container">{element}</section>;
};

export default PostForm;
