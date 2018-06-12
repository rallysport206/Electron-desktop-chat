import React, { Component } from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageFrom'
import OnlineList from './OnlineList'
// import OfflineList from './OfflineList'

class Chat extends React.Component {
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
                    roomId: 8967989,
                    messagesLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserCameOnline: () => this.forceUpdate(),
                        onUserWentOffline: () => this.forceUpdate(),
                        onUserJoined: () => this.forceUpdate()
                    }    
                })
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(error => console.error('error', error))
    }

    onSend = text => {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
    }

        render() {
            return (
                <div className='wrapper'>
                    <div>
                        <OnlineList
                            currentUser={this.state.currentUser}
                            users={this.state.currentRoom.users}
                        />    
                    </div>
                    <div className='chat'>
                        <MessageList message={this.state.messages}/>
                        <SendMessageForm onSend={this.onSend} />
                    </div>
                </div>
            )
        }
}

export default Chat