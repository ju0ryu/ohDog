import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    var fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    props.setAddress(data.address);
    console.log('data : ', data.address);
    console.log('full data : ');
    console.log(data.zonecode);
    props.onClose();
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '720px',
    left: '660px',
    width: '570px',
    height: '500px',
    padding: '7px',
    borderRadius: '5px',
  };
  const cancelBtn = {
    position: 'absolute',
    top: '780px',
    right: '920px',
    backgroundColor: 'transparent',
    // fontFamily: 'Dongle',
    fontSize: '15px',
    width: '60px',
    border: '1px solid #ccc',
    borderShadow: '10px 10px 10px 10px #ccc',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      <input
        style={cancelBtn}
        value="취소"
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      />
    </div>
  );
};

export default PopupPostCode;
