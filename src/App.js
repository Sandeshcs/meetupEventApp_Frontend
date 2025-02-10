import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [selectedEventType, setEventType] = useState('both');
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const [showDisplay, setShowDisplay] = useState(true);
  const [showSearchData, setShow] = useState(false);
  const {data, loading, error} = useFetch('https://meetup-event-app-backend.vercel.app/event/allEvents');
  
  const displayData = data ? (selectedEventType === 'both' || selectedEventType === 'select event type'? data.eventData : data.eventData.filter(event => event.typeOfEvent === selectedEventType)): error && <p>{error}</p>
  //console.log(displayData);
 
  const handleSearchEventOrTitle = (e) => {
    setSearchInput(e.target.value);
    const foundSearchData = data? data.eventData.reduce((acc, curr) => {
      if(curr.title.includes(e.target.value)){
        acc.push(curr);
      }
      
      const foundTags = curr.eventTags.reduce((inital, tag) => {
        if(tag.includes(e.target.value)){
          inital.push(curr)
        }
        return inital;
      }, []);
      //console.log(foundTags);
      if(foundTags.length>0){
        acc.push(...foundTags);
      }
      return acc;
    }, []):'';
    //console.log(foundSearchData);
    if(foundSearchData.length > 0){
      setSearchData(foundSearchData);
      setShowDisplay(false);
      setShow(true);
    }else{
      setShowDisplay(true);
      setShow(false);
    }
  }
  return (
    <div className="container">
      <header>
         <nav className="navbar">
          <Link to='/' className="navbar-brand">
            <h1>Meetup</h1>
          </Link>
          <div className="d-flex justify-content-end">
            <input type="text" id="searchEventOrTitle" placeholder="search by event title or tags" value={searchInput} onChange={handleSearchEventOrTitle}/>
          </div>
        </nav>
      </header>
      <hr/>
      <div className="position-relative">
      <select onChange={(e) => setEventType(e.target.value)} className="position-absolute top-0 end-0">
        <option value={'select event type'}>select event type</option>
        <option value={'both'}>Both</option>
        <option value={'Offline'}>Offline</option>
        <option value={'Online'}>Online</option>
      </select>
      </div>
      <h2>Meetup Events</h2>
      {loading && (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <p>{error}</p>}
      {showDisplay &&  
      <>
        {displayData && displayData.length > 0 && (
            <div className="row container">
            {
            displayData.map((event) => (
              <div className="col-md-4 mb-3">
                <div className="position-relative">  
                  <Link to={`/eventDetails/${event._id}`}>
                  <img src={event.thumbnailUrl} alt="Event thumbnail" width="250px" height="250" className="img-fluid"/>
                  </Link>
                  <span className="badge text-bg-light position-absolute top-0 start-0 mt-2 ms-2">{event.typeOfEvent}</span>
                </div>
                <><small>{event.dateFrom} &middot; {event.timeFrom}</small></>
                <br/>
                <strong>{event.title}</strong>
              </div>
            ))
            }
            </div>
            )
          }
      </>
      }
      {showSearchData && (
        <div className="row mb-3">
          {searchData.map(event => (
            <div className="col-md-4">
            <div className="position-relative">  
              <Link to={`/eventDetails/${event._id}`}>
              <img src={event.thumbnailUrl} alt="Event thumbnail" width="250px" height="250" className="img-fluid"/>
              </Link>
              <span className="badge text-bg-light position-absolute top-0 start-0 mt-2 ms-2">{event.typeOfEvent}</span>
            </div>
            <><small>{event.dateFrom} &middot; {event.timeFrom}</small></>
            <br/>
            <strong>{event.title}</strong>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
