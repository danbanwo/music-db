import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import YTSearch from 'youtube-api-search';
import ArtistList from '../ArtistList.js';
import VideoDetail from '../video-detail';

const API_KEY= "AIzaSyDXG0ix7GCK3i4l52t-XsY-_8pw3MBiL08";

export default class ArtistPage extends Component {
  constructor (props) {
    super(props)

    this.state = {list: []}
    this.videoSearch("redbone");
  }

  render () {

    if(this.state.list){
      return (
          <div id="top">
            <VideoDetail video={this.state.selectedVideo}/>
            <ArtistList list={this.state.list}
              handleSelect={this.videoSearch.bind(this)}
              />
          </div>
      )
    }

  else {
    return(<div>Loading</div>)
  }

  }

  componentWillMount () {
    let that = this
    $.ajax({
      url: "/api/artists",
      success: function (data) {
        that.setState({list: data})
      }
    })
  }

  videoSearch(term) {
    YTSearch( {key: API_KEY, term: term} , (videos) => {
      this.setState(
        {
          videos: videos,
          selectedVideo: videos[0]
        } )
    });

  }

}
