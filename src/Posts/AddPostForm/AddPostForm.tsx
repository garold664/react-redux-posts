import React, { useState } from 'react';
import { addNewPost } from '../../store/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

import styles from './AddPostForm.module.scss';
import { RootState } from '../../store/store';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import { useMainContext } from '../../contexts/mainContext';

import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { nanoid } from 'nanoid';

const AddPostForm = () => {
  const dispatch = useDispatch();

  const { error, setError, closeErrorMsg } = useMainContext();
  const users = useSelector((state: RootState) => state.users);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);
  const onAuthorChanged = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(event.target.value);

  // const uploadFile = () => {
  //   if (imageUpload === null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name}_${nanoid()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     console.log('Uploaded a blob or file!');
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageLink(url);
  //     });
  //   });
  // };

  const uploadFile = async () => {
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}_${nanoid()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);

      console.log('Uploaded a blob or file!');
      const url = await getDownloadURL(snapshot.ref);
      return url;
    }
  };

  const onSavePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let imageLink;
    if (title && content) {
      try {
        setError('');
        imageLink = await uploadFile();
        await dispatch(
          addNewPost({ title, content, userId, imageLink }) as any
        ).unwrap();
        setContent('');
        setTitle('');
        setUserId('');
        setImageUpload(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
      }
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className={styles.post}>
      {error && <ErrorMsg errorText={error} closeError={closeErrorMsg} />}
      <h2 className={styles.title}>Add a New Post</h2>
      <form className={styles.form} onSubmit={onSavePost}>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author: </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="" key="0"></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content: </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <label htmlFor="fileUpload">upload the file</label>
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
        {imageUpload ? (
          <img
            className={styles.imagePreview}
            src={URL.createObjectURL(imageUpload)}
            alt=""
          />
        ) : (
          ''
        )}

        {/* <button type="button" onClick={uploadFile}>
          upload
        </button> */}
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
