import React from 'react';
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faHouse, faEarthEurope, faLock } from "@fortawesome/free-solid-svg-icons";
import './user-info.css';

const UserInfo = () => {
  const [user] = useOutletContext();

  return (
    <div className='user-info'>
      <div className='item'>
        <div className='icon'><FontAwesomeIcon icon={faUser} /></div>
        <div>
          <div className='info'>{user.username}</div>
          <div className='label'>username</div>
        </div>
      </div>
      <div className='item'>
        <div className='icon'><FontAwesomeIcon icon={faEnvelope} /></div>
        <div>
          <div className='info'>{user.email}</div>
          <div className='label'>email</div>
        </div>
      </div>
      <div className='item'>
        <div className='icon'><FontAwesomeIcon icon={faPhone} /></div>
        <div>
          <div className='info'>{user.phone}</div>
          <div className='label'>phone</div>
        </div>
      </div>
      <div className='item'>
        <div className='icon'><FontAwesomeIcon icon={faHouse} /></div>
        <div>
          <div className='info'>
            <div>{user.address.zipcode} {user.address.city}</div>
            <div>{user.address.street}, {user.address.suite}</div>
          </div>
          <div className='label'>address</div>
        </div>
      </div>
      <div className='item'>
        <div className='icon'><FontAwesomeIcon icon={faEarthEurope} /></div>
        <div>
          <div className='info'>{user.website}</div>
          <div className='label'>website</div>
        </div>
      </div>
      <div className='item'>
        <div className='icon'><FontAwesomeIcon icon={faLock} /></div>
        <div>
          <div className='info'>
            <div>{user.company.name}</div>
            <div>{user.company.bs}</div>
          </div>
          <div className='label'>company</div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;
