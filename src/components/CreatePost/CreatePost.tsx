import { UploadOutlined } from '@ant-design/icons';
import './CreatePost.css';
import { useRef, useState } from 'react';
import instance from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAndUpdate } from '../../store/slices/posts';
import { usersState } from '../../store/slices/users';

const CreatePost = () => {
  const [img, setImg] = useState('');
  const dispatch = useDispatch();

  const { currentUser }: usersState = useSelector((state: any) => state.users);
  const [isDisabled, setIsDisabled] = useState(true);

  const profImg = currentUser.user.avatarUrl;

  const inputRef: any = useRef('');

  const handleChangeInput = () => {
    if (inputRef.current.value.length > 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await instance.post('/upload', formData);
      setImg(`${data.url}`);
    } catch (err: any) {
      setImg('');
      alert(await err.response.data.message);
    }
  };
  const submitHandler = async (event: any) => {
    event.preventDefault();
    const postData = {
      text: event.target['post-text'].value,
      imageUrl: img,
    };
    dispatch(createPostAndUpdate(postData));
    event.target.reset();
    setImg('');
  };
  return (
    <form className="create-post" onSubmit={submitHandler}>
      <div className="post-info">
        <div className="profile-photo">
          <img src={profImg} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="What's on your mind?"
          name="post-text"
          onChange={handleChangeInput}
        />
        <label htmlFor="photo-upload" className="photo-upload">
          <UploadOutlined className="upload-icon" />
          <input
            name="photo-upload"
            id="photo-upload"
            type="file"
            onChange={handleChangeFile}
          />
        </label>
        <input
          type="submit"
          className="btn btn-primary"
          disabled={isDisabled}
        />
      </div>
      {img !== '' && (
        <div className="post-photo">
          <img src={img} onClick={() => setImg('')} />
        </div>
      )}
    </form>
  );
};

export default CreatePost;
