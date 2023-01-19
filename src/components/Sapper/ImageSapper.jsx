import React from 'react';

const ImageSapper = ({imageSource}) => {
    return (
        <img style={{width: "25px", height: "25px"}} src={imageSource} alt="b"/>
    );
};

export default ImageSapper;