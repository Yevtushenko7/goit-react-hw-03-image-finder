import React from "react";
import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.closeModalEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModalEsc);
  }

  closeModalEsc = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  ClickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.ClickBackdrop}>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
