import React, { useEffect, useState } from 'react';
import '../css/map.scss';

const { kakao } = window;
let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const Map = () => {
  const [category, setCategory] = useState();

  const onClick = (e) => {
    setCategory(e.target.name);
    console.log(category);
  };

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);

    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색
    ps.keywordSearch('입력 값', placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>',
        );
        infowindow.open(map, marker);
      });
    }
  }, []);

  return (
    <>
      <form className="search">
        <input type="text" placeholder="현재위치를 입력해주세요" />
        <input type="submit" value="검색" />
      </form>
      <div className="category">
        <input
          type="button"
          name="애견동반카페"
          value="카페"
          onClick={onClick}
        />
        <input type="button" name="동물병원" value="병원" onClick={onClick} />
        <input
          type="button"
          name="애견미용실"
          value="미용실"
          onClick={onClick}
        />
        <input
          type="button"
          name="애견동반식당"
          value="식당"
          onClick={onClick}
        />
      </div>
      <div className="mapContent">
        <div
          id="map"
          style={{
            margin: '0 auto',
            width: '80%',
            height: '600px',
          }}
        ></div>
      </div>
    </>
  );
};

export default Map;
