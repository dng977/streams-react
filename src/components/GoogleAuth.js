import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
class GoogleAuth extends React.Component {

  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      //connects the client
      window.gapi.client.init({
        clientId: '950329503666-8h3gncbimppnuj1c8o09918801grc8ns.apps.googleusercontent.com',
        scope: 'email'
      }).then(() =>{
        //gets auth instance
        this.auth = window.gapi.auth2.getAuthInstance();
        //updates state by calling action creators
        this.onAuthChange(this.auth.isSignedIn.get());
        //wait for the authStatus to change in the future
        this.auth.isSignedIn.listen(this.onAuthChange); 
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut(this.auth.currentUser.get().getId());
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton(){

    if (this.props.isSignedIn === null){
      return null;
    } else if (this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"/>
          Sign Out
        </button>
      );
    }else{
      return (
        <button onClick={this.onSignInClick
        } className="ui red google button">
          <i className="google icon"/>
          Sign In with Google
        </button>
      );
    }
  }

  render(){
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn};
};


export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);