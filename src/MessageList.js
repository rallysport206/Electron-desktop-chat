import React, { Component } from 'react
import {
    ListView,
    ListViewSection,
    ListViewSectionHeader,
    ListViewRow,
    Text
} from 'react-desktop/macOs'

class MessageList extends Component {
    render() {
        return(
            <ListView>
                <ListViewSection>
                    {this.props.message.map((message, index) =>
                        this.renderItem(message)
                    )}
                </ListViewSection>
            </ListView>
        )
    }
}