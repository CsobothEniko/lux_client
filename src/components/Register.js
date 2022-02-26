import React, {Component} from 'react'
import axios from 'axios'
import './../css/register.css'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            firstName : '',
            lastName : '',
            sex : 'M',
            interests : '',
            birthsday : '',
            place : ''
        }
    }

    changeHandler = (e) =>{
        if(e.target.name === "username")
            this.setState({username : e.target.value})
        else if(e.target.name === "password")
            this.setState({password : e.target.value})
        else if(e.target.name === "firstName")
            this.setState({firstName : e.target.value})
        else if(e.target.name === "lastName")
            this.setState({lastName : e.target.value})
        else if(e.target.name === "sex")
            this.setState({sex : e.target.value})
        else if(e.target.name === "interests")
            this.setState({interests : e.target.value})
        else if(e.target.name === "place")
            this.setState({place : e.target.value})
        else if(e.target.name === "birthsday")
            this.setState({birthsday : e.target.value})
    }

    submitHandler = (e) =>{
        e.preventDefault()
              // http://localhost:8080/register
        axios // https://lux-rest.herokuapp.com/register
            .post('http://localhost:8080/register', JSON.stringify(this.state), {
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response =>{
                if(response.status === 200)
                    alert("Successfully registered")
            })
            .catch(error =>{
                alert("Error: "+error)
            })
    }

    render(){
        const {username, password, firstName, lastName, interests, birthsday, place} = this.state
        return(
            <div>
                <h1>Registration</h1>
                <form onSubmit={this.submitHandler}>
                    <div className="formGroup">
                        <input type="text" 
                        name="username" 
                        value={username} 
                        onChange={this.changeHandler}
                        placeholder="Username"/><br/>
                    </div>

                    <div className="formGroup">
                        <input type="password" 
                        name="password"
                        value={password} 
                        onChange={this.changeHandler}
                        placeholder="Password"/><br/>
                    </div>

                    <div className="formGroup">
                        <input type="text" 
                        name="firstName" 
                        value={firstName} 
                        onChange={this.changeHandler}
                        placeholder="First name"/><br/>
                    </div>

                    <div className="formGroup">
                        <input type="text" 
                        name="lastName" 
                        value={lastName} 
                        onChange={this.changeHandler}
                        placeholder="Last name"/><br/>
                    </div>

                    <div className="formGroup">
                        <input type="text" 
                        name="interests" 
                        value={interests} 
                        onChange={this.changeHandler}
                        placeholder="Interests"/><br/>
                    </div>

                    <div className="formGroup">
                        <input type="text" 
                        name="place" 
                        value={place} 
                        onChange={this.changeHandler}
                        placeholder="Place"/><br/>
                    </div>
                    
                    <input type="date" 
                    name="birthsday"
                    min="1920-01-01" 
                    max="2020-12-31"
                    value={birthsday}
                    onChange={this.changeHandler}
                    placeholder="birthsday"/><br/>

                    <label className="container">Male
                        <input type="radio" id="male" name="sex" value="M" onChange={this.changeHandler} checked/>
                        <span class="checkmark"></span>
                    </label>
                    <label className="container">Female
                        <input type="radio" id="female" name="sex" value="F" onChange={this.changeHandler}/>
                        <span class="checkmark"></span>
                    </label>

                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }

}
export default Register