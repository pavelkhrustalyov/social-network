import React from 'react';

import './Feed.styles.scss';
import FeedItem from './FeedItem/FeedItem.component';

const Feed = ({ feed }) => {
    return (
        <div className="feed">
            <h3>Новости на основе ваших подписок:</h3>
            {
               feed !== null && feed.length > 0 ? 
               feed.map(feedItem => (
                    <FeedItem 
                        key={feedItem._id}
                        feedItem={feedItem} 
                    />)
                )
               : <p>Новостей не найдено!</p>
            }
        </div>
    );
}

export default Feed;