import React from 'react';
import Credits from './creditsbar'

function Contact() {
  return (
    <div className='contact-container'>
      <img src="https://classroomclipart.com/image/static7/preview2/email-icons-on-a-laptop-computer-screen-59670.jpg" alt = 'Email'
          style={{width: '500px', height: 'auto'}}
      />
      <p>trungnguyen02@csu.fullerton.edu</p>
      <p>EvanNg21@csu.fullerton.edu</p>
      <p>nsabater2022@csu.fullerton.edu</p>
      <p>zhuconnie123@csu.fullerton.edu</p>
      <Credits/>
    </div>
  );
}

export default Contact;