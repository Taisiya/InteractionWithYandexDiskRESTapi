import React, { Component } from 'react';
import PropTypes from 'prop-types';
import File from './File';
import Folder from './Folder';

class FilesList extends Component {

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList(items) {
        let result = (items.map(item => {
            if (item.type == "dir" && window.location.pathname != '/trash:/') return <Folder data={item} />;
            else return <File data={item} />;
        }));
        let kv = 6;
        if (result.length <= kv) {
            return <div class='row'>{result}</div>
        }
        else {
            let j1 = 0;
            let j2 = kv;
            let r = [];
            for (var i = 0; i < Math.ceil(result.length / kv); i++) {
                r[i] = <div class='row'>{result.slice(j1, j2)}</div>
                j1 = j2;
                j2 = j2 + kv <= result.length ? j2 + kv : result.length;
            }
            return r;
        }
    }

    render() {
        return (
            <div class='container-fluid filesList'>
                {this.renderList(this.props.items)}
            </div>
        );
    }
}

FilesList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}

export default FilesList;