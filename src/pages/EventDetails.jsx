import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";

const EventDetails = () => {
    const {eventId} = useParams();
    const {data, loading, error} = useFetch(`https://meetup-event-app-backend.vercel.app/eventid/${eventId}`);

    return(
        <div className="container">
            <header>
                <nav>
                    <Link to='/' className="navbar-brand">
                        <h1>Meetup</h1>
                    </Link>
                </nav>
            </header>
            <hr/>
            {loading && (
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            )}
            {error && <p>{error}</p>}
            {data && data.data && (
                <div className="row">
                    <div className="col-md-8 pb-4">
                        <h2>{data.data.title}</h2>
                        <small>Hosted By:</small>
                        <br/>
                        <strong>
                            {data.data.host}
                        </strong>
                        <br/>
                        <img src={data.data.eventImageUrl} alt="event poster" className="py-4"/>
                        <h4>Details:</h4>
                        <div className="row">
                            <div className="col-md-7">
                                <p>{data.data.details}</p>
                            </div>
                        </div>
                    
                        <h4>Additional Information:</h4>
                        <p><strong>Dress Code: </strong>{data.data.dressCode}</p>
                        <p><strong>Age Restriction: </strong>{data.data.ageRestriction}</p>
                        <h4>Event Tags</h4>
                        {
                        data.data.eventTags.map(tag => (
                            <button className="btn btn-danger ms-2">{tag}</button>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 rounded border">
                            <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                                <small>{`${data.data.dateFrom} at ${data.data.timeFrom} to`}</small><br/>
                                <small className="ms-4">{`${data.data.dateTo} at ${data.data.timeTo}`}</small>
                            </p>
                            <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>{data.data.location}</p>
                            <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/></svg>{data.data.price}</p>
                        </div>
                        <h4 className="mt-4">Speakers: ({data.data.speakerName.length})</h4>
                        <div class="d-flex gap-3">
                            {
                                data.data.speakerName.map((name, index) => (
                                    <div class="text-center bg-white p-3 rounded shadow-sm">
                                        <img src={data.data.speakersImageUrl[index]} alt="speaker profile" className="rounded-circle"/><br/>
                                        <strong>{name}</strong>
                                        <p className="text-muted">{data.data.speakerDesignation[index]}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default EventDetails;