import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilesList from './FilesList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataV2, autorization } from './actions';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            loading: true,
            data: []
        }
        this.renderContent = this.renderContent.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this);
    }

    componentWillMount() {
        var token = (document.location.hash)[1] ? /access_token=([^&]+)/.exec(document.location.hash)[1] : null;
        if (!this.state.token && !token) {
            window.location = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=2552d7201bd54d8ab0c8e40254ca45b7';
        }
        if (token && !this.state.token) {
            this.props.autorization(token);
            this.setState({ token });
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.fetchData();
        }
    }

    fetchData() {
        this.setState({ loading: true });
        const { token } = this.state;
        getDataV2(this.props.location.pathname, this.state.token).then((data) => {
            this.setState({ loading: false, data });
        })
    }

    renderBreadcrumbs() {
        if (!this.state.token) {
            return null;
        }
        return (
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link key="/" to="/">Disk</Link></li>
                    {this.props.location.pathname.split('/').filter((a) => !!a).reduce((acc, p, index) => {
                        let { list, path } = acc;
                        path += '/' + p;
                        list.push(<li key={path} className="breadcrumb-item"><Link to={path}>{p}</Link></li>);
                        return { list, path }
                    }, { list: [], path: '' }).list}
                </ol>
            </nav>
        )
    }

    renderContent() {
        const { data } = this.state;
        if (!data || !data.items || !data.items.length) {
            return null;
        }
        return (<FilesList items={data.items} />);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-10 content">
                        {this.renderBreadcrumbs()}
                        {this.renderContent()}
                    </div>
                    <div className="col-1">
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.token
    };
}

module.exports = connect(mapStateToProps, { autorization })(Content);