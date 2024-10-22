import abandCartMessenger from '@/lib/abandCartMessenger'
import React from 'react'

const SendAbandWhap = () => {
    const ondub = async () => {
        await abandCartMessenger()

    }
    return (
        <div>
            <button onClick={ondub}>
                sendwh
            </button>
        </div>
    )
}

export default SendAbandWhap
