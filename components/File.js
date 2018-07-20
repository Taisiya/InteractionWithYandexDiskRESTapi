import React, { Component } from 'react';
import PropTypes from 'prop-types';

const mediaType = {
    image: '/icons/image-100.png',
    video: '/icons/video-100.png',
    audio: '/icons/audio-100.png',
    other: '/icons/file-100.png'
};

class File extends Component {
    constructor(props) {
        super(props);
        this.renderImage = this.renderImage.bind(this);
    }

    renderImage(data) {
        if (data.type == "dir") {
            return <img src={window.location.origin + '/icons/folder1.png'} alt="альтернативный текст" />
        }
        else {
            if (data.preview === undefined) {
                let src = window.location.origin;
                if (!mediaType[data.media_type]) {
                    return <img src={src + mediaType['other']} />;
                }
                return <img src={src + mediaType[data.media_type]} />;
            }
            return <img src={data.preview} />;
        }
    }

    render() {
        return (
            <div class='col-2 align-self-end'>
                <div>
                    {
                        this.renderImage(this.props.data)
                    }
                    <br />
                    <div className="text-truncate tooltipe" data-title={this.props.data.name}>
                        {this.props.data.name}
                    </div>
                </div>
            </div>
        );
    }
}

File.propTypes = {
    data: PropTypes.object
}

export default File;