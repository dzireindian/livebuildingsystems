import {useState} from 'react';
import LoaderEffect from '../Loader/LoaderEffect';
export default function Home(){
    let [loader,setLoad] = useState({load:true,data:[]});
    
      if(loader.load){
        var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
        fetch("http://127.0.0.1:5000/meters", requestOptions)
            .then(response => response.json())
            .then(result => {
                result = result.result;
                var Card = (props) => {
                    return (<div className="card border border-3 border-dark w-100" style={{width: "18rem"}}>
                    <div className="card-body">
                    <h5 className="card-title">{props.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.meter_title}</h6>
                    <a href={"/Dashboard/"+props.id+"/"+props.meter_title+"/"} className="card-link">Redirect to details</a>
                    </div>
                </div>);
                }

                result = result.map(res => {
                    return <Card key={res.id} id={res.id} meter_title={res.label}/>
                })

                setLoad({loading: false, data: result});
            })
            .catch(error => console.log('error', error));
    }
    return (loader.load?<LoaderEffect/>:<div className="d-flex flex-column gap-3">
    {loader.data}
    </div>)
}