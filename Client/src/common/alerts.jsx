import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg?.author) {
        //alert.error(`Author: ${error.msg.author.join()}`);
        toast.error(`Author: ${error.msg.author.join()}`);
      }
      if (error.msg?.title) {
        //  alert.error(`Title: ${error.msg.title.join()}`);
        toast.error(`Title: ${error.msg.title.join()}`);
      }
      if (error.msg?.non_field_errors) {
        // alert.error(error.msg.non_field_errors.join());
        toast.error(error.msg.non_field_errors.join());
      }
      if (error.msg?.username) {
        // alert.error(error.msg.username.join());
        toast.error(error.msg.username.join());
      }
      if (error.msg) {
        // alert.error(error.msg);
        toast.error(error.msg);
      }
    }

    if (message !== prevProps.message) {
      if (message.messages.addedToLiked) {
        alert.success(message.messages.addedToLiked);
      }
      if (message.messages.removedFromLiked) {
        alert.info(message.messages.removedFromLiked);
      }
      if (message.messages.addedToCart) {
        alert.success(message.messages.addedToCart);
      }
      if (message.messages.removedFromCart) {
        alert.info(message.messages.removedFromCart);
      }
      if (message.messages.passwordNotMatch) {
        alert.error(message.messages.passwordNotMatch);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
