import React from 'react'

interface AvatarProps {
  src: string;
  width?: number | string;
  height?: number | string;
  border?: boolean;
  className?: string;
}

function Avatar(props: AvatarProps) {
  const avatarStyles = { borderRadius: "100%", border: !!props.border ? "1px solid rgba(0,0,0,0.86)" : "none", resizeMode: "scale-down", margin: "auto" };

  return (
    <img className={props.className?? ""} src={props.src} height={props.height?? "auto"} width={props.width?? "100%"} style={avatarStyles}/>
  )
}

export default Avatar