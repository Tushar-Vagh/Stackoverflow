import React from 'react'

const LoginHistoryCard = ({history}) => {
  return (
    <div style={{backgroundColor:'white',boxShadow:'2px 2px 5px gray',borderRadius:'5px',padding:'5px',width:'300px',display:'flex',flexDirection:'column',}}>
      <p>Device Type: {history.deviceType}</p>
      <p>Oprating system: {history.os}</p>
      <p>Ip address: {history.ip}</p>
      <p>Browser: {history.browser}</p>
    </div>
  )
}

export default LoginHistoryCard