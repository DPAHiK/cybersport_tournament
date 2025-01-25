import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  changePassword, myProfile, setError } from '../redux/actions/authActions.js';
import Error from './Error.js'

const MyProfile = () => {

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  const dispatch = useDispatch();
  const errorBody = useSelector(state => state.error.body);
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

    const handleSubmit = (e) => {
      e.preventDefault();

      if(newPassword != newPasswordConfirm){
        dispatch(setError({data: {error: "Passwords are not same"}})); 
        return
      } 

      dispatch(changePassword({oldPassword: oldPassword, newPassword: newPassword}))

      setOldPassword('')
      setNewPassword('')
      setNewPasswordConfirm('')
      setShowPasswordForm(false);
    };

    const handleCancel = () => {
  
        setShowPasswordForm(false);
        dispatch(setError(null));
        setOldPassword('')
        setNewPassword('')
        setNewPasswordConfirm('')
      };


  if(user) return (
  <div className="container py-5 h-100">
    <Error body={errorBody}/>
    <h2>{user.name}</h2>
    { !showPasswordForm &&
        <button onClick={() => setShowPasswordForm(true)} className="btn btn-outline-dark btn-lg px-3 m-2">Change password</button>
    }
    { showPasswordForm &&
      <form onSubmit={handleSubmit} style={{fontSize: '1.25em'}}>
      
      <div data-mdb-input-init className="form-outline form-white mb-4">
        <label className="form-label" htmlFor="oldPassword">Old Password</label>
        <input
        id="oldPassword"
        type="text"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Old Password"
        className='form-control form-control-lg'
        required
        />
      </div>

      <div data-mdb-input-init className="form-outline form-white mb-4">
        <label className="form-label" htmlFor="newPassword">New Password</label>
        <input
        id="newPassword"
        type="text"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
        className='form-control form-control-lg'
        required
        />
      </div>

      <div data-mdb-input-init className="form-outline form-white mb-4">
        <label className="form-label" htmlFor="newPasswordConfirm">Confirm new password</label>
        <input
        id="newPasswordConfirm"
        type="text"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
        placeholder="Confirm new password"
        className='form-control form-control-lg'
        required
        />
      </div>
      
      <button className="btn btn-outline-dark btn-lg px-3 m-2" 
      onClick={() => {handleCancel() }} >
        Cancel
      </button>

      <button className="btn btn-outline-dark btn-lg px-3 m-2" type="submit">Confirm</button>      
      </form>
    }
  </div>
  )

};

export default MyProfile;
