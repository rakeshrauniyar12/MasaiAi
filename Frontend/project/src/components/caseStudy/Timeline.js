import React from 'react';

const Timeline = ({ timelineItems, register, setValue }) => {
  const handleAddTimelineItem = () => {
    setValue('timeline', [
      ...(timelineItems || []),
      { title: '', description: '', date: new Date(), order: timelineItems?.length || 0 }
    ]);
  };

  const handleRemoveTimelineItem = (index) => {
    const updatedTimeline = [...timelineItems];
    updatedTimeline.splice(index, 1);
    setValue('timeline', updatedTimeline);
  };

  const handleTimelineChange = (index, field, value) => {
    const updatedTimeline = [...timelineItems];
    updatedTimeline[index][field] = value;
    setValue('timeline', updatedTimeline);
  };

  return (
    <div className="timeline">
      <h3>Project Timeline</h3>
      <button type="button" onClick={handleAddTimelineItem}>Add Timeline Item</button>
      
      {timelineItems?.map((item, index) => (
        <div key={index} className="timeline-item">
          <input
            type="text"
            placeholder="Title"
            value={item.title}
            onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
            required
          />
          
          <textarea
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
            rows="3"
          />
          
          <input
            type="date"
            value={item.date ? new Date(item.date).toISOString().split('T')[0] : ''}
            onChange={(e) => handleTimelineChange(index, 'date', e.target.value)}
          />
          
          <input
            type="number"
            placeholder="Order"
            value={item.order}
            onChange={(e) => handleTimelineChange(index, 'order', parseInt(e.target.value))}
          />
          
          <button type="button" onClick={() => handleRemoveTimelineItem(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Timeline;