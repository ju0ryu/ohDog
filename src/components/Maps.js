import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import '../css/map.scss';
import '../css/map.css';
const { kakao } = window;

function Maps() {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [searchAddress, SetSearchAddress] = useState();
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();

  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const SearchMap = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    geocoder.addressSearch(`${searchAddress}`, callback);
  };

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value);
  };

  const setCategory = (e) => {
    if (e.target.name == '주변 애견 카페') {
      var keywords = '';
      keywords = oneRef.current.name;
      // console.log(oneRef.current.name);
      return SearchCategory(keywords);
    } else if (e.target.name == '주변 동물 병원') {
      keywords = twoRef.current.name;
      // console.log(twoRef.current.name);
      return SearchCategory(keywords);
    } else if (e.target.name == '주변 애견 미용실') {
      keywords = threeRef.current.name;
      // console.log(threeRef.current.name);
      return SearchCategory(keywords);
    } else if (e.target.name == '주변 애견동반 식당') {
      keywords = fourRef.current.name;
      // console.log(fourRef.current.name);
      return SearchCategory(keywords);
    }
  };

  const SearchCategory = (keywords) => {
    const ps = new kakao.maps.services.Places();
    const placesSearchCB = function (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        // map.setBounds(bounds);
      }
    };
    ps.keywordSearch(keywords, placesSearchCB);
  };

  // useEffect(() => {
  //     if (!map) return;
  //     const ps = new kakao.maps.services.Places();

  //     ps.keywordSearch('이태원 맛집', (data, status, _pagination) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //         // LatLngBounds 객체에 좌표를 추가합니다
  //         const bounds = new kakao.maps.LatLngBounds();
  //         let markers = [];

  //         for (var i = 0; i < data.length; i++) {
  //           // @ts-ignore
  //           markers.push({
  //             position: {
  //               lat: data[i].y,
  //               lng: data[i].x,
  //             },
  //             content: data[i].place_name,
  //           });
  //           // @ts-ignore
  //           bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //         }
  //         setMarkers(markers);

  //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //         map.setBounds(bounds);
  //       }
  //     });
  //   }, [map]);

  return (
    <>
      <div>
        <input onChange={handleSearchAddress}></input>
        <button placeholder="현재 위치를 입력하여 주세요" onClick={SearchMap}>
          검색
        </button>
        <div>
          <input
            type="button"
            name="주변 애견 카페"
            value="카페"
            ref={oneRef}
            onClick={setCategory}
          />
          <input
            type="button"
            name="주변 동물 병원"
            value="병원"
            ref={twoRef}
            onClick={setCategory}
          />
          <input
            type="button"
            name="주변 애견 미용실"
            value="미용실"
            ref={threeRef}
            onClick={setCategory}
          />
          <input
            type="button"
            name="주변 애견동반 식당"
            value="식당"
            ref={fourRef}
            onClick={setCategory}
          />
        </div>
      </div>
      <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3}
      >
        {/* <MapMarker position={state.center}>
          <div
            style={{
              color: '#000',
            }}
          >
            검색위치
          </div>
        </MapMarker> */}
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: '#000' }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </>
  );
}

export default Maps;
