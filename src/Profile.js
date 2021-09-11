import React, { useContext } from "react";
import { UserContext, useStateValue } from './StateProvider';
import {auth} from "./firebase";


const Profile = () => {

  const user = useContext(UserContext);
  const {photoURL, displayName, email} = user;
  console.log(user);

    return (

    <div>
        <div
          style={{
            background:
                `url(${photoURL || 'userIcon__white.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}>
        </div>

        <div>
            <h2> { displayName } </h2>
            <h3> { email } </h3>
        </div>

      <button onClick= {() => {auth.signOut()}}>Sign out</button>
    </div>
            

    )
}

export default Profile
