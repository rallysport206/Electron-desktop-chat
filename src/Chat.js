import React, { Component } from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit'
import MessageList from './MessageList'

class Chat extends Component {
    state = {
        currentUser: null,
        currentRoom: {},
        messages: []
    }

    componentDidMount() {
        const chatkit = new ChatManager ({
            instanceLocator: 'v1:us1:660404d4-3b36-4539-9c7a-38cf1adf8930',
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url:'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/660404d4-3b36-4539-9c7a-38cf1adf8930/token'
            })
        })

        chatkit
            .connect()
            .then(currentUser => {
                this.setState({ currentUser })
                console.log('You are now connected to ChatKit')
                return currentUser.subscribeToRoom({
                    
                })
            })
            .catch(error => console.error('error', error))
    }

        render() {
            return (
                <div>
                    <h1>Chat Screen</h1>
                </div>
            )
        }
}
export default Chat