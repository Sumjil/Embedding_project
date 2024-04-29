import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import RulesModal from '../components/RulesModal'; // Import the RulesModal component

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="header">
      {/* Button to open the modal */}
      <QuestionCircleOutlined onClick={handleOpenModal} style={{ fontSize: '24px', cursor: 'pointer' }} />
      {/* Render the RulesModal component */}
      <RulesModal visible={modalVisible} handleCloseModal={handleCloseModal} />
    </div>
  );
}

export default Header;
