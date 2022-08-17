import { useState } from "react";
import { useParams } from "react-router-dom";
import LoaderEffect from "../Loader/LoaderEffect";

export default function Dashboard(props) {
  let [loader, setLoad] = useState({ load: true, data: [] });
  const { id, label } = useParams();

  if(loader.load){

    var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

    fetch(`http://127.0.0.1:5000/meters/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            result = result.result;
        // result = result.sort(function(a,b){

        //     function toTimestamp(strDate){
        //         var datum = Date.parse(strDate);
        //         return datum/1000;
        //     }

        //     a = toTimestamp(a);
        //     b = toTimestamp(b);

        //     if(a>b){
        //         return 1;
        //     }
        //     else if(a<b) {
        //         return -1;
        //     }else{
        //         return 0;
        //     }

        // });

        var Card = (props) => {
            return (
            <div className="card border border-3 border-dark w-100" style={{width: "18rem"}}>
                <div className="card-body">
                <h5 className="card-title">{label}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {props.timestamp}
                </h6>
                <p className="card-text">{props.value}</p>
                <div className="card w-100" style={{width: "18rem"}}>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        meter id: <p className="fs-6">{props.meter_id}</p>
                    </li>
                    <li className="list-group-item">
                        meter data id: <p className="fs-6">{props.id}</p>
                    </li>
                    </ul>
                    <div className="card-footer">meter References</div>
                </div>
                </div>
            </div>
            );
        };

        result = result.map((res) => {
            return (<Card key={res.id} timestamp={res.timestamp} value={res.value}  id={res.id} meter_id={res.meter_id} />);
        });

        setLoad({load:false,data: result});

        })
        .catch((error) => console.log("error", error));
    }

  return (loader.load ? 
    <LoaderEffect />: 
    <div className="d-flex flex-column gap-3">
    {loader.data}
    </div>
  );
}
