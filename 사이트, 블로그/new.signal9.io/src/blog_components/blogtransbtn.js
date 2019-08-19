import React from "react"
import { Link } from "gatsby"
var isOn = false;

class Blogtransbtn extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
   
    handleClick(event) { 
        if(isOn) isOn=false;
        else isOn=true;
        /*if(this.state.isOn){
            this.setState({isOn:false});
        }
        else{
        this.setState({ isOn: true });
        }*/

    };

    render() {
        return (
            <div>
                <Link className="btn" onClick={this.handleClick} to={isOn ? "/ko/blog" : "/en/blog"}>{isOn ? "ENGLISH" : "한국어"}</Link>
            </div>
        )
    }

}
export default Blogtransbtn