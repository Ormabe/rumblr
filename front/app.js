import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'

const AllPosts = React.createClass({
	getInitialState: function () {
	return ({data: null})
	},
	componentWillMount: function () {
		setTimeout(this.postAjax, 2000)
	},
	postAjax: function () {
		let that = this
		$.ajax({
			url: '/posts',
			type: 'GET',
			success: function (dataBase) {
				that.setState({data:dataBase})
			}
		})
	},
	render: function () {
		if(this.state.data) {
			return (
				<div>{this.state.data.map(function(post, i) {
				let num = i + 1
				return (
					<div key={i}>
						<h5>Post #{num}</h5>
						<label htmlFor="pT">Title:</label><p id="pT">{post.title}</p>
						<label htmlFor="pB">Post:</label><p id="pB">{post.body}</p>
						<h6 id="pD">{post.date}< /h6>
						________________________________
						<br />
					</div>
					)
				})}
				</div>
			) 
		} else {
			return <div></div>
		}
	}
});


const NewPostForm = React.createClass ({
	getInitialState: function () {
		return ({inputTitle: "", inputBody:"", inputDate: Date.now})
	},
	handleChange: function (name, event) {
		let change = {}
		change[name] = event.target.value
		this.setState(change)
	},
	makeNewPost: function (event) {
	event.preventDefault()
	let title = this.state.inputTitle
	let body = this.state.inputBody
	let date = this.state.inputDate
		$.ajax({
			url: '/posts',
			type: 'POST',
			dataType: 'json',
			data: {title: title, body: body, date: date}
		})
	},
	render: function () {
		return (
			<div>
			<form onSubmit={this.makeNewPost}>
				<input 
					type="text"
					placeholder="title"
					onChange={this.handleChange.bind(this, 'inputTitle')}
					value={this.state.inputTitle}></input>
				<input 
					type="text"
					placeholder="body"
					onChange={this.handleChange.bind(this, 'inputBody')}
					value={this.state.inputBody}></input>
				<input type="submit"></input>
			</form>
			<AllPosts />
			</div>
		)
	}
})

ReactDOM.render(
<NewPostForm />, document.getElementById('root'));