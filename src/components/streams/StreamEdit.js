import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

//props come from React-Router-Dom
class StreamEdit extends React.Component {

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }
  //:id -> match.params.id
  render(){
    console.log(this.props);
  
    if(!this.props.stream){
      return <div>Loading...</div>;
    }

    //initialValues are then passed to onSubmit(values) method
    return(
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
          initialValues={_.pick(this.props.stream,'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
};

//ownprops is properties of the streamedit
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};


export default connect(mapStateToProps, {fetchStream, editStream} )(StreamEdit);