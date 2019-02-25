import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/index.scss';

class Modal extends Component {
  constructor() {
    super();

    this.state = {
      dataForm: {}
    };

    this.generateInputForm = this.generateInputForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  generateInputForm() {
    const { data } = this.props;
    const objectKeys = Object.keys(data.dataInput);

    return objectKeys.map(inputData => (
      <div className="input-group mb-3" key={inputData}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            {data.dataInput[inputData].name}
          </span>
        </div>
        <input
          type={data.dataInput[inputData].type}
          className="form-control"
          placeholder={data.dataInput[inputData].name}
          defaultValue={data.dataInput[inputData].value}
          onChange={this.handleChange}
          name={inputData}
        />
      </div>
    ));
  }

  handleChange(event) {
    const { dataForm } = this.state;

    this.setState({
      dataForm: {
        ...dataForm,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit(e) {
    const { onSaveData, data, pageNumber } = this.props;
    const { dataForm } = this.state;
    let dataObject = null;

    if (Object.keys(dataForm).length > 0) {
      dataObject = {
        data: {
          id: data.id,
          pageNumber,
          dataForm
        }
      };
    }

    e.preventDefault();
    onSaveData(dataObject);
    this.clearState();
  }

  clearState() {
    this.setState({
      dataForm: {}
    });
  }

  render() {
    const { onClose, data, pageNumber } = this.props;
    const inputRows = this.generateInputForm();

    return (
      <div className="modal-container">
        <div className="modal my-5" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span className="text-secondary">Pagina {pageNumber}:</span>
                  {data.title}
                </h5>
                <button
                  onClick={() => onClose()}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body my-5">
                <form className="form_search" onSubmit={this.handleSubmit}>
                  {inputRows}
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={this.handleSubmit} type="button" className="btn btn-primary">
                  Save changes
                </button>
                <button
                  onClick={() => onClose()}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveData: PropTypes.func.isRequired
};

export default Modal;
