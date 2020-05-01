import React from 'react';
import IRoundModal from '../definitions/round-modal';

export default class RoundModal extends React.Component<IPropsType> {
  render() {
    return (
      <div className={`modal ${this.props.modal.open ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={this.props.onContinueClick} />
        <div className="modal-content">
          <div className="box has-text-centered">
          <div className="modal-close is-large" onClick={this.props.onContinueClick}>&times;</div>
            <h3 className="title is-3">The winner is... {this.props.modal.player?.name}!</h3>

            <div className="columns has-text-left is-centered">
              <div className="column is-5">
                <div className="uocg-card uocg-card--question is-size-5 has-text-weight-bold">
                  {this.props.modal.question?.text}
                </div>
              </div>
              <div className="column is-5">
                <div className="uocg-card is-size-4 has-text-weight-bold">
                  {this.props.modal.answer?.text}
                </div>
              </div>
            </div>

            <button className="button is-info" onClick={this.props.onContinueClick}>Continue</button>
          </div>
        </div>
      </div>
    );
  }
}

interface IPropsType {
  modal: IRoundModal;
  onContinueClick: () => void;
}
