import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../common/Button";
interface IModal {
  title?: string;
  show: boolean;
  className?: string;
  onModalClose: () => void;
  children: React.ReactNode;
  onSubmitHandler?: () => void;
  is_confrim?: boolean;
  showDefaultBtn?: boolean;
}

const ModalComponent: React.FC<IModal> = (props: IModal) => {
  const {
    title,
    show = false,
    className = "",
    onModalClose,
    onSubmitHandler,
    children,
    is_confrim = true,
    showDefaultBtn = true,
  } = props;
  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter "
        centered
      >
        {title && (
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>{children}</Modal.Body>
        <div>
          {/* <DeleteIcon
            color="black"
            size={30}
            className="position-absolute text-primary top-5 end-5 cursor-pointer"
            onClick={() => onModalClose()}
          /> */}
        </div>
        {showDefaultBtn && (
          <div className="d-flex justify-content-end gap-3 mx-3 mb-3">
            <Button
              label="Cancel"
              borderradius="4px"
              varient="primary-outline"
              onClick={() => onModalClose()}
              width="100%"
            />
            {is_confrim && (
              <Button
                label="Confirm"
                borderradius="4px"
                onClick={onSubmitHandler}
                width="100%"
              />
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalComponent;
