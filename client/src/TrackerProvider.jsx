import React, { useContext, useState } from 'react';
import axios from 'axios';

const TrackerContext = React.createContext();
const TrackerUpdateContext = React.createContext();

export const useTracker = () => {
  return useContext(TrackerContext);
};

export const useTrackerUpdate = () => {
  return useContext(TrackerUpdateContext);
};

export const TrackerProvider = ({ children }) => {
  const [events, setEvents] = useState();

  const trackClicks = (event) => {
    console.log('clicked: ', event.target.nodeName, event.currentTarget.id, Date.now().toString());
    axios.post('/interactions', {
      element: event.target.nodeName,
      widget: event.currentTarget.id,
      time: Date.now().toString()
    })
      .catch(err => console.log(err));

    setEvents({
      registeredOn: event.currentTarget,
      happenedOn: event.target
    });
  };

  return (
    <TrackerContext.Provider value={events}>
      <TrackerUpdateContext.Provider value={trackClicks}>
        {children}
      </TrackerUpdateContext.Provider>
    </TrackerContext.Provider>
  );
};