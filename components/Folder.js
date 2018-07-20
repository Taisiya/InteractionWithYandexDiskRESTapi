import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Folder extends Component {
    constructor(props) {
        super(props);
        this.renderFolder = this.renderFolder.bind(this);
    }

    renderFolder(data) {
        let src = window.location.origin + '/icons/folder1.png';
        if (data.path == 'trash:/') {
            if (data._embedded.items.length > 0) {
                src = window.location.origin + '/icons/full-trash-100.png'
            }
            else src = window.location.origin + '/icons/empty-trash-100.png'
            return (
                <Link to={(data.path)}>
                    <img src={src} alt="альтернативный текст" />
                    <br />
                    <div className="text-truncate tooltipe" data-title={data.name}>
                        {data.name}<br />
                    </div>
                </Link>
            );
        }
        return (
            <Link to={(data.path).slice(5)}>
                <img src={src} alt="альтернативный текст" />
                <br />
                <div className="text-truncate tooltipe" data-title={data.name}>
                    {data.name}<br />
                </div>
            </Link>
        );
    }

    render() {
        return (
            <div class='col-2 align-self-end' >
                {this.renderFolder(this.props.data)}
            </div >
        );
    }
}

Folder.propTypes = {
    data: PropTypes.any
}

function mapStateToProps(state) {
    return {
        routes: state.routes
    };
}

module.exports = connect(mapStateToProps)(Folder);