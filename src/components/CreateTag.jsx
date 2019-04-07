import React, { Component } from 'react';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createTag } from '../actions/tagActions';
import FLoatingLabelInput from './FLoatingLabelInput';
import Icon from './Icon';
import { ICONS } from '../constants';

const StyledCreateTag = styled.div`
  margin-left: 1rem;
`;

const StyledPlus = styled.span`
  display: inline-block;
  padding: 0.2em 0;
  cursor: pointer;
  color: white;
`;

class CreateTag extends Component {
  constructor() {
    super();

    this.state = {
      tagContent: '',
      formIsOpen: false,
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
      formIsOpen: false,
    });
  }

  render() {
    const { tagContent, formIsOpen } = this.state;

    return (
      <StyledCreateTag>
        {!formIsOpen ? (
          <StyledPlus
            onClick={() => this.setState({
              formIsOpen: true,
            })
            }
          >
            +
          </StyledPlus>
        ) : (
          <FLoatingLabelInput
            placeholderLabel="New Tag"
            id="new-tag"
            value={tagContent}
            onChange={e => this.setState({ tagContent: e.target.value })}
            onSubmit={e => this.handleSubmit(e)}
          >
            {formIsOpen && (
              <span
                className="search-icon"
                role="button"
                tabIndex="0"
                onClick={() => this.setState({ formIsOpen: false })}
                onKeyPress={() => this.setState({ formIsOpen: false })}
              >
                <Icon icon={ICONS.CLEAR} color="white" size={14} />
              </span>
            )}
          </FLoatingLabelInput>
        )}
      </StyledCreateTag>
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
