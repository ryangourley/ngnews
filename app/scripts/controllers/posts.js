'use strict';

app.controller('PostsCtrl', function ($scope, $location, Post) {

	//holds all of the submitted posts
	if ($location.path() === '/') {
		//aka only show all the posts if we are on the homepage
		$scope.posts = Post.all;
	}
	

	//format for the information stored by each post
	$scope.post = {url: 'http://', title: ''};

	/* NO LONGER IN THIS SCOPE, MOVED TO NAV BAR
	//method to put a newly submitted post into posts, and reset form
	$scope.submitPost = function(){
		Post.create($scope.post).then(function(ref){
			$location.path('/posts/'+ref.name());
		});
	};*/

	//deletes the given post 'index' from the array
	$scope.deletePost = function (postId){
		Post.delete(postId);
	};

	//upvote/downvote system

	$scope.upVotePost = function (postId, upVoted) {
		if (upVoted) {
			Post.clearVote(postId, upVoted);
		} else {
			Post.upVote(postId);
		}
	};
	
	$scope.downVotePost = function (postId, downVoted) {
		if (downVoted) {
			Post.clearVote(postId, !downVoted);
		} else {
			Post.downVote(postId);
		}
	};
	
	$scope.upVoted = function (post) {
		return Post.upVoted(post);
	};
	
	$scope.downVoted = function (post) {
		return Post.downVoted(post);
	};
 
});