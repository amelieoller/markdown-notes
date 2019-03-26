import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { createTag } from '../actions/tagActions';

class CreateTag extends Component {
  constructor() {
    super();

    this.state = {
      tagContent: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { tagContent } = this.state;

    if (tagContent === '') return;

    const tag = {
      name: tagContent,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.props.createTag(tag);

    this.setState({
      tagContent: '',
    });
  }

  render() {
    const { tagContent } = this.state;

    return (
      <form action="" onSubmit={e => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="New Tag"
          value={tagContent}
          onChange={e => this.setState({ tagContent: e.target.value })}
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createTag: tag => dispatch(createTag(tag)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateTag);
