import React, { useContext, useState } from 'react';

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
    // send a post request with the element clicked, the module it belongs to, and a timestamp

    setEvents({
      registeredOn: event.currentTarget,
      happenedOn: event.target
    });
    console.log('Element clicked:', event.target.nodeName);
    console.log('Module:', event.currentTarget.id);
    console.log('Timestamp:', Date.now());
  };

  return (
    <TrackerContext.Provider value={events}>
      <TrackerUpdateContext.Provider value={trackClicks}>
        {children}
      </TrackerUpdateContext.Provider>
    </TrackerContext.Provider>
  );
};