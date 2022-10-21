import React, { useContext, useState } from 'react';

const TrackerContext = React.createContext();
const TrackerUpdateContext = React.createContext();

export const useTracker = () => {
  return useContext(TrackerContext)
}

export const useTrackerUpdate = () => {
  return useContext(TrackerUpdateContext)
}

export const TrackerProvider = ({ children }) => {
  const [events, setEvents] = useState();

  const trackClicks = (event) => {
    setEvents({
      registeredOn: event.currentTarget,
      happenedOn: event.target
    })
    console.log("event happened on", event.target);
    console.log("event registered on", event.currentTarget);
  }

  return (
    <TrackerContext.Provider value={events}>
      <TrackerUpdateContext.Provider value={trackClicks}>
        {children}
      </TrackerUpdateContext.Provider>
    </TrackerContext.Provider>
  )
}