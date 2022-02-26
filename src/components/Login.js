import React, {Component} from 'react'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './Register'
import Feed from './Feed'
import People from './People'
import './../css/login.css'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            loggedin : false,
            posts : null,
            friends : [],
            pendings : []
        }
        this.submitHandler = this.submitHandler.bind(this)

        this.friendsRequest = this.friendsRequest.bind(this)
        this.pendindsRequest = this.pendindsRequest.bind(this)
    }

    changeHandler = (e) =>{
        if(e.target.name === "username")
            this.setState({username : e.target.value})
        else if(e.target.name === "password")
            this.setState({password : e.target.value})
    }

    async submitHandler(e){
        e.preventDefault()
        const encoded = window.btoa(this.state.username + ":" + this.state.password);
        const newLogin = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + encoded,
                'Access-Control-Allow-Origin': '*',
            },
            credentials: 'same-origin'
        }

        const request = new Request("http://localhost:8080/post/get", newLogin)

        const response = await fetch(request)
        const posts = await response.json()
        if(response.status === 200){
            this.setState({posts : posts})
            this.setState({loggedin : true})
            this.friendsRequest()
            this.pendindsRequest()
        }
    }

    async pendindsRequest(e){
        const encoded = window.btoa(this.state.username + ":" + this.state.password);
        const newPendings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + encoded,
                'Access-Control-Allow-Origin': '*', 
            },
            credentials: 'same-origin'
        }

        const request = new Request("http://localhost:8080/friendship/pending", newPendings)

        const response = await fetch(request)
        const pendings = await response.json()
        if(response.status === 200){
            this.setState({pendings : pendings})
        }
    }

    async friendsRequest(e){
        const encoded = window.btoa(this.state.username + ":" + this.state.password);
        const newFriends = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + encoded,
                'Access-Control-Allow-Origin': '*',
            },
            credentials: 'same-origin'
        }

        const request = new Request("http://localhost:8080/friendship/friends", newFriends)

        const response = await fetch(request)
        const friends = await response.json()
        if(response.status === 200){
            this.setState({friends : friends})
        }
    }

    render(){
        const {username, password, loggedin, posts, friends, pendings} = this.state
        if(!loggedin){
        return(
            <div className="baseContainer">
                <div className="whiteBox">
                    <div className="content">
                        <div className="header">
                            <h1>Welcome</h1>
                            <p>Please log in or register</p>
                        </div>
                        <form onSubmit={this.submitHandler}>
                            <div className="formGroup">
                                <input type="text" name="username" value={username} onChange={this.changeHandler} placeholder="Username"/><br/>
                            </div>
                            <div className="formGroup">
                                <input type="password" name="password" value={password} onChange={this.changeHandler} placeholder="Password"/><br/>
                            </div>
                            <div className="footer">
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <Router>
                            <Link to="/register">
                                <button type="button" className="regButton">Registration</button>
                            </Link>
                            <Route path="/register" exact strict component={Register}/>
                        </Router>
                    </div>
                </div>
            </div>
        )
        }else{
            return(
                <Router>
                    <div>
                        {username+" felhasználó"}
                    </div>
                    <Link to="/">
                        <button type="button">Feed</button>
                    </Link>
                    <Link to="/people">
                        <button type="button">People</button>
                    </Link>
                    <Route path="/" exact strict component={()=>
                        <Feed 
                            posts={posts}
                            username={username}
                            password={password}/>
                    }/>
                    <Route path="/people" exact strict component={()=>
                        <People
                            friends={friends}
                            pendings={pendings}
                            username={username}
                            password={password}/>
                    }/>
                </Router>
                
            )
        }
    }
}

export default Login