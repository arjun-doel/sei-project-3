import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const MainModal = ({ id, image, name, shortDescription, description, ingredient, storage, price, show, handleClose }) => {
  //* Show Modal Lists - Ingredients & Storage
  const [showIngred, setShowIngred] = useState(false)
  const [showStorage, setShowStorage] = useState(false)

  //? Open Ingredients List 
  const handleShowIngred = () => {
    setShowIngred(true)
  }

  //? Close Ingredients List
  const handleCloseIngred = () => {
    setShowIngred(false)
  }

  //? Open Storage List 
  const handleShowStorage = () => {
    setShowStorage(true)
  }

  //? Open Storage List
  const handleCloseStorage = () => {
    setShowStorage(false)
  }



  return (
    <>
      <Modal key={id} show={show} onHide={handleClose}
        // dialogClassName="my-modal"
        size="lg">
        <div className="modal-body-prod">
          <img src={image} alt={name} />
          <h1>{name}</h1>
          <p>{shortDescription}</p>
          <p>{description}</p>
          <hr />
          <div className="extra-info">
            <div className="header-extra">
              {/* {!showIngred && <button onClick={handleShowIngred}>+</button>} */}
              {!showIngred && <h2 onClick={handleShowIngred}>Ingredients +</h2>}
              {showIngred && <h2 onClick={handleCloseIngred}>Ingredients -</h2>}
            </div>
            {showIngred && <div className="extra-list">
              <ul>
                {ingredient.map(ingredient =>
                  <li key={ingredient}>{ingredient}</li>
                )}
              </ul>
            </div>}
          </div>
          <hr className="dotted-hr" />
          <div className="extra-info">
            <div className="header-extra">
              
              {!showStorage && <h2 onClick={handleShowStorage}>Storage +</h2>}
              {showStorage && <h2 onClick={handleCloseStorage}>Storage -</h2>}
            </div>
            {showStorage && <div className="extra-list">
              <p>{storage}</p>
            </div>}
          </div>
          <hr />
          <div className="my-modal-footer">
            <div className="price">
              <i className="fas fa-tags"></i>
              <p>£ {price}</p>
            </div>
            <div className="right-btn">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                <i className="fas fa-shopping-basket"></i>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MainModal