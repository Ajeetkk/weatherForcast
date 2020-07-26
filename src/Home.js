import React from 'react';
import axios from 'axios';
import './home.css';
import overcastCloud from './images/overcast-clouds.png'
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            weatherData: [],
            defaultData:'Hyderabad',
            queryData:''
        }
    }

componentDidMount(){
   axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.defaultData}&appid=cabd7b07e0a83ca8fffb66ca5bbece57`)
   .then(res => {
     res.data.cod == 404 ? 
     this.setState({
            weatherData:res.data.message
            
        })
        : 
        this.setState({
            weatherData:res.data
            
        })   
        
    });
    
}
changeData(e){
    
    this.setState({queryData : e.target.value});
}
searchData(){
   
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.queryData}&appid=cabd7b07e0a83ca8fffb66ca5bbece57`)
   .then(res => {
  
    res.data.cod == "404"? 
     this.setState({
            weatherData:res.data.message
            
        })
        : 
        this.setState({
            weatherData:res.data
            
        })
       
    });
    
}


  render(){
    
    let dateFormate = (data) => {
        let showToday = "";
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ];
        let systemDate = new Date();
        let getSystemDayNumber = systemDate.getDate();
        
         data = new Date(data);
        let dayNumber = data.getDate();
        let dayName = days[data.getDay()];
        let monthNane =  monthNames[data.getMonth()];
       let year = data.getFullYear();
       
       if(getSystemDayNumber == dayNumber){
        showToday = "Today"
       }
        return  dayName + " "+ dayNumber + " " + monthNane +" " + year +" "+showToday;
    }
      
    let showImages = (des) =>{
       if(des == "light rain"){
            return <img src="https://openweathermap.org/img/w/10d.png"></img> 
       }else if(des == "few clouds"){
           return <img src="https://openweathermap.org/img/w/02d.png"></img>
       }else if(des == "scattered clouds"){
        return <img src="https://openweathermap.org/img/w/03d.png"></img>
       }else if(des == "broken clouds"){
        return <img src="https://openweathermap.org/img/w/04d.png"></img>
       }else if(des == "shower rain"){
        return <img src="https://openweathermap.org/img/w/05d.png"></img>
       }else if(des == "overcast clouds"){
        return <img src={overcastCloud} style={{width:'40px'}}></img>
       }else if(des == "thunderstorm"){
        return <img src="https://openweathermap.org/img/w/11d.png"></img>
       }else if(des == "moderate rain"){
        return <img src="https://openweathermap.org/img/w/09d.png"></img>
       }else if(des == "light rain"){
        return <img src="https://openweathermap.org/img/w/09d.png"></img>
       }
       else{
          return <img src="https://openweathermap.org/img/w/01d.png"></img>
       }
    }  


    return(
      <div>
        <h3 className="heding-wf-d"> 5 day weather forecast</h3>
        <div className="search-form">
            <input type="text" onChange={(e) => {this.changeData(e)}}></input>
            <button onClick={this.searchData.bind(this)}>Search</button>
        </div>
        <h4 className="city-country-heading">
         {
            this.state.weatherData.length == 0 ? "loading ....." : 
             this.state.weatherData == "city not fond" ? "city not fond! Please type valid city name" :
            <div> City : {this.state.weatherData && this.state.weatherData.length !== 0 && this.state.weatherData.city.name} <br />
             Country  : {this.state.weatherData && this.state.weatherData.length !== 0 && this.state.weatherData.city.country}
             </div>
         }
           
        </h4> 
        <table className="tbl-section">
            <tbody>
        {
            
            this.state.weatherData && this.state.weatherData.length !== 0 && this.state.weatherData.list.map((data, index) => 
            <tr style={{outline: '1px solid #9f9797', font: "400 14px/1.4 Roboto,Arial,sans-serif", padding: "15px"}} key={index}>
                <td style={{padding:'10px'}}>
                                    { 
                   dateFormate(data.dt_txt)
                }
                
                {
                    showImages(data.weather[0].description)
                }
                </td>
                
                <td>

                <span style={{background: "#f0ad4e", padding:"2px"}}> { Math.round(((data.main.temp_min) - 32) * 5 / 9)}&#8451; </span> &nbsp;&nbsp;
                <span style={{background: "#f0ad4e", padding:"2px"}}> { Math.round(((data.main.temp_max) - 32) * 5 / 9)}&#8451; </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
               {data.weather[0].description}&nbsp;&nbsp; <br />
                {data.wind.speed}m/s <br />
                clouds: {data.clouds.all}% , {data.main.pressure}hpa
                </td>
               
            </tr>
           
            )
        }
            </tbody>
        </table>
<br /> <br /> < br />

      </div>
    )
  }
}



export default Home;
