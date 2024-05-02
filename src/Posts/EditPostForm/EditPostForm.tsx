import React, { useState } from 'react';
import { Post, selectPostById, updatePost } from '../../store/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom';

import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import { RootState } from '../../store/store';

import styles from './EditPostForm.module.scss';
import { storage } from '../../firebase';
import { nanoid } from 'nanoid';
const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const uploadFile = async () => {
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}_${nanoid()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);

      console.log('Uploaded a blob or file!');
      const url = await getDownloadURL(snapshot.ref);
      return url;
    }
  };

  const deleteImage = () => {
    if (!imageLink) return;

    const desertRef = ref(storage, imageLink);

    deleteObject(desertRef)
      .then(() => {
        setImageLink('');
        console.log('successfully deleted the image');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const onSavePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && content && postId) {
      let newImageLink;
      if (imageUpload) {
        newImageLink = await uploadFile();
        dispatch(
          updatePost({
            id: postId,
            title,
            content,
            imageLink: newImageLink,
          }) as any
        );
      } else {
        dispatch(updatePost({ id: postId, title, content, imageLink }) as any);
      }
      navigate(`/posts/${postId}`);
    }
  };
  let element = (
    <article className={styles.post}>
      <h2 className={styles.title}>Edit Post</h2>
      <form className={styles.form} onSubmit={onSavePost}>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Post Content: </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        {imageLink ? (
          <img className={styles.imagePreview} src={imageLink} alt="" />
        ) : (
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
        )}
        {imageUpload ? (
          <img
            className={styles.imagePreview}
            src={URL.createObjectURL(imageUpload)}
            alt=""
          />
        ) : (
          ''
        )}
        ;
        <button type="button" onClick={deleteImage}>
          delete an image
        </button>
        <button type="submit">Save Post</button>
      </form>
    </article>
  );

  if (!post!.id) {
    element = (
      <article className={styles.post}>
        <h2>Post not found!</h2>
      </article>
    );
  }

  return <section className="container">{element}</section>;
};

export default EditPostForm;
