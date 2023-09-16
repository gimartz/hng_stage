import React  from 'react'
//import Moviedetails from './movie-details';
import { useEffect, useState, useContext }  from 'react'
import './movieDetails.css';import { faCirclePlay, faTicket,faListUl} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, NavLink } from 'react-router-dom'
import noimage from './movies.jpg'
import Menu from './menu'

export const Filmdetails = ({media}) => {
   const { id } = useParams()
     const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
const APIKEY ='3d820eab8fd533d2fd7e1514e86292ea';
  const [moviedet, setMoviedet] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovie = async () => {
        try {
                setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    
    setMoviedet(moviedetail);
    // console.log(moviedetail);
    setMoviegenres(moviedetail.genres);
        setError(false);
                setLoading(false);
            } catch (err) {
                console.log(err);

                setLoading(false);
                setError(true);
            }
   
  };

  const fetchCast = async () => {
        try {
                setLoading(true);
    const castdata = await fetch(
      `https://api.themoviedb.org/3/${media}/${id}/credits?api_key=${APIKEY}&language`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setError(false);
                setLoading(false);
            } catch (err) {
                console.log(err);

                setLoading(false);
                setError(true);
            }
  }

  const fetchVideo = async () => {
    try {
                setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${APIKEY}&language=en-US`
    );
    const videodata = await data.json();
    const arr = videodata.results;
    const filtered =  arr.filter((val,i)=>i<1)
    setVideo(filtered);
    // console.log(videodata.results);
     setError(false);
                setLoading(false);
            } catch (err) {
                console.log(err);

                setLoading(false);
                setError(true);
            }
  };

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  
  

  return (
    <>
{loading ? (
      <div className="t-20 text-center load">
       <div class="spinner-border" role="status">
 </div>
  <span class="sr-only">Loading...</span>
 </div>
      ) :
    <div className=''>
     <Menu />
          <div className='cont'>
         <div alt='poster' className='moviePosters' style={{backgroundImage: `url(${moviedet.backdrop_path === null ? noimage :"https://image.tmdb.org/t/p/original/" + moviedet.backdrop_path} )`,borderRadius:20}} >
      {Array.from(video).filter(trail => trail.type === "Trailer").map((trail, index) => (
       <>
                    <>  <a key={trail.id} href={'https://www.youtube.com/watch?v=' + trail.key} target="_blank" className='d-flex' >
                       
        <div className='playButton'><FontAwesomeIcon icon={faCirclePlay} size="lg" style={{color:"white",marginTop:"5px",verticalAlign:"middle"}}/><p style={{color:"white",cursor:'pointer'}}>Watch Trailer</p></div>
</a>    </>
                </>
              ))
              }
</div>
       
    <div class="grid-container">
         <div className='movieTitle'>
   
      {moviedet?.title || moviedet?.name || moviedet?.original_name}
    </div>
     <div className='movieRatings'>
      
    </div>
        <div className='movieDesc'>
      {moviedet.overview}
    </div>
     <div className='movieShowtimes'>
      <div className='seeTimes'>
        <p className='seeTimesText'><FontAwesomeIcon icon={faTicket} style={{marginTop:"5px",verticalAlign:"middle"}} /> &nbsp;See ShowTimes</p>
      </div>
       <div className='seeTime'>
        <p className='seeTimeText'><FontAwesomeIcon icon={faListUl} style={{marginTop:"5px",verticalAlign:"middle"}}/>&nbsp;More Watch options</p>
      </div>
    </div>
     <div className='movieCast'>
      <p className='castmembers'> Directors:</p>
      <p className='castmembers'>Writers:</p>
      <p className='castmembers'>Stars:</p>
    </div>
     <div className='movieRelated'>
      
    </div>
    </div>
    </div> </div>
 }
    </>
  );
}

export default Filmdetails