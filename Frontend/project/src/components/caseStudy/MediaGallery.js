import React from 'react';

const MediaGallery = ({ mediaItems, register, setValue }) => {
  const handleAddMedia = () => {
    setValue('mediaGallery', [
      ...(mediaItems || []),
      { type: 'image', url: '', caption: '', order: mediaItems?.length || 0 }
    ]);
  };

  const handleRemoveMedia = (index) => {
    const updatedMedia = [...mediaItems];
    updatedMedia.splice(index, 1);
    setValue('mediaGallery', updatedMedia);
  };

  const handleMediaChange = (index, field, value) => {
    const updatedMedia = [...mediaItems];
    updatedMedia[index][field] = value;
    setValue('mediaGallery', updatedMedia);
  };

  return (
    <div className="media-gallery">
      <h3>Media Gallery</h3>
      <button type="button" onClick={handleAddMedia}>Add Media</button>
      
      {mediaItems?.map((item, index) => (
        <div key={index} className="media-item">
          <select
            value={item.type}
            onChange={(e) => handleMediaChange(index, 'type', e.target.value)}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="embed">Embed</option>
          </select>
          
          <input
            type="url"
            placeholder="URL"
            value={item.url}
            onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
            required
          />
          
          <input
            type="text"
            placeholder="Caption"
            value={item.caption}
            onChange={(e) => handleMediaChange(index, 'caption', e.target.value)}
          />
          
          <input
            type="number"
            placeholder="Order"
            value={item.order}
            onChange={(e) => handleMediaChange(index, 'order', parseInt(e.target.value))}
          />
          
          <button type="button" onClick={() => handleRemoveMedia(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;