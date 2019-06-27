import React, { useState } from 'react'

const Login = (  ) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  
    const handleSubmit = event => {
      event.preventDefault();
      const userData = {
        username,
        password
      };
      
      // form submit logic goes here.
      console.log(userData);
      // reset the form after
      setUsername("");
      setPassword("");
    };


    return (
        <div>
        <h2>Simple Form</h2>
        <form

          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            onChange={event => setUsername(event.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
          <button type="submit">Submit</button>
        </form>
  
    
      </div>
    )
}

export default Login
