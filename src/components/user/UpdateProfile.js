import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, updateProfile, clearErrors } from '../../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/User-avatar.svg.png');


    const { user } = useSelector(state => state.auth);
    const { isUpdated, error, loading } = useSelector(state => state.user)


    useEffect(() => {
        if (user) {
            console.log(user)
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar[0].url);
        }
        if (isUpdated) {
            alert.success('User Updated Successfully');
            dispatch(loadUser());
            navigate('/Shopping/me')
            dispatch({
                type: UPDATE_PROFILE_RESET
            })

        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, loading, error, alert, user, isUpdated, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(avatar)

        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData));

    }
    const onChange = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])

    }

    return (
        <>
            <MetaData title={`Update Profile`} />
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                        <h1 class="mt-2 mb-5">Update Profile</h1>

                        <div class="form-group">
                            <label for="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                class="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label for="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                class="form-control"
                                name='email'
                                disabled
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}


                            />
                        </div>

                        <div class='form-group'>
                            <label for='avatar_upload'>Avatar</label>
                            <div class='d-flex align-items-center'>
                                <div>
                                    <figure class='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            class='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div class='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        class='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label class='custom-file-label' for='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false}>Update</button>
                    </form>
                </div>
            </div>

        </>

    )
}

export default UpdateProfile