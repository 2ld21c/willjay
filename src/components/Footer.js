import React from 'react'

export default function Footer({title}) {
    return (
        <div style={{textAlign: 'center', color: '#ffffff'}}>
            <p>&copy; {new Date().getFullYear()}, {title}</p>
        </div>
    )
}
