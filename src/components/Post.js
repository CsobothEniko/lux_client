import React, {Component} from 'react';
import './../css/post.css';
import './../css/comment.css';

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : props.name,
            date : props.date,
            content : props.content,
            likes : props.likes,
            comments : props.comments,
            postId : props.id,
            commentContent : '',
            username : props.username,
            password : props.password,
            commentSSE : props.commentSSE
        }
        this.setState({comments : this.state.comments.sort((b, a) => b.id - a.id)})
        this.commentHandler = this.commentHandler.bind(this)
    }

    changeHandler = (e) =>{
        this.setState({commentContent : e.target.value})
    }

    componentDidMount(){
        this.state.commentSSE.addEventListener("comment", (e)=>{
            const postId = e.data.split('-')[0]
            const c = JSON.parse(e.data.split('-')[1])
            if(this.state.postId === Number(postId)){
                this.setState({comments : this.state.comments.concat(c)})
            }
        })
    }
    
    
    async commentHandler(e){
        const encoded = window.btoa(this.state.username + ":" + this.state.password);
        const newComment = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encoded,
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                content : this.state.commentContent
            }),
            credentials: 'same-origin'
        }
        const request = new Request("http://localhost:8080/comment/save?post_id="+this.state.postId, newComment)

        const response = await fetch(request)
        const savedComment = await response.json()
        if(response.status === 200){
            this.setState({comments : this.state.comments.concat(savedComment)})
        }else{
            alert("Error")
        }
    }

    render(){
        const {name, date, content, likes, comments, postId, commentContent} = this.state

        return(
            <div className="post">
            <h3>{name}</h3>
            <p>{content}</p>
            <p>{likes.length+" like"}</p>
            <p>{date}</p>
            {comments.map(comment =>(
                <div key={comment.id} className="comment">
                    <b>{comment.user.firstName+" "+comment.user.lastName+":  "}</b>{comment.content}
                </div>
            ))}
            <textarea 
                //type="text"
                name={postId}
                value={commentContent}
                onChange={this.changeHandler}/>
            <button type="button" onClick={this.commentHandler}>Comment</button>
        </div>
        )
    }
}

export default Post