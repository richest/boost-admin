import { MAILCHIM_CLIENT_KEY } from 'app/constants';
import React from 'react';

const MailchimpConnectButton = () => {
  const openMailchimpAuth = () => {

  
    const authUrl = `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${MAILCHIM_CLIENT_KEY}&redirect_uri=${encodeURIComponent("http://localhost:3000")}`;

    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      authUrl,
      'MailchimpAuth',
      `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars=yes,status=1`
    );
  };

  return (
    <button className='button button-primary px-3 text-decoration-none' onClick={openMailchimpAuth}>
      Set up
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#ffe01b',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default MailchimpConnectButton;
