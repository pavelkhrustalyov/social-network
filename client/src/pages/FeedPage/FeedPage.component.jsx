import React, { useEffect } from 'react';

import './FeedPage.styles.scss';
import Container from '../../components/Grid/Container.component';
import Row from '../../components/Grid/Row.component';
import Col from '../../components/Grid/Col.component';
import { connect } from 'react-redux';
import { getFeed } from '../../redux/feed/feed.actions';
import Preloader from '../../components/Preloader/Preloader.component';
import Feed from '../../components/Feed/Feed.component';

const FeedPage = ({ getFeed, feed, loading }) => {

    useEffect(() => {
        getFeed();
    }, []);
    if (loading) {
        return <Preloader />
    }
    return (
        <Container>
            <Row center={true}>
                <Col xs={12} md={9} lg={9}>
                    <Feed feed={feed}/>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = ({ feed: { feed, loading }}) => ({
    feed,
    loading,
});

export default connect(mapStateToProps, { getFeed })(FeedPage);