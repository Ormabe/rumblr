import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory} from 'react-router';
import $ from 'jquery';

const Nope = React.createClass({
  render: function() {
    return (
      <div>
        <h1>'No Page Here!'</h1>
      </div>
    );
  }

});

const OnePost = React.createClass({
	getInitialState: function () {
	    return {}
	},
	componentDidMount: function () {
		console.log(this.props);

	},
	render: function () {
		return (
		<div>
			<h2>Title: {this.state.postId.title}</h2>
			<h3>{this.state.postId.body}</h3>
			<h6>{this.state.postId.date}</h6>
		</div>
		)
	}
});

const AllPosts = React.createClass({
	getInitialState: function () {
	return ({data: null})
	},
	componentWillMount: function () {
		setTimeout(this.postAjax, 100)
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
	let results = this.state.data
		if(results) {
			return (
				<div>{results.map(function(post, i) {
				return (
					<div  key={i}>
						<Link to={`/posts/${post._id}`}><li>{post.title}</li></Link>
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
				<br />
				<textarea
					type="text"
					placeholder="body"
					onChange={this.handleChange.bind(this, 'inputBody')}
					value={this.state.inputBody}></textarea>
				<br />
				<Link to="/posts">
					<input
						type="button"
						value="submit"
						 /></Link>
			</form>
			<ol>
			<AllPosts />
			</ol>
			{this.props.children}
			</div>
		)
	}
})

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={NewPostForm}>
			<Route path="posts" component={AllPosts}>
				<Route path="posts/:id" component={OnePost}></Route>
			</Route>
			<Route path="*" component={Nope}></Route>
		</Route>
	</Router>, document.getElementById('root'));
